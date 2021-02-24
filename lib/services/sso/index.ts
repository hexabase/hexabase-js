import { HxbSessionStorage } from "../..";
import { WorkspaceResp } from "../../models/workspaces";
import Workspaces from "../../workspaces/workspaces";

export class ServerSent {
    appEvents: any = {};
    es?: EventSource;

    public async connectByWsAndUser(key: string = '') : Promise<EventSource> 
    {
        var url = '';
        if(key == '')
        {
            var jwt = HxbSessionStorage.ParseJWT();
            var ws = new Workspaces();
            var respws = await ws.getWorkspacesAsync().ResultAsync<WorkspaceResp>();
            
            // TODO make the address from config
            // - JP 2021/2/24
            url = `https://az.hexabase.com/sse?channel=user_${jwt.sub}_${respws.current_workspace_id}`
        }

        this.es = new EventSource(url);
        return this.es!;
    }

    public addEventListener(eventName: string, callback: any) {
        if(!this.appEvents.hasOwnProperty(eventName))
        {
            this.appEvents[eventName] = this.es!.addEventListener(eventName, (e: any) =>
            {
                var parsedData = JSON.parse(e.data);
                callback(parsedData);
            });
        }
    }
}