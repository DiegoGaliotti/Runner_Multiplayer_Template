import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import GameRunnerManager from '../../Managers/GameRunnerManager';

// Class that represents the lobby user interface
export default class UILobby extends ZepetoScriptBehaviour {

    // Reference to the button to access the leaderboard
    public leaderboardButton: Button;

    // Start is called before the first frame update
    Start(){
        // Adding a listener to the leaderboardButton click event to execute the OnGamePause method
        this.leaderboardButton.onClick.AddListener(GameRunnerManager.Instance.OnRunnerPause);
    }
}