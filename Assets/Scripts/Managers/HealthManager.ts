import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import GameRunnerManager from './GameRunnerManager';

// This class manages the health of the player character
export default class HealthManager extends ZepetoScriptBehaviour {

    // Singleton instance of this class
    public static Instance: HealthManager; 
    // Maximum and starting health
    public maxHealth: number;
    // Current health, changes during the game by increasing or decreasing
    public currentHealth: number; 
    

    // Awake is called when the script instance is being loaded
    Awake(): void {
        // Allocating the instance of this class to make it a "singleton"
        if (HealthManager.Instance == null) HealthManager.Instance = this;
        else GameObject.Destroy(this);

        //The current Health is iqual to the max Health
        this.ResetHealth();
    }

    // This method deducts health from the character based on the amount of damage the obstacle generates
    public GenerateDamage(amount: number): void{
        // Decrease the current health by the specified amount
        this.currentHealth -= amount;

        // Check if the current health is zero or below
        if(this.currentHealth <= 0){
            // Trigger game over when health reaches zero or below
            GameRunnerManager.Instance.OnRunnerGameOver();
        }
    }
    // This method increases the health of the character depending on the amount of life the item gives to the player
    public GenerateHealth(amount: number): void {
        // Check if the current health is less than the maximum health
        if (this.currentHealth < this.maxHealth) {
            // Check if the amount to be added would exceed the maximum health
            if ((this.maxHealth - this.currentHealth) < amount) {
                // Set the current health to the maximum health if the addition exceeds the limit
                this.currentHealth = this.maxHealth;
            }
            else {
                // Otherwise, increase the current health by the specified amount
                this.currentHealth += amount;
            }
        }
    }

    // This method returns the current value of the player's health
    public GetCurrentHealth(): number {
        return this.currentHealth;
    }

    // This method resets the health of the character to the maximum health
    public ResetHealth(): void {
        this.currentHealth = this.maxHealth;
    }
}