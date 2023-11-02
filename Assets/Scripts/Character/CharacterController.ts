import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { SpawnInfo, ZepetoPlayers, LocalPlayer, ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { Quaternion, Vector3, GameObject } from 'UnityEngine';
import { WorldService } from 'ZEPETO.World';


export default class CharacterController extends ZepetoScriptBehaviour {

    public static Instance: CharacterController
    private _zepetoCharacter: ZepetoCharacter;

    /*
    public animator animatorA
    public animator animatorB

    public UITouchPad A
    public UITouchPad B
    */

    public Awake(): void 
    {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (CharacterController.Instance == null) CharacterController.Instance = this;
        else GameObject.Destroy(this);
    }

    CharacterController(sessionId: string, playerID: string, isLocal: boolean){

    }

    // Start is called on the frame when a script is enabled just before any of the Update methods is called the first time.
    Start(){

    }

    characterMarketController(sessionId: string, playerID: string, isLocal: boolean){
        // Define the spawnInfo.
        const spawnInfo = new SpawnInfo();
        spawnInfo.position = new Vector3(-200, 1, 0); // Set Character Spawn Position
        spawnInfo.rotation = Quaternion.Euler(0, 180, 0); // Set Character Spawn Rotation

        ZepetoPlayers.instance.CreatePlayerWithUserId(sessionId, playerID, spawnInfo, isLocal);
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this._zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character; // The reference of the instance of the ZepetoCharacter is taken
            this._zepetoCharacter.gameObject.tag = "Player"; // The "player" tag is assigned and the ZepetoCharacter gameobject is disabled
        });
    }

    characterGameController(sessionId: string, playerID: string, isLocal: boolean){
        // Define the spawnInfo.
        const spawnInfo = new SpawnInfo();
        spawnInfo.position = new Vector3(0, 1, 0); // Set Character Spawn Position
        spawnInfo.rotation = Quaternion.Euler(0, 90, 0); // Set Character Spawn Rotation

        // Instance of the player zepeto
        ZepetoPlayers.instance.CreatePlayerWithZepetoId(WorldService.userId, spawnInfo, true);

        // The instantiation can take a few seconds, the following lines are executed once this happens
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this._zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character; // The reference of the instance of the ZepetoCharacter is taken
            this._zepetoCharacter.gameObject.tag = "Player"; // The "player" tag is assigned and the ZepetoCharacter gameobject is disabled
            this._zepetoCharacter.constraintRotation = true; // The player will be in the same position always.
        });
    }
    
}