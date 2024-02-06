import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { SpawnInfo, ZepetoPlayers, ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { Quaternion, Vector3, GameObject, } from 'UnityEngine';

// Class that manages the control and behavior of the game character
export default class CharacterController extends ZepetoScriptBehaviour {

    // Singleton instance of this class
    public static Instance: CharacterController

    // Reference to the ZepetoCharacter controlled by the player
    private _zepetoCharacter: ZepetoCharacter;

    // Run and walk speeds for the character
    public runSpeed: number = 5;
    public walkSpeed: number = 2;

    // Awake is called when the script instance is being loaded
    public Awake(): void 
    {
        // Allocating the instance of this class to make it a "singleton"
        if (CharacterController.Instance == null) CharacterController.Instance = this;
        else GameObject.Destroy(this);
    }

    // Method to create and control the character in the lobby
    public CharacterController(sessionId: string, playerID: string, isLocal: boolean){
        // Define the spawnInfo.
        const spawnInfo = new SpawnInfo();
        spawnInfo.position = new Vector3(-200, 1, 0); // Set Character Spawn Position
        spawnInfo.rotation = Quaternion.Euler(0, 180, 0); // Set Character Spawn Rotation

        // Create a player with the specified session ID, player ID, spawn info, and local status
        ZepetoPlayers.instance.CreatePlayerWithUserId(sessionId, playerID, spawnInfo, isLocal);

        // Listen for the addition of a local player and set the reference to the ZepetoCharacter
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this._zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character; 
            // The reference of the instance of the ZepetoCharacter is taken
            this._zepetoCharacter.gameObject.tag = "Player"; 
            // The "player" tag is assigned, and the ZepetoCharacter gameobject is disabled
            this._zepetoCharacter.gameObject.name = sessionId;
        });
    }

    // Method to configure the character for lobby control
    public CharacterLobbyController(){
        let player = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        player.additionalRunSpeed = this.runSpeed;
        player.additionalWalkSpeed = this.walkSpeed;
        player.constraintRotation = false;
    }

    // Method to configure the character for runner game control
    public CharacterRunnerController(){
        // Define the spawnInfo.
        let player = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        player.additionalRunSpeed = -this.runSpeed;
        player.additionalWalkSpeed = -this.walkSpeed;
        player.constraintRotation = true;
    }
    
}