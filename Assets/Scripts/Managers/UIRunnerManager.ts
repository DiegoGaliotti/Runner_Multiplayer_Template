import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

// This class manages everything related to the GameUI
export default class UIRunnerManager extends ZepetoScriptBehaviour {

    // References to UI game objects
    public uIOnStart: GameObject; // UI that takes you to the game
    public uIOnGame: GameObject;// UI during the game while running
    public uIOnGameOver: GameObject;// UI that appears when you lose or win
    public uIOnLeaderboard: GameObject;// UI that appears when entering the leaderboard on lobby
    public uIOnLobby: GameObject; // UI in the lobby

    // Singleton instance of this class
    public static Instance: UIRunnerManager;

    // Awake is called when the script instance is being loaded
    Awake() {
        // Assignment of the instance of this class to make it a "singleton"
        if (UIRunnerManager.Instance != null) GameObject.Destroy(this.gameObject);
        UIRunnerManager.Instance = this;
    }

    // Method to show the UI at the start of the game
    UIOnStart(){
        this.uIOnStart.SetActive(true);
        this.uIOnGameOver.SetActive(false);
        this.uIOnGame.SetActive(false);
        this.uIOnLeaderboard.SetActive(false);
        this.uIOnLobby.SetActive(false);
    }

    // Method to show the UI during the game
    UIOnGame(){
        this.uIOnStart.SetActive(false);
        this.uIOnGameOver.SetActive(false);
        this.uIOnGame.SetActive(true);
        this.uIOnLeaderboard.SetActive(false);
        this.uIOnLobby.SetActive(false);
    }

    // Method to show the UI when the game is over
    UIGameOver(){
        this.uIOnStart.SetActive(false);
        this.uIOnGameOver.SetActive(true);
        this.uIOnGame.SetActive(false);
        this.uIOnLeaderboard.SetActive(false);
        this.uIOnLobby.SetActive(false);
    }

    // Method to show the UI in the lobby
    UIOnLobby(){
        this.uIOnStart.SetActive(false);
        this.uIOnGameOver.SetActive(false);
        this.uIOnGame.SetActive(false);
        this.uIOnLeaderboard.SetActive(false);
        this.uIOnLobby.SetActive(true);
    }

    // Method to show the UI of the leaderboard
    UILeaderboard(){
        this.uIOnStart.SetActive(false);
        this.uIOnGameOver.SetActive(false);
        this.uIOnGame.SetActive(false);
        this.uIOnLeaderboard.SetActive(true);
        this.uIOnLobby.SetActive(false);
    }
}