import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { SetScoreResponse, LeaderboardAPI, GetRangeRankResponse, ResetRule } from 'ZEPETO.Script.Leaderboard';
import { TextMeshProUGUI } from 'TMPro';
import UILeaderboard from '../UI/UILeaderboard/UILeaderboard';

export default class LeaderboarManager extends ZepetoScriptBehaviour {

    public leaderboardId: string;
    public startRank: number;
    public endRank: number;
    public resetRule: ResetRule;

    //public uILeaderboard: UILeaderboard;

    public static Instance: LeaderboarManager; // This class instance

    // Awake is called when the script instance is being loaded
    Awake() {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (LeaderboarManager.Instance != null) GameObject.Destroy(this.gameObject);
        LeaderboarManager.Instance = this;
    }

    SetScore(score: number) {
        LeaderboardAPI.SetScore(this.leaderboardId, score, this.OnResult, this.OnError);
    }

    GetLeaderboard(){
        LeaderboardAPI.GetRangeRank(this.leaderboardId, this.startRank, this.endRank, this.resetRule, false, this.OnResult1, this.OnError); 
    }

    OnResult1(result: GetRangeRankResponse) {
        if (result.rankInfo.rankList) {
            // Update the UILeaderboard with the name and score.
            console.log("LeaderboardManager On Result1");
            UILeaderboard.Instance.onUpdateLeaderboard(result.rankInfo.rankList);
            console.log(result.rankInfo.rankList);
        }

        
        else {
            console.log("La lista de clasificación está vacía.");
        }

    }

    OnResult(result: SetScoreResponse) {
        console.log(`Result Message- result.isSuccess: ${result.isSuccess}`);
    }

    OnError(error: string) {
        console.error(error);
    }
}