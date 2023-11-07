import { GameObject, KeyCode } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';

export enum Currency {
    star = 0,
    cherry = 1,
} // This enum is a manager for using diferent tipe of points

// This class manages the score
export default class ScoreManager extends ZepetoScriptBehaviour {

    public static Instance: ScoreManager; // This class instanceate
    private pointsAmounts: { [key: string]: number } = {
        [Currency.star]: 0,
        [Currency.cherry]: 0
    }; // Internal dictionary of accumulated points and we declare thats start on 0

    private scoreGenerator: { [key: string]: number } = {
        [Currency.star]: 1,
        [Currency.cherry]: 5
    }; // Internal dictionary of the value each currency generate on the total score

    public totalScore: number = 0;

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
        this.totalScore = 0;
    }

    public EndGameScore(): number {
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