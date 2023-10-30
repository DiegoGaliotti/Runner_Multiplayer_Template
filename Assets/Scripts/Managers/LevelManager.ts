import { Debug, GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import SpawnBlockManager from '../Blocks/Blocks/SpawnBlockManager';
import EnviromentManager from './EnviromentManager';

export default class LevelManager extends ZepetoScriptBehaviour {

    public static Instance: LevelManager;


    public Awake(): void {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (LevelManager.Instance == null) LevelManager.Instance = this;
        else GameObject.Destroy(this);
    }

    public StartGame() {
        SpawnBlockManager.Instance.StartSpawnBlockManager();
        EnviromentManager.Instance.StartEnviromentManager();
    }

    PauseGame(){
        SpawnBlockManager.Instance.StopSpawnBlockManager();
        EnviromentManager.Instance.PauseEnviromentManager();
    }

    ResumeGame() {
        SpawnBlockManager.Instance.ResumeSpawnBlockManager();
        EnviromentManager.Instance.ResumeEnviromentManager();
    }


}