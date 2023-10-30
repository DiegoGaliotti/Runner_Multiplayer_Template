// Import necessary modules from the UnityEngine library
import { GameObject, Vector3, Quaternion, Random } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import BlocksMoveLeft from './BlocksMoveLeft';

// Define the ObstacleSpawnManager class which extends the ZepetoScriptBehaviour class
export default class SpawnBlockManager extends ZepetoScriptBehaviour {

    public static Instance: SpawnBlockManager;
    // Array to store different blocks (obstacle types) to instantiate randomly

    public blocks: GameObject[];
    //Array to store generated blocks in the game.

    public generatedBlocks: GameObject[] = [];

    // Define the position where new blocks will be spawned
    public spawnBlockPosition: Vector3 = new Vector3(20, 0, 0);

    //Define the position to trigger de new block.
    private respawnBlockPositionX: number = 0;

    //The x limit where the block is destroy.
    public xLeftBoundDestroy: number = -20;

    //All blocks Speed.
    public allBlocksSpeed: number = 1;

    // A variable to keep track of the most recently generated block.
    private blockGenerated: GameObject;

    // Indicator to know if a block has already been spawned
    private blockSpawned: boolean = false;

    private blockRespawnPosition: number = 0

    public Awake(): void {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // https://en.wikipedia.org/wiki/Singleton_pattern
        if (SpawnBlockManager.Instance == null) SpawnBlockManager.Instance = this;
        else GameObject.Destroy(this);
    }

    StartSpawnBlockManager() {
        this.GenerateRandomBlock();
    }


    // This function is called once per frame
    Update() {
        this.CheckBlockPosition();
    }



    ResumeSpawnBlockManager() {
        if (this.generatedBlocks.length != 0) {
            for (const block of this.generatedBlocks) {
                if (block != null) {
                    block.GetComponent<BlocksMoveLeft>().SetMoving(true);
                }
            }
        }
        else
            this.GenerateRandomBlock();

    }


    CheckBlockPosition() {

        // Check if blockGenerated is not null (exists).
        if (this.blockGenerated) {

            // If the block's x-position is less than or equal to 0 and we haven't spawned a block yet.
            if (this.blockGenerated.transform.position.x <= this.respawnBlockPositionX && !this.blockSpawned) {
                // Generate a new random block.
                this.GenerateRandomBlock();


                // Indicate that we have spawned a block.
                this.blockSpawned = true;
            }

            // If the block's x-position is greater than 0 (moved back for some reason).

            else if (this.blockGenerated.transform.position.x > this.respawnBlockPositionX) {

                // Reset the block spawn indicator.
                this.blockSpawned = false;
            }
        }

    }

    GenerateRandomBlock() {
        // Function to generate a random block from the blocks array.

        // Get a random number between 0 and the length of the blocks array.
        let n = Math.floor(Random.Range(0, this.blocks.length)) as number;

        // Instantiate a random block from the blocks array at the specified spawn position.
        const newBlock = GameObject.Instantiate(
            this.blocks[n],
            this.spawnBlockPosition,
            Quaternion.identity, // No rotation applied
            this.transform) as GameObject;

        // Assign the newly spawned block to our blockGenerated variable.
        this.blockGenerated = newBlock;

        // Add the block to the generatedBlocks list.
        this.generatedBlocks.push(this.blockGenerated);

        // Set the speed of the newly spawned block
        this.blockGenerated.GetComponent<BlocksMoveLeft>().SetBlockSpeed(this.allBlocksSpeed);

        //Call function to destroy the blocks that are beyond a point.
        this.DestroyBlock();
    }


    StopSpawnBlockManager() {
        for (const block of this.generatedBlocks) {
            if (block != null) {
                block.GetComponent<BlocksMoveLeft>().SetMoving(false);
            }
        }
    }

    SetBlockSpeed(value: number) {

        this.allBlocksSpeed = value;
    }

    DestroyBlock() {

        let blocksToDestroy: GameObject[] = []; // Lista temporal de bloques a destruir

        for (const block of this.generatedBlocks) {
            if (block != null) {
                if (block.transform.position.x <= this.xLeftBoundDestroy) {
                    blocksToDestroy.push(block); // Marca el bloque para destruirlo añadiéndolo a la lista
                }
            }
        }

        // Destruye los bloques marcados.

        for (const block of blocksToDestroy) {
            block.GetComponent<BlocksMoveLeft>().DestroyBlock();
        }

        // Filtra las referencias nulas en generatedBlocks.
        this.generatedBlocks = this.generatedBlocks.filter(block => block != null);
    }

}

