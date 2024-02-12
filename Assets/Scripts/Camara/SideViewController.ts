import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { Vector3, Camera, GameObject} from 'UnityEngine';

// Class that manages the side view camera and player input
export default class SideViewController extends ZepetoScriptBehaviour {

    // Singleton instance of this class
    public static Instance: SideViewController;

    // Custom camera used for side view
    public customCamera: Camera;

    // Camera distance parameters
    private cameraDistanceZ: number = 4;
    private cameraDistanceX: number = 3.5;
    private cameraDistanceY: number = 2.5;

    // Reference to the ZepetoCharacter controlled by the player
    private myCharacter: ZepetoCharacter;


    public Awake(): void {
        // Allocating the instance of this class to make it a "singleton"
       if (SideViewController.Instance == null) SideViewController.Instance = this;
       else GameObject.Destroy(this);
   }

    // Start is called before the first frame update
    Start() {

        // Set transform position
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this.myCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
            this.customCamera.transform.position = this.myCharacter.transform.position;
        });
    }

    // LateUpdate is called every frame, if the Behaviour is enabled
    LateUpdate() {
        if (null == this.myCharacter) {
            return;
        }

        // Follow the Zepeto character with the camera
        let characterPos = this.myCharacter.transform.position;
        let cameraPosition = new Vector3(characterPos.x + this.cameraDistanceX, characterPos.y + this.cameraDistanceY, characterPos.z - this.cameraDistanceZ);
        this.customCamera.transform.position = cameraPosition;
    }
}