import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { SetScoreResponse, LeaderboardAPI } from 'ZEPETO.Script.Leaderboard';

export default class LeaderboardSetScore extends ZepetoScriptBehaviour {

    //Este código es el que me graba el valor del tranking.

    public leaderboardId: string;
    public score: number;

    Start() {
        LeaderboardAPI.SetScore(this.leaderboardId, this.score, this.OnResult, this.OnError); //este es el metodo que me graba.
    }

    OnResult(result: SetScoreResponse) {
        console.log(`Set score: result.isSuccess: ${result.isSuccess}`);
    }

    OnError(error: string) {
        console.error(error);
    }
}