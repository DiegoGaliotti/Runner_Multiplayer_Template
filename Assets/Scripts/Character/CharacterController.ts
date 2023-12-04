import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { SpawnInfo, ZepetoPlayers, LocalPlayer, ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { Quaternion, Vector3, GameObject, Debug, Animator } from 'UnityEngine';


export default class CharacterController extends ZepetoScriptBehaviour {

    public static Instance: CharacterController
    private _zepetoCharacter: ZepetoCharacter;

    public runSpeed: number = 8;
    public walkSpeed: number = 3;

    //public UITouchPad A
    //public UITouchPad B
    

    public Awake(): void 
    {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (CharacterController.Instance == null) CharacterController.Instance = this;
        else GameObject.Destroy(this);
    }

    // Start is called on the frame when a script is enabled just before any of the Update methods is called the first time.
    Start(){

    }

    CharacterController(sessionId: string, playerID: string, isLocal: boolean){
        // Define the spawnInfo.
        const spawnInfo = new SpawnInfo();
        spawnInfo.position = new Vector3(-200, 1, 0); // Set Character Spawn Position
        spawnInfo.rotation = Quaternion.Euler(0, 180, 0); // Set Character Spawn Rotation

        ZepetoPlayers.instance.CreatePlayerWithUserId(sessionId, playerID, spawnInfo, isLocal);
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this._zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character; 
            // The reference of the instance of the ZepetoCharacter is taken
            this._zepetoCharacter.gameObject.tag = "Player"; 
            // The "player" tag is assigned and the ZepetoCharacter gameobject is disabled
            this._zepetoCharacter.gameObject.name = sessionId;
        });
    }

    CharacterLobbyController(){
        let player = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        player.additionalRunSpeed = this.runSpeed;
        player.additionalWalkSpeed = this.walkSpeed;
        player.constraintRotation = false;
    }

    CharacterRunnerController(){
        // Define the spawnInfo.
        let player = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        player.additionalRunSpeed = -this.runSpeed;
        player.additionalWalkSpeed = -this.walkSpeed;
        player.constraintRotation = true;
    }
    
}