import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { SetScoreResponse, LeaderboardAPI, GetRangeRankResponse, ResetRule } from 'ZEPETO.Script.Leaderboard';
import UILeaderboard from '../UI/UILeaderboard/UILeaderboard';

// This class manages interactions with the leaderboard system
export default class LeaderboardManager extends ZepetoScriptBehaviour {

    // Identifier for the leaderboard
    public leaderboardId: string;

    // Range for fetching leaderboard ranks
    public startRank: number;
    public endRank: number;

    // Rule for resetting leaderboard
    public resetRule: ResetRule;

    // Singleton instance of this class
    public static Instance: LeaderboardManager;

    // Awake is called when the script instance is being loaded
    Awake() {
        // Allocating the instance of this class to make it a "singleton"
        if (LeaderboardManager.Instance != null) GameObject.Destroy(this.gameObject);
        LeaderboardManager.Instance = this;
    }

    // Method to set the player's score on the leaderboard
    SetScore(score: number) {
        LeaderboardAPI.SetScore(this.leaderboardId, score, this.OnResult, this.OnError);
    }

    // Method to get a range of ranks from the leaderboard
    GetLeaderboard(){
        LeaderboardAPI.GetRangeRank(this.leaderboardId, this.startRank, this.endRank, this.resetRule, false, this.OnResult1, this.OnError); 
    }

    // Callback method for the result of fetching leaderboard ranks
    OnResult1(result: GetRangeRankResponse) {
        if (result.rankInfo.rankList) {
            // Update the UILeaderboard with the name and score.
            console.log("LeaderboardManager On Result1");
            UILeaderboard.Instance.onUpdateLeaderboard(result.rankInfo.rankList);
            console.log(result.rankInfo.rankList);
        } else {
            console.log("The leaderboard rank list is empty.");
        }
    }

    // Callback method for the result of setting the player's score
    OnResult(result: SetScoreResponse) {
        console.log(`Result Message- result.isSuccess: ${result.isSuccess}`);
    }

    // Callback method for handling errors
    OnError(error: string) {
        console.error(error);
    }
}