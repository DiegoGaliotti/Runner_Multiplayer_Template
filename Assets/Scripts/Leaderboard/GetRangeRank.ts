import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { GetRangeRankResponse, LeaderboardAPI, ResetRule } from 'ZEPETO.Script.Leaderboard';
import UILeaderboard from '../UI/UILeaderboard/UILeaderboard';
import { GameObject } from 'UnityEngine';

export default class GetRangeRank extends ZepetoScriptBehaviour {

    public leaderboardId: string;
    public startRank: number;
    public endRank: number;
    public resetRule: ResetRule;
    public uiLeaderboard: UILeaderboard;

    Start() {
        LeaderboardAPI.GetRangeRank(this.leaderboardId, this.startRank, this.endRank, this.resetRule, false, 
            this.OnResult, this.OnError);
    }

    OnResult(result: GetRangeRankResponse) {
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
    
    OnError(error: string) {
        console.error(error);
    }

}
    
   

