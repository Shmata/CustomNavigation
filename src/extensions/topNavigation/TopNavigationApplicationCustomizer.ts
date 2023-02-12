import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderName,
  PlaceholderContent
} from '@microsoft/sp-application-base';

import { Services } from '../services';
import { IMenu } from '../models';

import * as strings from 'TopNavigationApplicationCustomizerStrings';
import styles from './TopNavigationApplicationCustomizer.module.scss';

const LOG_SOURCE: string = 'TopNavigationApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ITopNavigationApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class TopNavigationApplicationCustomizer
  extends BaseApplicationCustomizer<ITopNavigationApplicationCustomizerProperties> {

  private _topPlaceholder : PlaceholderContent | undefined ;   
  private services: Services;


  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    //this._renderPlaceholder();
    
    this.services = new Services(
      this.context.pageContext.web.absoluteUrl,
      this.context.spHttpClient
    );
    this.services.getMenu().then((menu: IMenu[])=>{
      console.log(menu)
      this._renderPlaceholder(menu)
    })

    

    return Promise.resolve();
  }

  private _onDispose():void {}

  private _renderPlaceholder(mItems: IMenu[]):void{
    if(!this._topPlaceholder){
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top, 
        {onDispose: this._onDispose}
      );
    }

    if(!this._topPlaceholder){
      console.log('Placeholder top wasn\'t found');
      return ;
    }

    let topMenuUl:string = `<ul class='${styles.app}'>`;
    let topMenuLis:string = '';
    mItems.map((item, key)=>{
      topMenuLis +=`<li id='${key}'><a href='${item.Url}'> ${item.Title} </a></li>` 
    });

    let completedNav = topMenuUl + topMenuLis + '</ul>';

    if(this._topPlaceholder.domElement){
      this._topPlaceholder.domElement.innerHTML = completedNav;
    }
  }
  
}
