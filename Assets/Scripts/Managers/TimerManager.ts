import { GameObject, SerializeField, Time } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameRunnerManager from './GameRunnerManager';

export default class TimerManager extends ZepetoScriptBehaviour {

    public static Instance: TimerManager;

    private startTime: number;
    private currentTime: number;
    public gameSecondsTime: number = 10;

    public Awake(): void {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (TimerManager.Instance == null) TimerManager.Instance = this;
        else GameObject.Destroy(this);
    }

    Update(){
        if (this. currentTime >= this.gameSecondsTime){
            GameRunnerManager.Instance.OnGameOver();
        }
    }

    // This methods resets the current time value
    public StartTimer(): void {
        this.startTime = Time.time;
        //this.gameSecondsTime = this.gameSecondsTime*60
    }

    //This method stakes a timestamp and saves it in its respective variable
    public ResetTimer(): void {
        this.currentTime = 0;
    }

    // This method returns the value of the time elapsed between the timestamp and this moment un miliseconds
    public GetTime(): number {
        this.currentTime = Time.time - this.startTime;
        return this.currentTime;
    }

    // This method returns the same as GetTime but with format
    public GetTimeFormated(): string {
        let time = this.GetTime() as number;
        let minutes = Math.floor(time/59).toString() as string;
        let seconds = ((time % 59)).toFixed(0).padStart(2, '0') as string;

        return minutes + ":" + seconds;
    }
}