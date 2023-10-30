import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { GameObject } from 'UnityEngine';
import TimerManager from './TimerManager';
import CharacterController from '../Character/CharacterController';
import UIRunnerManager from './UIRunnerManager';
import HealthManager from './HealthManager';
import LevelManager from './LevelManager';

export default class GameLobbyManager extends ZepetoScriptBehaviour {

    public static Instance: GameLobbyManager; // This class instance
    public isGameRunning: bool; // Flag that indicates if the game is running

    // Awake is called when the script instance is being loaded
    public Awake(): void {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (GameLobbyManager.Instance == null) GameLobbyManager.Instance = this;
        else GameObject.Destroy(this);
    }

    Start() {    
        this.OnStart();
    }

    public OnStart(){
        CharacterController.Instance.characterMarketController(); 
    }

    public OnGameStart(){

        CharacterController.Instance.characterMarketController(); 

    }

    public OnGamePause(){

    }

    public OnGamePlay(){

    }

    public OnGameReset(){

    }

    public OnGameOver(){

    }

}