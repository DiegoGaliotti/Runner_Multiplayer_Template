import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Collider, GameObject, SerializeField } from 'UnityEngine';
import { SceneManager } from 'UnityEngine.SceneManagement';

export default class LoadLevel1 extends ZepetoScriptBehaviour {


    OnTriggerEnter(collider: Collider) {
        // We verify that the collision is with the player by comparing his tag
        if (collider.CompareTag("Player")) {
            SceneManager.LoadScene(1);
        }


    }
}