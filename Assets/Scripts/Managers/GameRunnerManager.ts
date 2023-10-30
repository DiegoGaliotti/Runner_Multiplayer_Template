import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Debug, GameObject } from 'UnityEngine';
import TimerManager from './TimerManager';
import CharacterController from '../Character/CharacterController';
import UIRunnerManager from './UIRunnerManager';
import HealthManager from './HealthManager';
import LevelManager from './LevelManager';
import { SceneManager } from 'UnityEngine.SceneManagement';

export default class GameRunnerManager extends ZepetoScriptBehaviour {

    public static Instance: GameRunnerManager; // This class instance
    public isGameRunning: bool; // Flag that indicates if the game is running

    // Awake is called when the script instance is being loaded
    public Awake(): void {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (GameRunnerManager.Instance == null) GameRunnerManager.Instance = this;
        else GameObject.Destroy(this);
    }

    Start() {    
        
        this.isGameRunning = false;
        this.OnStart();
    }

    public OnStart(){
        UIRunnerManager.Instance.UIOnStart();
        Debug.Log("Llegue");
    }

    public OnGameStart(){
        this.isGameRunning = true;
        UIRunnerManager.Instance.UIOnGame();
        HealthManager.Instance.ResetHealth();
        CharacterController.Instance.characterGameController(); 
        TimerManager.Instance.StartTimer(); // This will instance the startTimer method
        LevelManager.Instance.StartGame();
    }

    public OnGamePause(){
        LevelManager.Instance.PauseGame();
        UIRunnerManager.Instance.UIOnGamePause()
    }

    public OnGamePlay(){
        TimerManager.Instance.ResetTimer();
        LevelManager.Instance.ResumeGame();
        UIRunnerManager.Instance.UIOnGame()
    }

    public OnGameOver(){
        this.isGameRunning = false;
        LevelManager.Instance.PauseGame();
        UIRunnerManager.Instance.UIGameOver();
    }

    public BackToLobby(){
        SceneManager.LoadScene(0);
    }

}