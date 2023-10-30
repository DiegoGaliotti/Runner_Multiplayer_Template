import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { ZepetoWorldHelper, Users } from 'ZEPETO.World';

export default class UserInfo extends ZepetoScriptBehaviour {

    Start() {
        let ids: string[] = ["64cbc17a8d897e2881fa4a73"];
        ZepetoWorldHelper.GetUserInfo(ids, (info: Users[]) => {
            for (let i = 0; i < info.length; i++) {
                console.log(`userId : ${info[i].userOid}, name : ${info[i].name}, zepetoId : ${info[i].zepetoId}`);
            }
        }, (error) => {
            console.log(error);
        });
    }
}