import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';

// This enum is a manager for using diferent tipe of points
export enum Currency {
    collectable1 = 0,
    collectable2 = 1,
}

// This class manages the score
export default class ScoreManager extends ZepetoScriptBehaviour {

    // Singleton instance of this class
    public static Instance: ScoreManager;

    // Internal dictionary of accumulated points and we declare thats start on 0
    private pointsAmounts: { [key: string]: number } = {
        [Currency.collectable1]: 0,
        [Currency.collectable2]: 0
    }; 

    // Internal dictionary of the value each currency generate on the total score
    private scoreGenerator: { [key: string]: number } = {
        [Currency.collectable1]: 1,
        [Currency.collectable2]: 5
    }; 

    // Total score accumulated across all types of points
    public totalScore: number = 0;

    // Awake is called when the script instance is being loaded
    public Awake(): void {
        // Allocating the instance of this class to make it a "singleton"
        if (ScoreManager.Instance == null) ScoreManager.Instance = this;
        else GameObject.Destroy(this);
    }

    // This method is called when the player scores points depending on the type and amount
    public ScorePoints(pointsType: Currency, amount: number): void {
        // Add the value of the points passed by parameter to the internal total value
        if (this.pointsAmounts.hasOwnProperty(pointsType)) {
            this.pointsAmounts[pointsType] += amount;
        }
    }

    // This method resets the internal value of the accumulated points to 0 for each type
    public GetPoints(pointsType: Currency): number {
        if (this.pointsAmounts.hasOwnProperty(pointsType)) {
            return this.pointsAmounts[pointsType];
        }
        return 0;
    }

    // This method resets the internal value of the accumulated points to 0, for each type of points you have
    public ResetPoints(): void {
        for (const pointsType in this.pointsAmounts) {
            if (this.pointsAmounts.hasOwnProperty(pointsType)) {
                this.pointsAmounts[pointsType] = 0;
            }
        }
        this.totalScore = 0;
    }

    // This method calculates and returns the total score based on the accumulated points and their values
    public GetTotalScore(): number {
        for (const points in this.pointsAmounts) {
            if (this.pointsAmounts.hasOwnProperty(points)) {
                const pointAmount = this.pointsAmounts[points];
                if(this.scoreGenerator.hasOwnProperty(points)){
                    const score = this.scoreGenerator[points];
                    const scoreType = pointAmount * score;
                    this.totalScore += scoreType;
                }
            }
        }
        return this.totalScore;
    }
}