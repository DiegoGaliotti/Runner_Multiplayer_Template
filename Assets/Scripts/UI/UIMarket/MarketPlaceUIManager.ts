import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { GameObject } from 'UnityEngine';
import { SceneManager } from 'UnityEngine.SceneManagement';
import MainMenuSceneManager from './MainMenuSceneManager';
import { Button } from 'UnityEngine.UI';

export default class MarketPlaceUIManager extends ZepetoScriptBehaviour {

    public mainMenuButton: Button; //Reference to the button to go back to main menu
    public static Instance: MarketPlaceUIManager; // This class instance
    
        // Awake is called when the script instance is being loaded
    Awake() {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (MarketPlaceUIManager.Instance != null) GameObject.Destroy(this.gameObject);
        MarketPlaceUIManager.Instance = this;
    }

    Start() {    
        this.mainMenuButton.onClick.AddListener(this.ToMainMenu); //start button addlistener
    }

    ToMainMenu(){
        //Instanceate the MainMenuSceneManager the method to take you for main menu scene 
        MainMenuSceneManager.Instance.MainMenuScene();
    }
}    
