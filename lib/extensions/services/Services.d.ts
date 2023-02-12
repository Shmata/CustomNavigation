import { SPHttpClient } from '@microsoft/sp-http';
import { IMenu } from '../models/IMenu';
export declare class Services {
    private absoluteUrl;
    private client;
    private _spHttpOptions;
    constructor(absoluteUrl: string, client: SPHttpClient);
    getMenu(): Promise<IMenu[]>;
}
//# sourceMappingURL=Services.d.ts.map