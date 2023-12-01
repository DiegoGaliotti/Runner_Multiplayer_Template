
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Debug, GameObject, Vector3, Time, BoxCollider, SpriteRenderer, Quaternion } from 'UnityEngine';
import GroundMoveLeft from './GroundMoveLeft'

export default class GroundManager extends ZepetoScriptBehaviour {

    public static Instance: GroundManager;

    public ground: GameObject;
    private groundStartPos: Vector3 = new Vector3(0, 0, 0);
    public groundSpeed: number = 1;
    private isGroundInTheScene: bool = false;
    public xleftBound: number = -30;

    
    private groundMoveLeft: GroundMoveLeft;
    private movingGround: GameObject;
    private isGroundMoving: bool = false;


    public Awake(): void {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern

        if (GroundManager.Instance == null) GroundManager.Instance = this;
        else GameObject.Destroy(this);

    }

    public StartGroundManager() {

        if (this.isGroundInTheScene == false) {
            this.movingGround = GameObject.Instantiate(this.ground, this.groundStartPos, Quaternion.identity) as GameObject;
            this.isGroundInTheScene = true;
        }
        this.movingGround.transform.position = this.groundStartPos;
        this.groundMoveLeft = this.movingGround.GetComponent<GroundMoveLeft>();
    
        this.isGroundMoving = this.groundMoveLeft.isMoving;
    }
    
    Update() {
             
            if (this.movingGround) {
               
                this.groundMoveLeft.SetGroundSpeed(this.groundSpeed);
                this.RepeatGround();

            }

    }


    public RepeatGround() {
        
        if (this.movingGround.transform.position.x < this.xleftBound) {
            this.movingGround.transform.position = this.groundStartPos;

        }
    }

    public PauseGroundManager() {
        this.groundMoveLeft.SetMoving(false);
    }

    public ResumeGroundManager() {
        this.groundMoveLeft.SetMoving(true);

    }

    


}




