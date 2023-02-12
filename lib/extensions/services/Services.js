import { SPHttpClient } from '@microsoft/sp-http';
var QUERY = "Navigation/QuickLaunch?$expand=children";
var API_ENDPOINT = "/_api/web/";
var Services = /** @class */ (function () {
    function Services(absoluteUrl, client) {
        this.absoluteUrl = absoluteUrl;
        this.client = client;
        this._spHttpOptions = {
            getNoMetaData: {
                headers: { 'ACCEPT': 'application/json; odata.metadata=none' }
            }
        };
    }
    Services.prototype.getMenu = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var query = "" + _this.absoluteUrl + API_ENDPOINT + QUERY;
            _this.client.get(query, SPHttpClient.configurations.v1, _this._spHttpOptions.getNoMetaData).then(function (response) {
                return response.json();
            }).then(function (response) {
                resolve(response.value);
            }).catch(function (error) {
                reject(error);
            });
        });
        return promise;
    };
    return Services;
}());
export { Services };
//# sourceMappingURL=Services.js.map