import { Collider, Quaternion, GameObject } from 'UnityEngine';
import { SpawnInfo, ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import GameRunnerManager from '../Managers/GameRunnerManager';
 
// This class represents an object that teleports the player to a specific destination when collided with
export default class TeleportToRunner extends ZepetoScriptBehaviour {

    // The destination object to be teleported to
    public destinationObject: GameObject;

    // Reference to the local character controlled by the player
    private _localCharacter: ZepetoCharacter;

    // Start is called before the first frame update
    Start() {
        // Find the local player and set it to _localCharacter
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this._localCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        });
    }

    // This method is called when another collider enters the trigger collider attached to this object
    OnTriggerEnter(collider: Collider) {
        // Do not execute the function if _localCharacter is not set yet or if the collided gameObject is not _localCharacter
        if (this._localCharacter == null || collider.gameObject != this._localCharacter.gameObject) {
            return;
        }

        // Create a SpawnInfo object to specify the rotation for teleportation
        const spawnInfo = new SpawnInfo();
        spawnInfo.rotation = Quaternion.Euler(0, 90, 0); // Set Character Spawn Rotation

        // Teleport the _localCharacter to the position of destinationObject
        this._localCharacter.Teleport(this.destinationObject.transform.position, spawnInfo.rotation);

        // Trigger the initialization of the runner game
        GameRunnerManager.Instance.OnRunnerInitialize();
    }
}