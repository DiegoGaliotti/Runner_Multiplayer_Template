import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { TextMeshProUGUI } from 'TMPro';
import { GameObject } from 'UnityEngine';
import { Rank } from 'ZEPETO.Script.Leaderboard';

export default class UILeaderboard extends ZepetoScriptBehaviour {
    public nombreText: TextMeshProUGUI;
    public puntajeText: TextMeshProUGUI;
    public rankText: TextMeshProUGUI;

    public static Instance: UILeaderboard;

    public onUpdateLeaderboard: (name: string, score: number, rank: Rank) => void;

    Start() {
        if (UILeaderboard.Instance == null) UILeaderboard.Instance = this;
        else GameObject.Destroy(this);

        this.onUpdateLeaderboard = (name, score, rank) => {
            this.nombreText.text = `Name: ${name}`;
            this.puntajeText.text = `Score: ${score}`;
            this.rankText.text = `Rank: ${rank.rank}`;


        }
    }
}
