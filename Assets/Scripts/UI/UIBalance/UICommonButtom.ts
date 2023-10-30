import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Button, Text } from 'UnityEngine.UI'
import {GameObject} from 'UnityEngine'
import { ZepetoWorldMultiplay } from "ZEPETO.World";
import { Room, RoomData } from "ZEPETO.Multiplay";
import UIBallances, { Currency } from "./UIBalances";



export default class UICommonBtn extends ZepetoScriptBehaviour {
    @SerializeField() private gainBalanceBtn: Button;

    private _multiplay: ZepetoWorldMultiplay;
    private _room: Room;

    private Start() {
        this._multiplay = GameObject.FindObjectOfType<ZepetoWorldMultiplay>();
        this.gainBalanceBtn.onClick.AddListener(() => this.OnClickGainBalance(Currency.energy, 1));

        this._multiplay.RoomJoined += (room: Room) => {
            this._room = room;
        }
    }

    private OnClickGainBalance(currencyId: string, quantity: number) {
        const data = new RoomData();
        data.Add("currencyId", currencyId);
        data.Add("quantity", quantity);
        this._multiplay.Room?.Send("onCredit", data.GetObject());
    }
}
