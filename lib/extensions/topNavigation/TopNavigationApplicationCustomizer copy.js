var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Log } from '@microsoft/sp-core-library';
import { BaseApplicationCustomizer, PlaceholderName } from '@microsoft/sp-application-base';
import { Services } from '../services';
import * as strings from 'TopNavigationApplicationCustomizerStrings';
var LOG_SOURCE = 'TopNavigationApplicationCustomizer';
/** A Custom Action which can be run during execution of a Client Side Application */
var TopNavigationApplicationCustomizer = /** @class */ (function (_super) {
    __extends(TopNavigationApplicationCustomizer, _super);
    function TopNavigationApplicationCustomizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TopNavigationApplicationCustomizer.prototype.onInit = function () {
        var _this = this;
        Log.info(LOG_SOURCE, "Initialized " + strings.Title);
        //this._renderPlaceholder();
        this.services = new Services(this.context.pageContext.web.absoluteUrl, this.context.spHttpClient);
        this.services.getMenu().then(function (menu) {
            console.log(menu);
            _this._renderPlaceholder(menu);
        });
        return Promise.resolve();
    };
    TopNavigationApplicationCustomizer.prototype._onDispose = function () { };
    TopNavigationApplicationCustomizer.prototype._renderPlaceholder = function (mItems) {
        if (!this._topPlaceholder) {
            this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, { onDispose: this._onDispose });
        }
        if (!this._topPlaceholder) {
            console.log('Placeholder top wasn\'t found');
            return;
        }
        var topMenuUl = '<ul>';
        var topMenuLis = '';
        mItems.map(function (item, key) {
            topMenuLis += "<li id='" + key + "'><a href='" + item.Url + "'> " + item.Title + " </a></li>";
        });
        var completedNav = topMenuUl + topMenuLis + '</ul>';
        if (this._topPlaceholder.domElement) {
            this._topPlaceholder.domElement.innerHTML = completedNav;
        }
    };
    return TopNavigationApplicationCustomizer;
}(BaseApplicationCustomizer));
export default TopNavigationApplicationCustomizer;
//# sourceMappingURL=TopNavigationApplicationCustomizer copy.js.map