import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import SpawnBlockManager from '../Blocks/Blocks/SpawnBlockManager';
import EnviromentManager from './EnviromentManager';

// Define the LevelManager class which extends the ZepetoScriptBehaviour class
export default class LevelManager extends ZepetoScriptBehaviour {

    public static Instance: LevelManager;

    public Awake(): void {
        // This is how the instance of this class is allocated, making it a "singleton"
        if (LevelManager.Instance == null) LevelManager.Instance = this;
        else GameObject.Destroy(this);
    }

    // Start the game by starting the spawn and environment managers
    public StartGame() {
        SpawnBlockManager.Instance.StartSpawnBlockManager();
        EnviromentManager.Instance.StartEnviromentManager();
    }

    // Pause the game by stopping the spawn and environment managers
    PauseGame() {
        SpawnBlockManager.Instance.StopSpawnBlockManager();
        EnviromentManager.Instance.PauseEnviromentManager();
    }

    // Resume the game by starting the spawn and environment managers
    ResumeGame() {
        SpawnBlockManager.Instance.StartSpawnBlockManager();
        EnviromentManager.Instance.ResumeEnviromentManager();
    }

    // End the game by destroying all blocks and pausing the environment manager
    EndGame() {
        SpawnBlockManager.Instance.DestroyAllBlocks();
        EnviromentManager.Instance.PauseEnviromentManager();
    }
}