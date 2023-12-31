
import { Animator, GameObject } from 'UnityEngine';
import {CharacterState, ZepetoPlayers} from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import AnimatorManager from './AnimatorManager';

// Class that manages the animation controller for the Zepeto character
export default class AnimationControllerRunner extends ZepetoScriptBehaviour {
    
    // Reference to the animator component
    private animator: Animator;

    // Singleton instance of this class
    public static Instance: AnimationControllerRunner;

    // Awake is called when the script instance is being loaded
    Awake() {
        // Allocating the instance of this class to make it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (AnimationControllerRunner.Instance != null) GameObject.Destroy(this.gameObject);
        AnimationControllerRunner.Instance = this;
    }
    
    // Start is called before the first frame update
    public Start() {
        // Get the animator component attached to children
        this.animator = this.GetComponentInChildren<Animator>();
    }
    
    // Method to apply override animations based on the game state
    public ApplyOverrideAnimation(isGameRunning: boolean) {
        // Get the current state of the Zepeto character
        let state: CharacterState = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.CurrentState;
        
        // Override the animations based on the game state
        switch(isGameRunning) {
            case true:
                this.animator.runtimeAnimatorController = AnimatorManager.Instance.AnimatorRunner;
                break;
            case false:
                this.animator.runtimeAnimatorController = AnimatorManager.Instance.AnimatorV2;
                break;
        }
        
        // Set the integer parameter in the animator to the current character state
        this.animator.SetInteger("State", state);
    }
    
    // Method to reset animations back to their original states
    public ResetOverrides() {
        // Get the current state of the Zepeto character
        let state: CharacterState = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.CurrentState;
        
        // Reset animations back to their original states
        this.animator.runtimeAnimatorController = AnimatorManager.Instance.AnimatorV2;
        this.animator.SetInteger("State", state);
    }
}