import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import ScoreManager from '../Managers/ScoreManager';
import { Currency } from '../Managers/ScoreManager';

// This class controls the behavior of points or coins in the game
export default class CurrencyObject extends ZepetoScriptBehaviour {

    // Internal currency type of the currency object
    @SerializeField() private currentCollectable: Currency;

    // Internal value of the currency object
    public pointsValue: number;

    // Awake is called when the script instance is being loaded
    public Awake(): void {
        // Assigning a default value to the element (Note: the original code seems to be missing a value assignment here)
        this.pointsValue;
    }

    // This method handles the reset of the element itself.
    public ResetPoint() {
        // Resetting the position of the element and activating it
        this.gameObject.SetActive(true);
    }

    // This method is called when another collider enters the trigger collider attached to this object
    OnTriggerEnter(collider: Collider) {
        // We verify that the collision is with the player by comparing his tag
        if (collider.CompareTag("Player")) {
            // We ask the ScoreManager to add the value of this point
            ScoreManager.Instance.ScorePoints(this.currentCollectable, this.pointsValue);
            // We deactivate the current element
            this.gameObject.SetActive(false);
        }
    }

}