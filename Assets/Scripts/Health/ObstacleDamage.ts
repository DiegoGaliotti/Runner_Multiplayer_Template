import { Collider, GameObject, SerializeField } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import  HealthManager  from '../Managers/HealthManager';

export default class ObstacleDamage extends ZepetoScriptBehaviour {

    public damageAmount: number; //Define the amount of damage that the object will generate to the player

    OnTriggerEnter(collider: Collider) {
        // We verify that the collision is with the player by comparing his tag
        if (collider.CompareTag("Player")) {
            // We ask the HealthManager to add the previously defined value "healthBoostAmount"
            HealthManager.Instance.generateDamage(this.damageAmount)
            // We deactivate the current element
            this.gameObject.SetActive(false);
        }
    }
}