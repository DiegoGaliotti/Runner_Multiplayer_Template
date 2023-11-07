import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { SetScoreResponse, LeaderboardAPI, GetRangeRankResponse, ResetRule } from 'ZEPETO.Script.Leaderboard';
import UILeaderboard from '../UI/UILeaderboard/UILeaderboard';

export default class LeaderboarManager extends ZepetoScriptBehaviour {

    public leaderboardId: string;
    public startRank: number = 1;
    public endRank: number = 10;
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
        LeaderboardAPI.GetRangeRank(this.leaderboardId, this.startRank, this.endRank, this.resetRule, false, this.OnResult, this.OnError); 
    }

    OnResult1(result: GetRangeRankResponse) {
        if (result.rankInfo.myRank) {
            const myRank = result.rankInfo.myRank;
            const name = myRank.name;
            const score = myRank.score;
    
            // Now, you can use 'name' and 'score' in your logic.
            console.log(`name: ${name}, score: ${score}`);
            
            // Update the UILeaderboard with the name and score.
            UILeaderboard.Instance.onUpdateLeaderboard(name, score, myRank);
        }
        if (result.rankInfo.rankList) {
            console.log("Lista de Clasificación:");
            for (let i = 0; i < result.rankInfo.rankList.length; i++) {
                const rank = result.rankInfo.rankList[i];
                console.log(`Rank ${i + 1}:`);
                console.log(`Member: ${rank.member}`);
                console.log(`Rank: ${rank.rank}`);
                console.log(`Score: ${rank.score}`);
                console.log("-------------------");
            }
        } else {
            console.log("La lista de clasificación está vacía.");
        }

    }

    OnResult(result: SetScoreResponse) {
        console.log(`result.isSuccess: ${result.isSuccess}`);
    }

    OnError(error: string) {
        console.error(error);
    }
}