import {KeyValuePair$2, List$1 } from 'System.Collections.Generic';
import { AnimationClip, Animator, AnimatorOverrideController, Debug, Resources, RuntimeAnimatorController, GameObject } from 'UnityEngine';
import {CharacterState, ZepetoPlayers} from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import AnimatorManager from './AnimatorManager';

export default class AnimationControllerRunner extends ZepetoScriptBehaviour {
    
    private animator: Animator;

    public static Instance: AnimationControllerRunner;

    Awake() {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (AnimationControllerRunner.Instance != null) GameObject.Destroy(this.gameObject);
        AnimationControllerRunner.Instance = this;
    }
    
    public Start()
    {
        this.animator = this.GetComponentInChildren<Animator>();
    }
    
    public ApplyOverrideAnimation(isGameRunning: boolean)
    {
        let state: CharacterState = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.CurrentState;
        
        //Override the animations based on the type enum
        switch(isGameRunning)
        {
            case true:
                Debug.Log("Acá estoy");
                this.animator.runtimeAnimatorController = AnimatorManager.Instance.AnimatorRunner;
                break;
            case false:
                this.animator.runtimeAnimatorController = AnimatorManager.Instance.AnimatorV2;
                break;
        }
        
        this.animator.SetInteger("State",state);
    }
    
    public ResetOverrides()
    {
        //Reset Animations back to original states
        let state: CharacterState = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.CurrentState;
        this.animator.runtimeAnimatorController = AnimatorManager.Instance.AnimatorV2;
        this.animator.SetInteger("State",state);
    }

}