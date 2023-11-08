import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { PlayerInput, InputAction } from 'UnityEngine.InputSystem';
import { CallbackContext } from 'UnityEngine.InputSystem.InputAction';
import { CharacterState, ZepetoCharacter, ZepetoPlayers, ZepetoCamera } from 'ZEPETO.Character.Controller';
import { Quaternion, Time, Vector2, Vector3 } from 'UnityEngine';
import * as UnityEngine from 'UnityEngine';

export default class SideViewController extends ZepetoScriptBehaviour {

    public customCamera: UnityEngine.Camera;

    //Camera setting, distance and location, 
    private cameraDistanceZ: number = 4;
    private cameraDistanceX: number = 3.5;
    private cameraDistanceY: number = 2.5;

    private myCharacter: ZepetoCharacter;
    private startPos: Vector2 = Vector2.zero;
    private curPos: Vector2 = Vector2.zero;

    private playerInput: PlayerInput;
    private touchPositionAction: InputAction;
    private touchTriggerAction: InputAction;

    private isTriggered: boolean = false;
    private isTouchDown: boolean = false;

    private CanMove(): boolean {
        return this.isTouchDown && !this.isTriggered;
    }

    OnEnable() {
        this.playerInput = this.gameObject.GetComponent<PlayerInput>();
    }

    Start() {
        this.touchTriggerAction = this.playerInput.actions.FindAction("MoveTrigger");
        this.touchPositionAction = this.playerInput.actions.FindAction("Move");

        this.touchTriggerAction.add_started(context => {
            this.isTriggered = true;
            this.isTouchDown = true;
        });

        this.touchTriggerAction.add_canceled(context => {
            this.isTriggered = false;
            this.isTouchDown = false;
        });

        this.touchPositionAction.add_performed(context => {
            if (this.isTouchDown) {
                this.curPos = context.ReadValueAsObject() as Vector2;

                if (this.isTriggered) {
                    this.isTriggered = false;
                    this.startPos = this.curPos;
                }
            }
        });

        // Turn off zepeto camera
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            ZepetoPlayers.instance.LocalPlayer.zepetoCamera.gameObject.SetActive(false);
            this.myCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
            this.customCamera.transform.position = this.myCharacter.transform.position;
            this.StartCoroutine(this.InputControlLoop());
        });
    }

    private *InputControlLoop() {
        while (true) {
            yield new UnityEngine.WaitForEndOfFrame();
            
            if (this.myCharacter && this.CanMove()) {

                const camRot = Quaternion.Euler(0, UnityEngine.Camera.main.transform.rotation.eulerAngles.y, 0);
                let moveDir = Vector2.op_Subtraction(this.curPos, this.startPos);
                moveDir = Vector2.op_Division(moveDir, 100);

                if (moveDir.magnitude > 0) {
                    if (moveDir.magnitude > 1) {
                        moveDir.Normalize();
                    }

                    // Left-Right
                    let optMoveDir = new Vector3(moveDir.x, 0, 0);
                    optMoveDir = Vector3.op_Multiply(optMoveDir, Time.deltaTime * 80);
                    this.myCharacter.Move(optMoveDir);
                }
            }
        }
    }

    // Follow zepeto character
    LateUpdate() {
        if (null == this.myCharacter) {
            return;
        }

        let characterPos = this.myCharacter.transform.position;
        let cameraPosition = new Vector3(characterPos.x + this.cameraDistanceX, characterPos.y + this.cameraDistanceY, characterPos.z - this.cameraDistanceZ);
        this.customCamera.transform.position = cameraPosition;
    }
}