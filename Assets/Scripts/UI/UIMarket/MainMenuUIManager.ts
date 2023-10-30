import { Debug, GameObject } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import MainMenuSceneManager from './MainMenuSceneManager';

// This class manages everything related to the ManeManu UI
export default class MainMenuUIManager extends ZepetoScriptBehaviour {

    public startButton: Button; //Reference to the button to start the game scene
    public marketPlaceButton: Button; //Reference to the button to marketplace
    public optionsButton: Button; //Reference to the button to marketplace

    public static Instance: MainMenuUIManager; // This class instance

    // Awake is called when the script instance is being loaded
    Awake() {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (MainMenuUIManager.Instance != null) GameObject.Destroy(this.gameObject);
        MainMenuUIManager.Instance = this;
    }

    // Start is called on the frame when a script is enabled just before any of the Update methods is called the first time
    Start() {    
        this.startButton.onClick.AddListener(this.OnGameStart); //start button addlistener
        this.marketPlaceButton.onClick.AddListener(this.MarketPlace);  //start button addlistener
        this.optionsButton.onClick.AddListener(this.Options);  //start button addlistener
    }

    // This method is called when the Start Game button is pressed
    OnGameStart(): void{
        MainMenuSceneManager.Instance.LoadGameScene(); //Take to level 1 
    }

    // This method is called when the MarketPlace button is pressed
    MarketPlace(): void{
        MainMenuSceneManager.Instance.MarketPlaceScene(); //Take to game MarketPlace
    }

    Options(): void{
        MainMenuSceneManager.Instance.OptionsScene(); //Take to game Options
    }

}