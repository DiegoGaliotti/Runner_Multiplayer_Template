import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { TextMeshProUGUI } from 'TMPro';
import { GameObject } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { Rank } from 'ZEPETO.Script.Leaderboard';
import UIRunnerManager from '../../Managers/UIRunnerManager';

// Class that represents the leaderboard user interface
export default class UILeaderboard extends ZepetoScriptBehaviour {
    
    // Reference to UI elements 
    public rankBoard: TextMeshProUGUI; // Text displaying the leaderboard
    public closeButton: Button; // Button to close the leaderboard

    // Singleton instance of this class
    public static Instance: UILeaderboard;

    // Awake is called when the script instance is being loaded
    Awake(){
        // Assigning the instance of this class to make it a "singleton"
        if (UILeaderboard.Instance == null) UILeaderboard.Instance = this;
        else GameObject.Destroy(this);
    }

    // Callback function for updating the leaderboard
    public onUpdateLeaderboard: (ranking: Rank[]) => void;

    // Start is called before the first frame update
    Start() {
        // Adding a listener to the closeButton click event Switching the UI to the lobby when the leaderboard is closed
        this.closeButton.onClick.AddListener(this.CloseLeaderboard);

        // Setting up the onUpdateLeaderboard callback function
        this.onUpdateLeaderboard = (ranking: Rank[]) => {
            this.rankBoard.text = "";
            // Iterating through the provided ranking data and updating the UI
            for (const rank of ranking){
                let fila = " " + rank.rank + " - " + rank.name + " - " + rank.score + "\n";
                this.rankBoard.text += fila;
            }
        }       
    }

    CloseLeaderboard(){
        UIRunnerManager.Instance.UIOnLobby();
    }
}
