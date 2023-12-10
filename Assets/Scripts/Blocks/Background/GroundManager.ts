
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { GameObject, Vector3, Quaternion } from 'UnityEngine';
import GroundMoveLeft from './GroundMoveLeft'

// Define the GroundManager class which extends the ZepetoScriptBehaviour class
export default class GroundManager extends ZepetoScriptBehaviour {

    // Singleton instance of this class
    public static Instance: GroundManager;

    // Reference to the ground prefab
    public ground: GameObject;

    // Initial position of the ground
    private groundStartPos: Vector3 = new Vector3(0, 0, 0);

    // Speed of the ground movement
    public groundSpeed: number = 1;

    // Flag indicating whether the ground is currently in the scene
    private isGroundInTheScene: boolean = false;

    // X position at which the ground should be repeated
    public xleftBound: number = -30;

    // Reference to the GroundMoveLeft script attached to the moving ground
    private groundMoveLeft: GroundMoveLeft;

    // Reference to the GameObject representing the moving ground
    private movingGround: GameObject;

    // Flag indicating whether the ground is currently moving
    private isGroundMoving: boolean = false;

    // Awake is called when the script instance is being loaded
    public Awake(): void {
        // Allocating the instance of this class to make it a "singleton"
        if (GroundManager.Instance == null) GroundManager.Instance = this;
        else GameObject.Destroy(this);
    }

    // Method to start the ground manager
    public StartGroundManager() {
        // Check if the ground is already in the scene
        if (this.isGroundInTheScene == false) {
            // Instantiate the ground prefab at the specified start position
            this.movingGround = GameObject.Instantiate(this.ground, this.groundStartPos, Quaternion.identity) as GameObject;
            this.isGroundInTheScene = true;
        }

        // Set the position of the moving ground to the initial position
        this.movingGround.transform.position = this.groundStartPos;

        // Get the GroundMoveLeft script attached to the moving ground
        this.groundMoveLeft = this.movingGround.GetComponent<GroundMoveLeft>();

        // Get the current state of ground movement
        this.isGroundMoving = this.groundMoveLeft.isMoving;
    }

    // Update is called once per frame
    Update() {
        // Check if the moving ground exists
        if (this.movingGround) {
            // Set the speed of the moving ground
            this.groundMoveLeft.SetGroundSpeed(this.groundSpeed);
            
            // Check if the ground position should be repeated
            this.RepeatGround();
        }
    }

    // Method to repeat the ground when it goes beyond a certain point
    public RepeatGround() {
        // Check if the moving ground's x-position is less than the left bound
        if (this.movingGround.transform.position.x < this.xleftBound) {
            // Reset the position of the moving ground to the initial position
            this.movingGround.transform.position = this.groundStartPos;
        }
    }

    // Method to pause the ground manager
    public PauseGroundManager() {
        // Set the moving state of the ground to false
        this.groundMoveLeft.SetMoving(false);
    }

    // Method to resume the ground manager
    public ResumeGroundManager() {
        // Set the moving state of the ground to true
        this.groundMoveLeft.SetMoving(true);
    }
}
