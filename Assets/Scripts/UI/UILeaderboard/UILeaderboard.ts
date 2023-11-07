import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { TextMeshProUGUI } from 'TMPro';
import { GameObject } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { Rank } from 'ZEPETO.Script.Leaderboard';
import UIRunnerManager from '../../Managers/UIRunnerManager';
import LeaderboarManager from '../../Managers/LeaderboardManager';

export default class UILeaderboard extends ZepetoScriptBehaviour {
    
    public nombreText: TextMeshProUGUI;
    public puntajeText: TextMeshProUGUI;
    public rankText: TextMeshProUGUI;
    public closeButton: Button;

    public info: TextMeshProUGUI;

    public static Instance: UILeaderboard;

    Awake(){
        if (UILeaderboard.Instance == null) UILeaderboard.Instance = this;
        else GameObject.Destroy(this);
    }

    public onUpdateLeaderboard: (name: string, score: number, rank: Rank) => void;

    Start() {
        this.closeButton.onClick.AddListener(this.Close);
        this.info = LeaderboarManager.Instance.leaderboardText;

        this.onUpdateLeaderboard = (name, score, rank) => {
            this.nombreText.text = `Name: ${name}`;
            this.puntajeText.text = `Score: ${score}`;
            this.rankText.text = `Rank: ${rank.rank}`;
        }
    }

    Close(){
        UIRunnerManager.Instance.UIOnLobby();
    }

}
