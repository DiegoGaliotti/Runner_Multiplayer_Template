import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import GameRunnerManager from '../../Managers/GameRunnerManager';

export default class UILobby extends ZepetoScriptBehaviour {

    public leaderboardButton: Button;

    Start(){
        this.leaderboardButton.onClick.AddListener(GameRunnerManager.Instance.OnGamePause);
    }

}