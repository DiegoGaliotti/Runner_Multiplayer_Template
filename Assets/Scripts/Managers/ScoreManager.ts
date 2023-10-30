import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
//import { CurrencyService } from "ZEPETO.Currency";

export interface BalanceSync {
    currencyId: number,
    quantity: number,
}

export enum Currency {
    star = 0,
    energy = 1,
} // This enum is a manager for using diferent tipe of points

// This class manages the score
export default class ScoreManager extends ZepetoScriptBehaviour {

    public static Instance: ScoreManager; // This class instanceate
    private pointsAmounts: { [key: string]: number } = {
        [Currency.star]: 0,
        [Currency.energy]: 0
    }; // Internal dictionary of accumulated points and we declare thats start on 0

    // Awake is called when the script instance is being loaded
    public Awake(): void {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (ScoreManager.Instance == null) ScoreManager.Instance = this;
        else GameObject.Destroy(this);
    }

    // This method is called when the player scores a point depending on the point it get
    public ScorePoints(pointsType: Currency, amount: number): void {
        // Add the value of the point passed by parameter to the internal total value
        if (this.pointsAmounts.hasOwnProperty(pointsType)) {
            this.pointsAmounts[pointsType] += amount;
        }
    }

    // This method returns the internal value of the accumulated points
    public GetPoints(pointsType: Currency): number {
        if (this.pointsAmounts.hasOwnProperty(pointsType)) {
            return this.pointsAmounts[pointsType];
        }
        return 0;
    }

    // This method resets the internal value of the accumulated points to 0, for each type of points you have
    public ResetCoins(): void {
        for (const pointsType in this.pointsAmounts) {
            if (this.pointsAmounts.hasOwnProperty(pointsType)) {
                this.pointsAmounts[pointsType] = 0;
            }
        }
    }

}