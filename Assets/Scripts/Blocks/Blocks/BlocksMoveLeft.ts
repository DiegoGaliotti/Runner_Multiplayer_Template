
// Import necessary modules from the ZEPETO.Script and UnityEngine libraries
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Vector3, GameObject, Time } from "UnityEngine";

// Define the BlocksMoveLeft class which extends the ZepetoScriptBehaviour class
export default class BlocksMoveLeft extends ZepetoScriptBehaviour {
    
    // Speed of the block movement
    private blockSpeed: number = 0;

    // Flag indicating whether the block is currently moving
    private isMoving: boolean = true;

    // This function is called once per frame
    Update(){
        // Move the block to the left (negative x-direction) based on the speed and time since the last frame.
        if (this.isMoving) {
            this.MoveLeft();
        }
    }

    // Method to set the speed of the block
    public SetBlockSpeed(value: number){
        this.blockSpeed = value;
    }

    // Method to destroy the generated block
    public DestroyBlock(){
        GameObject.Destroy(this.gameObject);
    }

    // Method to move the block to the left
    public MoveLeft(){
        // Move the block to the left (negative x-direction) based on the speed and time since the last frame.
        this.transform.position += Vector3.left * this.blockSpeed * Time.deltaTime;

        // If the block's x-position reaches or crosses the left boundary, you might want to handle this condition here
    }

    // Method to set the moving state of the block
    public SetMoving(value: boolean): void{
        this.isMoving = value;
    }
}
