import { GameObject, RuntimeAnimatorController} from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import {LocalPlayer, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import AnimationControllerRunner from './AnimationControllerRunner';

// Class that manages the Zepeto character animations
export default class AnimatorManager extends ZepetoScriptBehaviour {

    // Reference to different animator controllers
    public AnimatorRunner: RuntimeAnimatorController;
    public AnimatorV2: RuntimeAnimatorController;

    // Singleton instance of this class
    public static Instance: AnimatorManager;

    // Reference to the local player
    private localPlayer: LocalPlayer;

    // Awake is called when the script instance is being loaded
    Awake() {
        // Allocating the instance of this class to make it a "singleton"
        if (AnimatorManager.Instance != null) GameObject.Destroy(this.gameObject);
        AnimatorManager.Instance = this;
    }

    // Start is called before the first frame update
    public Start() {
        // Listen for the addition of a local player
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this.localPlayer = ZepetoPlayers.instance.LocalPlayer;
            // Add AnimationControllerRunner component to the Zepeto character
            this.localPlayer.zepetoPlayer.character.gameObject.AddComponent<AnimationControllerRunner>();
        });
    }
    
    // Method to handle animations based on the game state
    GameRunning(isGameRunning: boolean) {
        // Access the AnimationControllerRunner singleton instance
        const animationControllerRunner = AnimationControllerRunner.Instance;

        if (isGameRunning) {
            // Apply override animation for game running
            animationControllerRunner.ApplyOverrideAnimation(true);
        } else {
            // Apply override animation for game not running
            animationControllerRunner.ApplyOverrideAnimation(false);
        }
    }
}