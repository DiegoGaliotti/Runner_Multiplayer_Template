import { Void } from 'System';
import { servicesVersion } from 'typescript';
import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import GameRunnerManager from './GameRunnerManager';

export default class HealthManager extends ZepetoScriptBehaviour {

    public static Instance: HealthManager; //This class instanceate
    public maxHealth: number; //Max and start health
    public currentHealth: number; //Current health, it will change in the game by increasing or decresing
    

    //Awake is called when the script instance is being loaded
    Awake(): void {
        //This is hoe the instance of this class is allocated. Wich makes it a singleton
        if (HealthManager.Instance == null) HealthManager.Instance = this;
        else GameObject.Destroy(this);
        //The current Health is iqual to the max Health
        this.ResetHealth();
    }

    //This method will take health to the character, depending on the amount of damage the obstacle generate
    public generateDamage(amount: number): void{
        this.currentHealth -= amount;
        if(this.currentHealth <= 0){
            GameRunnerManager.Instance.OnGameOver();
        }
    }

    //This method will increase the health of the character depending on de amount of life the item give to the player
    public generateHealth(amount: number): void {
        if (this.currentHealth < this.maxHealth) {
            if ((this.maxHealth - this.currentHealth) < amount) {
                this.currentHealth = this.maxHealth;
            }
            else {
                this.currentHealth += amount;
            }
        }
    }

    // This method returns the internal value of the player health
    public getCurrentHealth(): number {
        return this.currentHealth;
    }

    // This method reset the heath of the character 
    public ResetHealth(): void {
        this.currentHealth = this.maxHealth;
    }


}