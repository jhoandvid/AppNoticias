import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interface/index';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  
  @Input() article:Article
  @Input() index:number;
  constructor(private iab:InAppBrowser,
              private plaform:Platform
              ) { }

  openArticle(){

    if(this.plaform.is('ios') || this.plaform.is('android')){
      const browser = this.iab.create(this.article.url);
      browser.show();
      return;
    }

       window.open(this.article.url, '_black')
  }

}
