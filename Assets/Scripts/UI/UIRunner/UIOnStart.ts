import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Button } from 'UnityEngine.UI';
import GameRunnerManager from '../../Managers/GameRunnerManager';

// Class that represents the UI at the start of the game
export default class UIOnStart extends ZepetoScriptBehaviour {

    // Reference to the button that triggers going back to the main menu
    public GameStartButton: Button; 

    // Start is called before the first frame update
    Start() {    
        // Adding a listener to the button click event calling the OnGameStart method of the GameRunnerManager instance
        this.GameStartButton.onClick.AddListener(this.OnRunnerStart)
    }

    // This method call the method of the GameRunnerManager instance
    OnRunnerStart(){
        GameRunnerManager.Instance.OnRunnerStart();
    }

}