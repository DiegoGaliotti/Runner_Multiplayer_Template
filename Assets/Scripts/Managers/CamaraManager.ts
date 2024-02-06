import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { GameObject} from 'UnityEngine';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import SideViewController from '../Camara/SideViewController';

export default class CamaraManager extends ZepetoScriptBehaviour {

    // Singleton instance of this class
    public static Instance: CamaraManager;

    // Awake is called when the script instance is being loaded
    Awake() {
        // Allocating the instance of this class to make it a "singleton"
        if (CamaraManager.Instance != null) GameObject.Destroy(this.gameObject);
        CamaraManager.Instance = this;
    }

    ActivateLobbyCamara(){

        // Turn on Zepeto camera and set up input control loop
        ZepetoPlayers.instance.LocalPlayer.zepetoCamera.gameObject.SetActive(true);
        SideViewController.Instance.gameObject.SetActive(false);
    }

    ActivateRunnerCamara(){
        // Turn off Zepeto camera and set up input control loop
        ZepetoPlayers.instance.LocalPlayer.zepetoCamera.gameObject.SetActive(false);
        SideViewController.Instance.gameObject.SetActive(true);
    }

}