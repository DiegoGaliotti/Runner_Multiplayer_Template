import { Collider, GameObject, SerializeField } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import  HealthManager  from '../Managers/HealthManager';

export default class HealthBoost extends ZepetoScriptBehaviour {

    public healthBoostAmount: number; //Define the amount of health that the object will give to the player
    //private objectCollider: GameObject;

    OnTriggerEnter(collider: Collider) {
        // We verify that the collision is with the player by comparing his tag
        if (collider.CompareTag("Player")) {
            // We ask the HealthManager to add the previously defined value "healthBoostAmount"
            HealthManager.Instance.generateHealth(this.healthBoostAmount)
            // We deactivate the current element
            this.gameObject.SetActive(false);
        }
    }

}