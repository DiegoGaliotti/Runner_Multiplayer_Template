import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Quaternion, Vector3, GameObject, Debug } from 'UnityEngine';
import TimerManager from './TimerManager';
import CharacterController from '../Character/CharacterController';
import UIRunnerManager from './UIRunnerManager';
import HealthManager from './HealthManager';
import LevelManager from './LevelManager';
import { SpawnInfo, ZepetoCharacter, ZepetoPlayer, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import AnimatorManager from '../Animator/AnimatorManager';
import ScoreManager from './ScoreManager';
import LeaderboarManager from './LeaderboardManager';
import PlayerVisibilityManager from './PlayerVisibilityManager';

// Class that manages the overall game flow
export default class GameRunnerManager extends ZepetoScriptBehaviour {

    // Singleton instance of this class
    public static Instance: GameRunnerManager;

    // Flag that indicates if the game is currently running
    public isGameRunning: bool;

    // Reference to the teleport runner door GameObject
    public teleportRunnerDoor: GameObject

    // Reference to the local character controlled by the player
    private _localCharacter: ZepetoCharacter;


    // Reference to the local character controlled by the player
    public Awake(): void {
         // Allocating the instance of this class to make it a "singleton"
        if (GameRunnerManager.Instance == null) GameRunnerManager.Instance = this;
        else GameObject.Destroy(this);

        // Listening for the addition of a local player and setting the local character reference
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this._localCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        });
    }

    // Method called at the start of the lobby
    public Start(){
        // Setting up the initial UI state when the game start on lobby
        UIRunnerManager.Instance.UIOnLobby();
    }

    // Method called when the runner game is initialized
    public OnRunnerInitialize(){
        this.isGameRunning = false; // The game its not yet running
        // Activating the teleport runner door if it exists
        if (this.teleportRunnerDoor != null) this.teleportRunnerDoor.SetActive(true);
        // Configuring character controller and UI for the runner game initialization
        CharacterController.Instance.CharacterRunnerController();
        UIRunnerManager.Instance.UIOnStart();
        // Create a new level and the pause movements
        LevelManager.Instance.StartGame();
        LevelManager.Instance.PauseGame();
        PlayerVisibilityManager.Instance.HideAllPlayers();
    }

    // Method called when the runner game starts
    public OnRunnerStart(){
        // Resetting scores and setting the game to running state
        ScoreManager.Instance.ResetPoints();
        this.isGameRunning = true; // The game is running
        // Updating UI and game elements for the runner game start
        UIRunnerManager.Instance.UIOnGame();
        HealthManager.Instance.ResetHealth();
        AnimatorManager.Instance.GameRunning(this.isGameRunning);
        TimerManager.Instance.StartTimer(); 
        LevelManager.Instance.ResumeGame();
        // Desactivating the teleport runner door if it exists
        if (this.teleportRunnerDoor != null) this.teleportRunnerDoor.SetActive(false);
    }

    // Method called when the runner game is paused
    public OnRunnerPause(){
        // Pausing the game, updating UI, and showing the leaderboard
        this.isGameRunning = false;
        AnimatorManager.Instance.GameRunning(this.isGameRunning);
        LeaderboarManager.Instance.GetLeaderboard();
        UIRunnerManager.Instance.UILeaderboard();
    }

    // Method called when the runner game resumes play
    public OnRunnerPlay(){
        // Resuming the game, resetting the timer, and updating UI
        this.isGameRunning = true;
        TimerManager.Instance.ResetTimer();
        LevelManager.Instance.ResumeGame();
        AnimatorManager.Instance.GameRunning(this.isGameRunning);
        UIRunnerManager.Instance.UIOnGame();
    }

    // Method called when the runner game is over
    public OnRunnerGameOver(){
        // Ending the game, updating UI, and resetting scores and timer
        this.isGameRunning = false;
        LevelManager.Instance.EndGame();
        AnimatorManager.Instance.GameRunning(this.isGameRunning);
        LeaderboarManager.Instance.SetScore(ScoreManager.Instance.GetTotalScore());
        TimerManager.Instance.ResetTimer();
        ScoreManager.Instance.ResetPoints();
        UIRunnerManager.Instance.UIGameOver();
    }

    // Method to return to the lobby
    public BackToLobby(){
        // Teleporting the local character to the lobby, updating UI, and setting lobby character controller
        this.isGameRunning = false;
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this._localCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        });
        const spawnInfo = new SpawnInfo();
        spawnInfo.position = new Vector3(-200, 10, 0);
        spawnInfo.rotation = Quaternion.Euler(0, 0, 0);
        this._localCharacter.Teleport(spawnInfo.position, spawnInfo.rotation);
        AnimatorManager.Instance.GameRunning(this.isGameRunning);
        PlayerVisibilityManager.Instance.ViewAllPlayers();
        CharacterController.Instance.CharacterLobbyController();
        UIRunnerManager.Instance.UIOnLobby();
    }

}