import { Background } from 'UnityEngine.UIElements';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Debug, GameObject, Vector3, Time, BoxCollider, SpriteRenderer } from 'UnityEngine';

export default class BackgroundManager extends ZepetoScriptBehaviour {

    public static Instance: BackgroundManager;

    public backgroundSpeed: number = 1;
    private backGroundWidth: number;
    private startPos: Vector3 = new Vector3(10, 0, 0);
    public isMoving: bool = false;
    //public backgroundManager: GameObject;
    //private backgroundSprite: SpriteRenderer;

    public Awake(): void {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (BackgroundManager.Instance == null) BackgroundManager.Instance = this;
        else GameObject.Destroy(this);
    }

    public StartBackGroundManager() { 
        this.SetMoving(true);
        this.MoveBackGroundLeft();
        this.backGroundWidth = this.GetComponent<BoxCollider>().size.x / 2;
        this.startPos = this.transform.position;
    }

    Update() {
        if (this.SetMoving)
        {
            this.RepeatBackGround();
            this.MoveBackGroundLeft();
        }
    }

    public PauseBackgroundManager()
    {
        this.SetMoving(false);
    }

    public ResumeBackgroundManager()
    {
        this.SetMoving(true);
    }

    public MoveBackGroundLeft()
    {
        if (this.isMoving) {
            this.transform.position += Vector3.left * this.backgroundSpeed * Time.deltaTime;
        }
    }

    public RepeatBackGround() {
        if (this.transform.position.x < this.startPos.x - this.backGroundWidth) {
            this.transform.position = this.startPos;
        }
    }

    public SetMoving(value: bool): void
    {
        this.isMoving = value;
    }
}

