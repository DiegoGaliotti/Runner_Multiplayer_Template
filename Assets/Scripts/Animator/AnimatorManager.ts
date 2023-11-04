import { Debug, GameObject, RuntimeAnimatorController} from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import {LocalPlayer, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import AnimationControllerRunner from './AnimationControllerRunner';

export default class AnimatorManager extends ZepetoScriptBehaviour {

    public AnimatorRunner: RuntimeAnimatorController;
    public AnimatorV2: RuntimeAnimatorController;

    public static Instance: AnimatorManager; // This class instance
    private localPlayer: LocalPlayer;

    Awake() {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (AnimatorManager.Instance != null) GameObject.Destroy(this.gameObject);
        AnimatorManager.Instance = this;

        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(()=> {
            this.localPlayer = ZepetoPlayers.instance.LocalPlayer;
            this.localPlayer.zepetoPlayer.character.gameObject.AddComponent<AnimationControllerRunner>();
        });
    }

    public Start()
    {
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(()=> {
            this.localPlayer = ZepetoPlayers.instance.LocalPlayer;
            this.localPlayer.zepetoPlayer.character.gameObject.AddComponent<AnimationControllerRunner>();
        });
    }
    
    GameRunning(isGameRunning: boolean){
        
        if(isGameRunning){
            AnimationControllerRunner.Instance.ApplyOverrideAnimation(isGameRunning);
        }
        else{
            AnimationControllerRunner.Instance.ApplyOverrideAnimation(isGameRunning);
        }
    }



}