import { GameObject, Time } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameRunnerManager from './GameRunnerManager';

// This class manages the game timer
export default class TimerManager extends ZepetoScriptBehaviour {

    // Singleton instance of this class
    public static Instance: TimerManager;

    // Timestamp when the timer starts
    private startTime: number;

    // Current time elapsed since the timer started
    private currentTime: number;

    // Duration of the game timer in seconds
    public gameSecondsTime: number = 10;

    // Awake is called when the script instance is being loaded
    public Awake(): void {
        // Allocating the instance of this class to make it a "singleton"
        if (TimerManager.Instance == null) TimerManager.Instance = this;
        else GameObject.Destroy(this);
    }

    // Update is called every frame
    Update(){
        // Check if the current time has exceeded the specified game duration
        if (this. currentTime >= this.gameSecondsTime){
            // Trigger game over when time exceeds the limit
            GameRunnerManager.Instance.OnRunnerGameOver();
        }
    }

    // This methods resets the current time value
    public StartTimer(): void {
        // Set the start time to the current time when the timer starts
        this.startTime = Time.time;
    }

    // This method resets the current time to zero
    public ResetTimer(): void {
        this.currentTime = 0;
    }

    // This method returns the value of the time elapsed between the start time and this moment in seconds
    public GetTime(): number {
        // Calculate and update the current time elapsed since the timer started
        this.currentTime = Time.time - this.startTime;
        return this.currentTime;
    }

    // This method returns the formatted string representation of the elapsed time
    public GetTimeFormated(): string {
        // Get the time in seconds
        let time = this.GetTime() as number;
        // Calculate minutes and seconds
        let minutes = Math.floor(time/59).toString() as string;
        let seconds = ((time % 59)).toFixed(0).padStart(2, '0') as string;
        // Return the formatted time as a string
        return minutes + ":" + seconds;
    }
}