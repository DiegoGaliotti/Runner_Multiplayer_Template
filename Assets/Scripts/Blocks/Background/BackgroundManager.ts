import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { GameObject, Vector3, Time, BoxCollider } from 'UnityEngine';

// Define the BackgroundManager class which extends the ZepetoScriptBehaviour class
export default class BackgroundManager extends ZepetoScriptBehaviour {

    // Singleton instance of this class
    public static Instance: BackgroundManager;

    // Speed at which the background moves
    public backgroundSpeed: number = 1;

    // Width of the background
    private backGroundWidth: number;

    // Initial position of the background
    private startPos: Vector3 = new Vector3(20, 9.5, 4);

    // Flag indicating whether the background is currently moving
    public isMoving: boolean = false;

    // Awake is called when the script instance is being loaded
    public Awake(): void {
        // Allocating the instance of this class to make it a "singleton"
        if (BackgroundManager.Instance == null) BackgroundManager.Instance = this;
        else GameObject.Destroy(this);
    }

    // Update is called every frame
    public Update() {
        if (this.isMoving) {
            this.RepeatBackGround();
            this.MoveBackGroundLeft();
        }
    }

    // Method to start the background manager
    public StartBackGroundManager() { 
        this.SetMoving(true);
        this.MoveBackGroundLeft();
        this.backGroundWidth = this.GetComponent<BoxCollider>().size.x / 2;
        //this.startPos = this.transform.position;
    }

    // Method to pause the background manager
    public PauseBackgroundManager() {
        this.SetMoving(false);
    }

    // Method to resume the background manager
    public ResumeBackgroundManager() {
        this.SetMoving(true);
    }

    // Method to move the background to the left
    public MoveBackGroundLeft() {
        if (this.isMoving) {
            this.transform.position += Vector3.left * this.backgroundSpeed * Time.deltaTime;
        }
    }

    // Method to repeat the background when it goes beyond a certain point
    public RepeatBackGround() {
        if (this.transform.position.x < this.startPos.x - this.backGroundWidth) {
            this.transform.position = this.startPos;
        }
    }

    // Method to set the moving state of the background
    public SetMoving(value): void {
        this.isMoving = value;
    }
}
