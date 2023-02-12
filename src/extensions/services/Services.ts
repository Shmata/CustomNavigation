import { SPHttpClient,
    SPHttpClientResponse,
    ISPHttpClientOptions
} from '@microsoft/sp-http';

import { IMenu } from '../models/IMenu';

const QUERY :string = `Navigation/QuickLaunch?$expand=children`;
const API_ENDPOINT :string = `/_api/web/`;
export class Services {

    private _spHttpOptions: any = {
        getNoMetaData: <ISPHttpClientOptions>{
            headers:{ 'ACCEPT': 'application/json; odata.metadata=none'}
        }
    };

    constructor(private absoluteUrl: string, private client: SPHttpClient){}
    
    public getMenu(): Promise<IMenu[]>{
        let promise: Promise<IMenu[]> = new Promise<IMenu[]>((resolve, reject) =>{
            let query = `${this.absoluteUrl}${API_ENDPOINT}${QUERY}`;
            this.client.get( 
                query, 
                SPHttpClient.configurations.v1,
                this._spHttpOptions.getNoMetaData
            ).then((response: SPHttpClientResponse): Promise<{value: IMenu[] }>  =>{
                return response.json();
            }).then((response: {value: IMenu[] } )=>{
                resolve(response.value);
            }).catch((error:any)=>{
                reject(error);
            })
        });

        return promise;
    }
}