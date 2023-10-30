import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Button } from 'UnityEngine.UI';
import GameRunnerManager from '../../Managers/GameRunnerManager';

export default class UIOnStart extends ZepetoScriptBehaviour {

    public GameStartButton: Button; //Reference to the button to go back to main menu

    Start() {    
        this.GameStartButton.onClick.AddListener(this.StartGame)
    }

    StartGame(){
        GameRunnerManager.Instance.OnGameStart();
    }

}