import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { TextMeshProUGUI } from 'TMPro';
import { Slider } from 'UnityEngine.UI';
import ScoreManager, { Currency } from '../../Managers/ScoreManager';
import HealthManager from '../../Managers/HealthManager';
import TimerManager from '../../Managers/TimerManager';

// Class that represents the in-game user interface
export default class UIOnGame extends ZepetoScriptBehaviour {

    // References to UI elements
    public collectable1Txt: TextMeshProUGUI; // Points text reference for first type of collectable
    public collectable2Txt: TextMeshProUGUI; // Points text reference for second type of collectable
    public healthSlider: Slider; // Reference to the health bar
    public timeTxt: TextMeshProUGUI;  // Time text reference

    // Update is called once per frame
    Update() {
        // Update the scores, health, and time in the UI during the game
        this.collectable1Txt.text = ScoreManager.Instance.GetPoints(Currency.collectable1).toString();
        this.collectable2Txt.text = ScoreManager.Instance.GetPoints(Currency.collectable2).toString();
        this.healthSlider.value = HealthManager.Instance.currentHealth / HealthManager.Instance.maxHealth;
        this.timeTxt.text = TimerManager.Instance.GetTimeFormated();
    }
}