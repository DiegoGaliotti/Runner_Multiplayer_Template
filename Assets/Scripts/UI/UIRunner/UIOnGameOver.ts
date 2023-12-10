import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameRunnerManager from '../../Managers/GameRunnerManager';

// Class that represents the game over user interface
export default class UIOnGameOver extends ZepetoScriptBehaviour {

    // References to UI buttons
    public backToLobbyButton: Button; // Reference to the button to go back to the main menu
    public restartButton: Button; // Reference to the button to restart the game

    // Start is called before the first frame update
    Start() { 
        // Adding listeners to the button click events to execute the corresponding methods  
        // Calling the BackToLobby method
        this.backToLobbyButton.onClick.AddListener(this.BackToLoby)
        // Calling the OnGameStart method of the GameRunnerManager instance to restart the game
        this.restartButton.onClick.AddListener(GameRunnerManager.Instance.OnRunnerStart)
    }

    // This Method is calling the BackToLobby method of the GameRunnerManager instance
    BackToLoby(){
        GameRunnerManager.Instance.BackToLobby();
    }
}