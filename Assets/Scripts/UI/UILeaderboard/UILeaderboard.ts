import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { TextMeshProUGUI } from 'TMPro';
import { GameObject } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { Rank } from 'ZEPETO.Script.Leaderboard';
import UIRunnerManager from '../../Managers/UIRunnerManager';
import LeaderboarManager from '../../Managers/LeaderboardManager';
import { SymbolTable } from 'typescript';

export default class UILeaderboard extends ZepetoScriptBehaviour {
    

    public rankBoard: TextMeshProUGUI;
    public closeButton: Button;

    public static Instance: UILeaderboard;

    Awake(){
        if (UILeaderboard.Instance == null) UILeaderboard.Instance = this;
        else GameObject.Destroy(this);
    }

    public onUpdateLeaderboard: (ranking: Rank[]) => void;

    Start() {
        this.closeButton.onClick.AddListener(this.Close);

        console.log("on Start");
        this.onUpdateLeaderboard = (ranking: Rank[]) => {
            console.log("esto es el " + ranking);
            this.rankBoard.text = "";
            for (const rank of ranking){
                let fila = " " + rank.rank + " - " + rank.name + " - " + rank.score + "\n";
                this.rankBoard.text += fila;
                console.log(fila);
            }
        }       
    }

    Close(){
        UIRunnerManager.Instance.UIOnLobby();
    }

}
