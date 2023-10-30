import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Text } from 'UnityEngine.UI'
import { Object, WaitUntil } from 'UnityEngine'
import { CurrencyService } from "ZEPETO.Currency";
import { ZepetoWorldMultiplay } from "ZEPETO.World";
import { Room } from "ZEPETO.Multiplay";

export default class UIBalances extends ZepetoScriptBehaviour {
    /*
    @SerializeField() private possessionStarTxt: Text;
    @SerializeField() private possessionEnergyTxt: Text;
    @SerializeField() private possessionZemTxt: Text;

    private _multiplay: ZepetoWorldMultiplay;
    private _room: Room;

    private Start() {
        this.RefreshBalances();
        this._multiplay = Object.FindObjectOfType<ZepetoWorldMultiplay>();

        this._multiplay.RoomJoined += (room: Room) => {
            this._room = room;
            this.InitMessageHandler();
        }
    }

    private InitMessageHandler() {
        this._room.AddMessageHandler<BalanceSync>("SyncBalances", (message) => {
            this.RefreshBalances();
        });
    }

    private RefreshBalances() {
        this.StartCoroutine(this.RefreshBalanceUI());
        this.StartCoroutine(this.RefreshOfficialCurrencyUI());
    }

    private *RefreshBalanceUI() {
        const request = CurrencyService.GetUserCurrencyBalancesAsync();
        yield new WaitUntil(() => request.keepWaiting == false);
        if (request.responseData.isSuccess) {
            this.possessionStarTxt.text = request.responseData.currencies?.ContainsKey(Currency.star) ? request.responseData.currencies?.get_Item(Currency.star).toString() : "0";
            this.possessionEnergyTxt.text = request.responseData.currencies?.ContainsKey(Currency.energy) ? request.responseData.currencies?.get_Item(Currency.energy).toString() : "0";
        }
    }

    private *RefreshOfficialCurrencyUI() {
        const request = CurrencyService.GetOfficialCurrencyBalanceAsync();
        yield new WaitUntil(() => request.keepWaiting == false);
        this.possessionZemTxt.text = request.responseData.currency.quantity.toString();
    }
    */
}

export interface BalanceSync {
    currencyId: string,
    quantity: number,
}

export enum Currency {
    star = "star",
    energy = "energy",
}
