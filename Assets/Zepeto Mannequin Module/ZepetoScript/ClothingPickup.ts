import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Image, RawImage } from "UnityEngine.UI"
import { ShopService } from 'ZEPETO.Module.Shop';
import {Collider, WaitUntil } from 'UnityEngine';
import {ZepetoPlayer, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import {ItemContent, Mannequin, MannequinPreviewer } from 'ZEPETO.Mannequin';
import { ZepetoContext, ZepetoPropertyFlag } from 'Zepeto';

export default class ClothingPickup extends ZepetoScriptBehaviour {
    public image : RawImage;
    public itemCode : string;
    public itemType: ZepetoPropertyFlag;

    private _previewer: MannequinPreviewer;
    private itemContent : ItemContent;
    Start() {
        this.StartCoroutine(this.DownloadItemTexture());
        this.itemContent = new ItemContent();
        this.itemContent.id = this.itemCode;
        this.itemContent.property = this.itemType;
        
    }
    
    public OnTriggerEnter(other: Collider)
    {
        if (other.gameObject.tag == "Player")
        {
            //The Player objects name should be the userID. (Set From ZEPETOPlayersManager)
            this.EquipItem(other.gameObject.name);
        }
    }

    /*public OnTriggerExit(other: Collider)
    {
        if (other.gameObject.tag == "Player")
        {
            //Reset Back to the original items from the previewer
            this.Reset();
        }
    }*/

    *DownloadItemTexture()
    {
        // Download thumbnail texture for the specified item code
        var request = ShopService.DownloadItemThumbnail(this.itemCode);

        yield new WaitUntil(()=>request.keepWaiting == false);

        if(request.responseData.isSuccess)
        {
            this.image.texture = request.responseData.texture;
        }
    }
    
    EquipItem(userID: string)
    {
        console.log("Equipping: " + userID);
        let player: ZepetoPlayer = ZepetoPlayers.instance.GetPlayer(userID);
        let context : ZepetoContext = player.character.Context;

        
        this._previewer = new MannequinPreviewer( context, [this.itemContent]);
        console.log(" ITEM CONTENT " + this.itemContent + " ITEM CODE " + this.itemCode );
        this._previewer.PreviewContents();
    }
    
    Reset()
    {
        this._previewer.ResetContents();
    }

}