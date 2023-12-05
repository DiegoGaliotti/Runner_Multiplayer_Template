import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import  HealthManager  from '../Managers/HealthManager';

// This class represents an object that inflicts damage to the player when collided with
export default class ObstacleDamage extends ZepetoScriptBehaviour {

    // Define the amount of damage that the object will generate to the player
    public damageAmount: number;

    // This method is called when another collider enters the trigger collider attached to this object
    OnTriggerEnter(collider: Collider) {
        // We verify that the collision is with the player by comparing his tag
        if (collider.CompareTag("Player")) {
            // We ask the HealthManager to deduct the previously defined damage amount
            HealthManager.Instance.GenerateDamage(this.damageAmount);

            // We deactivate the current element
            this.gameObject.SetActive(false);
        }
    }
}