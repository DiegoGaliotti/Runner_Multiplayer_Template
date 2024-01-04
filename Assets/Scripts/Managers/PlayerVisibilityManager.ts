import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Collider, GameObject, Renderer } from 'UnityEngine';
import ZepetoPlayersManager from '../../Zepeto Multiplay Component/ZepetoScript/Player/ZepetoPlayersManager';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';

// Definition of the PlayerVisibilityManager class that extends ZepetoScriptBehaviour
export default class PlayerVisibilityManager extends ZepetoScriptBehaviour {

    // Singleton instance of this class
    public static Instance: PlayerVisibilityManager;

    // Awake is called when the script instance is being loaded
    Awake() {
        // Allocating the instance of this class to make it a "singleton"
        if (PlayerVisibilityManager.Instance != null) GameObject.Destroy(this.gameObject);
        PlayerVisibilityManager.Instance = this;
    }

    // Method to show all players in the room
    ViewAllPlayers() {
        // Get characters of other players in the room through ZepetoPlayersManager
        const charactersInRoom = ZepetoPlayersManager.instance.GetOthersCharactersInRoom();

        // Iterate through each character and show them
        charactersInRoom.forEach(character => {
            // Enable specific renderers and colliders
            character.GetComponentsInChildren<Renderer>().forEach(r => {
                r.enabled = true;
            })
            character.GetComponentsInChildren<Collider>().forEach(r => {
                r.enabled = true;
            })

            // Uncomment these lines if you also want to activate the character's object
            // character.gameObject.SetActive(true);
        });
    }

    // Method to hide all players in the room
    HideAllPlayers() {
        // Get characters of other players in the room through ZepetoPlayersManager
        const charactersInRoom = ZepetoPlayersManager.instance.GetOthersCharactersInRoom();

        // Iterate through each character and hide them
        charactersInRoom.forEach(character => {
            // Disable specific renderers and colliders
            character.GetComponentsInChildren<Renderer>().forEach(r => {
                r.enabled = false;
            })
            character.GetComponentsInChildren<Collider>().forEach(r => {
                r.enabled = false;
            })

            // Uncomment these lines if you also want to deactivate the character's object
            // character.gameObject.SetActive(false)
        });
    }
}