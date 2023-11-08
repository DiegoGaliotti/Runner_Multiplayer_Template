import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameRunnerManager from '../../Managers/GameRunnerManager';
import { SpawnInfo, ZepetoCharacter, ZepetoPlayer, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { Quaternion, Vector3, } from 'UnityEngine';

export default class UIOnGameOver extends ZepetoScriptBehaviour {

    public backToLobbyButton: Button; //Reference to the button to go back to main menu
    public restartButton: Button; //Reference to the button to go back to main menu


    Start() {    
        this.backToLobbyButton.onClick.AddListener(this.BackToLobby)
        this.restartButton.onClick.AddListener(this.Restart)
    }

    BackToLobby(){
        GameRunnerManager.Instance.BackToLobby();
    }

    Restart(){
        GameRunnerManager.Instance.OnGameStart();
    }

}