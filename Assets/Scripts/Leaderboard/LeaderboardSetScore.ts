import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { SetScoreResponse, LeaderboardAPI } from 'ZEPETO.Script.Leaderboard';

export default class LeaderboardSetScore extends ZepetoScriptBehaviour {

    public leaderboardId: string;
    public score: number;

    Start() {
        LeaderboardAPI.SetScore(this.leaderboardId, this.score, this.OnResult, this.OnError);
    }

    OnResult(result: SetScoreResponse) {
        console.log(`Set score: result.isSuccess: ${result.isSuccess}`);
    }

    OnError(error: string) {
        console.error(error);
    }
}