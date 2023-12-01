import { Debug, GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import BackgroundManager from '../Blocks/Background/BackgroundManager';
import GroundManager from '../Blocks/Background/GroundManager';
import { Background } from 'UnityEngine.UIElements';

export default class EnviromentManager extends ZepetoScriptBehaviour {

    public static Instance: EnviromentManager;


    public Awake(): void {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern

        if (EnviromentManager.Instance == null) EnviromentManager.Instance = this;
        else GameObject.Destroy(this);
    }

    public StartEnviromentManager() {
        BackgroundManager.Instance.StartBackGroundManager();
        GroundManager.Instance.StartGroundManager();
    }

    public PauseEnviromentManager() {
        BackgroundManager.Instance.PauseBackgroundManager();
        GroundManager.Instance.PauseGroundManager();

    }

    public ResumeEnviromentManager() {
        BackgroundManager.Instance.ResumeBackgroundManager();
        GroundManager.Instance.ResumeGroundManager();
    }

    
}