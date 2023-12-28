// Import necessary modules from the UnityEngine library
import { GameObject, Vector3, Quaternion, Random } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import BlocksMoveLeft from './BlocksMoveLeft';

// Define the SpawnBlockManager class which extends the ZepetoScriptBehaviour class
export default class SpawnBlockManager extends ZepetoScriptBehaviour {

    // Singleton instance of this class
    public static Instance: SpawnBlockManager;

    // Array to store different blocks (obstacle types) to instantiate randomly
    public blocks: GameObject[];

    // Array to store generated blocks in the game
    public generatedBlocks: GameObject[] = [];

    // Position where new blocks will be spawned
    private spawnBlockPosition: Vector3 = new Vector3(20, 0, 0);

    // Position to trigger the new block
    private respawnBlockPositionX: number = 0;

    // X limit where the block is destroyed
    private xLeftBoundDestroy: number = -20;

    // All blocks speed
    public allBlocksSpeed: number = 3;

    // Variable to keep track of the most recently generated block
    private blockGenerated: GameObject;

    // Indicator to know if a block has already been spawned
    private blockSpawned: boolean = false;

    // Variable initialized with a value of 0
    private blockRespawnPosition: number = 0;

    // Awake is called when the script instance is being loaded
    public Awake(): void {
        // Allocating the instance of this class to make it a "singleton"
        if (SpawnBlockManager.Instance == null) SpawnBlockManager.Instance = this;
        else GameObject.Destroy(this);
    }

    // Method to start the block manager
    StartSpawnBlockManager() {
        this.GenerateRandomBlock();
    }

    // Update is called once per frame
    Update() {
        this.CheckBlockPosition();
    }

    // Method to resume the block manager
    ResumeSpawnBlockManager() {
        if(this.generatedBlocks != null){
            if (this.generatedBlocks.length != 0) {
                // Iterate through generated blocks
                for (const block of this.generatedBlocks) {
                    // Check if the block is not null
                    if (block != null) {
                        // SetMoving(true) on the BlocksMoveLeft component of the block
                        block.GetComponent<BlocksMoveLeft>().SetMoving(true);
                    }
                }
            }
            else
                // If there are no generated blocks, generate a random block
                this.GenerateRandomBlock();
        }
    }

    // Method to check the position of the block
    CheckBlockPosition() {
        // Check if blockGenerated is not null (exists).
        if (this.blockGenerated && this.blockGenerated != null) {
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

    // Method to generate a random block
    GenerateRandomBlock() {
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

        // Call function to destroy the blocks that are beyond a point.
        this.DestroyBlock();
    }

    // Method to stop the block manager
    StopSpawnBlockManager() {
        for (const block of this.generatedBlocks) {
            if (block != null) {
                block.GetComponent<BlocksMoveLeft>().SetMoving(false);
            }
        }
    }

    // Method to set the speed of the blocks
    SetBlockSpeed(value: number) {
        this.allBlocksSpeed = value;
    }

    // Method to destroy blocks
    DestroyBlock() {
        let blocksToDestroy: GameObject[] = []; 
        // Check if the block is not null
        for (const block of this.generatedBlocks) {
            // Check if the block is not null
            if (block != null) {
                // Check if the block's x-position is less than or equal to the specified bound
                if (block.transform.position.x <= this.xLeftBoundDestroy) {
                    // Mark the block for destruction by adding it to the blocksToDestroy list
                    blocksToDestroy.push(block);
                }
            }
        }
        // Destroy the blocks marked for destruction
        for (const block of blocksToDestroy) {
            block.GetComponent<BlocksMoveLeft>().DestroyBlock();
        }
        // Filter out null references in generatedBlocks
        this.generatedBlocks = this.generatedBlocks.filter(block => block != null);
    }

    // Method to destroy all blocks
    DestroyAllBlocks(){
        // Stop the spawn manager
        this.StopSpawnBlockManager();
        // Iterate through generated blocks
        for (const block of this.generatedBlocks) {
            // Check if the block is not null
            if (block != null) {
                // Destroy the block
                GameObject.Destroy(block);
            }
        }
    }
}

