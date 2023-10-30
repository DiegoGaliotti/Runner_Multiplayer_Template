import { Collider, Debug, GameObject, ParticleSystem } from 'UnityEngine';
import { Particle } from 'UnityEngine.ParticleSystem';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import ScoreManager from '../Managers/ScoreManager';
import { Currency } from '../Managers/ScoreManager';

// This class controls the behavior of points or coins in the game
export default class CurrencyObject extends ZepetoScriptBehaviour {

    @SerializeField() private currentPointsType: Currency; //Internal currency type
    public pointsValue: number; // Internal value of the element

    // Awake is called when the script instance is being loaded
    public Awake(): void {
        // Assigning a default value to the element
        this.pointsValue;
    }

    // This method handles the reset of the element itself.
    public ResetPoint() {
        //this.particleSystem.transform.position = this.transform.position;
        this.gameObject.SetActive(true);
    }

    // https://docs.unity3d.com/ScriptReference/Collider.OnTriggerEnter.html
    OnTriggerEnter(collider: Collider) {
        // We verify that the collision is with the player by comparing his tag
        if (collider.CompareTag("Player")) {
            // We ask the ScoreManager to add the value of this point
            ScoreManager.Instance.ScorePoints(this.currentPointsType, this.pointsValue);

            // We deactivate the current element
            this.gameObject.SetActive(false);
        }
    }

}