
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { Vector3, Time } from "UnityEngine";

// Define the GroundMoveLeft class which extends the ZepetoScriptBehaviour class
export default class GroundMoveLeft extends ZepetoScriptBehaviour {

    // Speed of the ground movement
    private groundSpeed: number = 0;

    // Flag indicating whether the ground is currently moving
    public isMoving: boolean = false;

    // Update is called once per frame
    Update() {
        // Check if the ground is set to move
        if (this.isMoving) {
            // Move the ground to the left based on the speed and time since the last frame
            this.MoveLeft();
        }
    }

    // Method to move the ground to the left
    public MoveLeft() {
        // Move the ground to the left (negative x-direction) based on the speed and time since the last frame
        this.transform.position += Vector3.left * this.groundSpeed * Time.deltaTime;
    }

    // Method to set the speed of the ground
    public SetGroundSpeed(value: number) {
        this.groundSpeed = value;
    }

    // Method to set the moving state of the ground
    public SetMoving(value: boolean): void {
        this.isMoving = value;
    }
}
