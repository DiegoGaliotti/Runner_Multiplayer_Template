import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { TextMeshProUGUI } from 'TMPro';
import { Slider, Button } from 'UnityEngine.UI';
import ScoreManager, { Currency } from '../../Managers/ScoreManager';
import HealthManager from '../../Managers/HealthManager';
import TimerManager from '../../Managers/TimerManager';
import GameRunnerManager from '../../Managers/GameRunnerManager';

export default class UIOnGame extends ZepetoScriptBehaviour {

    public starTxt: TextMeshProUGUI; // Points text reference in general game interface
    public cherryTxt: TextMeshProUGUI; // Points text reference in general game interface
    public healthSlider: Slider; // Reference to the healthbar
    public timeTxt: TextMeshProUGUI;
    public pauseButton: Button;
    public playButton: Button;


    Start(){
        this.pauseButton.onClick.AddListener(GameRunnerManager.Instance.OnGamePause);
        this.playButton.onClick.AddListener(GameRunnerManager.Instance.OnGamePlay);
    }

    Update() {
        // The scores & health will run once the game starts
        this.starTxt.text = ScoreManager.Instance.GetPoints(Currency.star).toString();
        this.cherryTxt.text = ScoreManager.Instance.GetPoints(Currency.energy).toString();
        this.healthSlider.value = HealthManager.Instance.currentHealth / HealthManager.Instance.maxHealth;
        this.timeTxt.text = TimerManager.Instance.GetTimeFormated();
    }


}