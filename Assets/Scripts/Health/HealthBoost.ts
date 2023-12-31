import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import  HealthManager  from '../Managers/HealthManager';

// This class represents an object that boosts the player's health when collided with
export default class HealthBoost extends ZepetoScriptBehaviour {

    // Define the amount of health that the object will give to the player
    public healthBoostAmount: number;

    // This method is called when another collider enters the trigger collider attached to this object
    OnTriggerEnter(collider: Collider) {
        // We verify that the collision is with the player by comparing his tag
        if (collider.CompareTag("Player")) {
            // We ask the HealthManager to add the previously defined health boost amount
            HealthManager.Instance.GenerateHealth(this.healthBoostAmount);

            // We deactivate the current element
            this.gameObject.SetActive(false);
        }
    }
}