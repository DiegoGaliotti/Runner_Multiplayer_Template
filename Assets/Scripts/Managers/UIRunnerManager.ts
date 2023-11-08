import { Debug, GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

// This class manages everything related to the GameUI
export default class UIRunnerManager extends ZepetoScriptBehaviour {

    public uIOnStart: GameObject;// Este GameObject es para referenciar con la UI que te lleva al juego
    public uIOnGame: GameObject;// Este GameObject es para referenciar con la UI del juego mientras corres
    public uIOnGameOver: GameObject;// Este GameObject es para referenciar con la UI aparece cuando perdes
    public uIOnLeaderboard: GameObject;// Este GameObject es para referenciar con la UI aparece cuando entras al leaderboard y pausas el juego
    public uIOnLobby: GameObject;

    public static Instance: UIRunnerManager; // This class instance

    // Awake is called when the script instance is being loaded
    Awake() {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (UIRunnerManager.Instance != null) GameObject.Destroy(this.gameObject);
        UIRunnerManager.Instance = this;
    }

    UIOnStart(){
        this.uIOnStart.SetActive(true);
        this.uIOnGameOver.SetActive(false);
        this.uIOnGame.SetActive(false);
        this.uIOnLeaderboard.SetActive(false);
        this.uIOnLobby.SetActive(false);
    }

    UILeaderboard(){
        this.uIOnStart.SetActive(false);
        this.uIOnGameOver.SetActive(false);
        this.uIOnGame.SetActive(false);
        this.uIOnLeaderboard.SetActive(true);
        this.uIOnLobby.SetActive(false);
    }

    UIOnGame(){
        this.uIOnStart.SetActive(false);
        this.uIOnGameOver.SetActive(false);
        this.uIOnGame.SetActive(true);
        this.uIOnLeaderboard.SetActive(false);
        this.uIOnLobby.SetActive(false);
    }

    UIGameOver(){
        this.uIOnStart.SetActive(false);
        this.uIOnGameOver.SetActive(true);
        this.uIOnGame.SetActive(false);
        this.uIOnLeaderboard.SetActive(false);
        this.uIOnLobby.SetActive(false);
    }

    UIOnLobby(){
        this.uIOnStart.SetActive(false);
        this.uIOnGameOver.SetActive(false);
        this.uIOnGame.SetActive(false);
        this.uIOnLeaderboard.SetActive(false);
        this.uIOnLobby.SetActive(true);
    }
}