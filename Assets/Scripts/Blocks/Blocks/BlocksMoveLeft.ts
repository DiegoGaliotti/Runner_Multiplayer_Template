
// Import necessary modules from the ZEPETO.Script and UnityEngine libraries
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Vector3, GameObject, Time } from "UnityEngine";

// Define the ObstacleMoveLeft class which extends the ZepetoScriptBehaviour class
export default class BlocksMoveLeft extends ZepetoScriptBehaviour
{
    
    public blockSpeed: number = 0;

    public isMoving: bool = true;

    // This function is called once per frame.
    Update(){
        // Move the obstacle to the left (negative x-direction) based on the speed and time since the last frame.
        if(this.isMoving){
            this.MoveLeft();
        }
    }
    //Method to set the speed of the block.
    public SetBlockSpeed(value:number){
        this.blockSpeed = value
    }

    //Method to destroy generated block.
    public DestroyBlock(){
        GameObject.Destroy(this.gameObject);
    }

    public MoveLeft(){
        // Move the obstacle to the left (negative x-direction) based on the speed and time since the last frame.

        this.transform.position +=  Vector3.left * this.blockSpeed * Time.deltaTime;
        // If the obstacle's x-position reaches or crosses the left boundary
        
    }

    public SetMoving(value: bool): void{
        this.isMoving = value;
    }
}
