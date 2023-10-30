
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { Vector3, GameObject, Time } from "UnityEngine";



export default class GroundMoveLeft extends ZepetoScriptBehaviour
{

    public groundSpeed: number = 0;
    public isMoving: bool = false

   

    Update() {

        if (this.isMoving) {

            this.MoveLeft();

        }
    }


    public MoveLeft() {
    

        this.transform.position += Vector3.left * this.groundSpeed * Time.deltaTime;
        
    }

    public SetGroundSpeed(value: number)
    {
        this.groundSpeed = value;

    }

    public SetMoving(value: bool): void
    {
        this.isMoving = value;
    }

   
}
