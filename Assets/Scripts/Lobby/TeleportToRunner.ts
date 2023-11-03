import { Collider, Vector3, Quaternion, GameObject } from 'UnityEngine';
import { SpawnInfo, ZepetoCharacter, ZepetoPlayer, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import GameRunnerManager from '../Managers/GameRunnerManager';
 
export default class TeleportToRunner extends ZepetoScriptBehaviour {
     
    // The destination object to be teleported to
    public destinationObject: GameObject;
    private _localCharacter: ZepetoCharacter;
 
    Start() {
        // Find the local player and Set it to _localCharacter
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this._localCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        });
    }
 
    OnTriggerEnter(collider: Collider) {
        // Do not execute the function if _localCharacter is not set yet or if the collided gameObject is not _localCharacter
        if (this._localCharacter == null || collider.gameObject != this._localCharacter.gameObject) {
            return;
        }
        const spawnInfo = new SpawnInfo();
        spawnInfo.rotation = Quaternion.Euler(0, 90, 0); // Set Character Spawn Rotation
        // Teleport the _localCharacter to the position of destinationObject
        this._localCharacter.Teleport(this.destinationObject.transform.position, spawnInfo.rotation);
        GameRunnerManager.Instance.OnStart();
    }


}   