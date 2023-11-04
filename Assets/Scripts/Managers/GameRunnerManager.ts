import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Quaternion, Vector3, Debug, GameObject } from 'UnityEngine';
import TimerManager from './TimerManager';
import CharacterController from '../Character/CharacterController';
import UIRunnerManager from './UIRunnerManager';
import HealthManager from './HealthManager';
import LevelManager from './LevelManager';
import { SceneManager } from 'UnityEngine.SceneManagement';
import TeleportToRunner from '../Lobby/TeleportToRunner';
import { SpawnInfo, ZepetoCharacter, ZepetoPlayer, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import AnimatorManager from '../Animator/AnimatorManager';

export default class GameRunnerManager extends ZepetoScriptBehaviour {

    public static Instance: GameRunnerManager; // This class instance
    public isGameRunning: bool; // Flag that indicates if the game is running
    public teleportRunnerDoor: GameObject

    private _localCharacter: ZepetoCharacter;


    // Awake is called when the script instance is being loaded
    public Awake(): void {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (GameRunnerManager.Instance == null) GameRunnerManager.Instance = this;
        else GameObject.Destroy(this);

        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this._localCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        });
    }

    public OnStart(){
        this.isGameRunning = false;
        CharacterController.Instance.CharacterRunnerController();
        UIRunnerManager.Instance.UIOnStart();
        LevelManager.Instance.StartGame();
        LevelManager.Instance.PauseGame();

    }

    public OnGameStart(){
        this.isGameRunning = true;
        UIRunnerManager.Instance.UIOnGame();
        HealthManager.Instance.ResetHealth();
        AnimatorManager.Instance.GameRunning(this.isGameRunning);
        //CharacterController.Instance.characterGameController(); 
        TimerManager.Instance.StartTimer(); // This will instance the startTimer method
        LevelManager.Instance.ResumeGame();
        if (this.teleportRunnerDoor != null) this.teleportRunnerDoor.SetActive(false);

        }

    public OnGamePause(){
        this.isGameRunning = false;
        LevelManager.Instance.PauseGame();
        UIRunnerManager.Instance.UIOnGamePause();
        AnimatorManager.Instance.GameRunning(this.isGameRunning);
    }

    public OnGamePlay(){
        this.isGameRunning = true;
        TimerManager.Instance.ResetTimer();
        LevelManager.Instance.ResumeGame();
        UIRunnerManager.Instance.UIOnGame()
        AnimatorManager.Instance.GameRunning(this.isGameRunning);
    }

    public OnGameOver(){
        this.isGameRunning = false;
        LevelManager.Instance.PauseGame();
        UIRunnerManager.Instance.UIGameOver();
        AnimatorManager.Instance.GameRunning(this.isGameRunning);
    }

    public BackToLobby(){
        this.isGameRunning = false;
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this._localCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        });
        const spawnInfo = new SpawnInfo();
        spawnInfo.position = new Vector3(-200, 10, 0)
        spawnInfo.rotation = Quaternion.Euler(0, 0, 0)
        this._localCharacter.Teleport(spawnInfo.position, spawnInfo.rotation);
        UIRunnerManager.Instance.UIOnLobby();
        AnimatorManager.Instance.GameRunning(this.isGameRunning);
        CharacterController.Instance.CharacterLobbyController();
    }

}