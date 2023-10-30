import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { GetLeaderboardResponse, LeaderboardAPI } from 'ZEPETO.Script.Leaderboard';

export default class GetLeaderboard extends ZepetoScriptBehaviour {

    public leaderboardId: string;

    Start() {
        LeaderboardAPI.GetLeaderboard(this.leaderboardId, this.OnResult, this.OnError);
    }
    
    OnResult(result: GetLeaderboardResponse) {
        console.log(`Get Leaderboard Respones: result.isSuccess: ${result.isSuccess}`);

        if (result.leaderboard) {
            console.log(`id: ${result.leaderboard.id}, name: ${result.leaderboard.name}`);
        }
    }

    OnError(error: string) {
        console.error(error);
    }
}