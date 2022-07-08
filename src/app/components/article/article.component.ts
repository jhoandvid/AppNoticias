import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interface/index';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';

import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';
import { ChildActivationStart } from '@angular/router';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  
  @Input() article:Article
  @Input() index:number;
  constructor(private iab:InAppBrowser,
              private plaform:Platform,
              private actionSheetCtrl:ActionSheetController,
              private socialSharing:SocialSharing,
              private storeService:StorageService,
              
              ) { }

  openArticle(){

    if(this.plaform.is('ios') || this.plaform.is('android')){
      const browser = this.iab.create(this.article.url);
      browser.show();
      return;
    }

       window.open(this.article.url, '_black')
  }


 async onOpenMenu(){


  const articleInFavorite=this.storeService.articleInFavorites(this.article);



  const normalBtns:ActionSheetButton[]=[
    {
      text: articleInFavorite?'Remover Favorito':'Favorito',
      icon: articleInFavorite?'heart':'heart-outline',
      handler:()=>this.onToggleFavorite()
    },

    {
      text:'Cancelar',
      icon:'close-outline',
      role:'cancel',
      cssClass:'secondary'
    }
  ]


  const shareBtn:ActionSheetButton={
    text:'Compartir',
    icon:'share-outline',
    handler:()=>this.onShareArticle()
  }


  if(this.plaform.is('capacitor')){
      normalBtns.unshift(shareBtn);
  }

  const actionSheet=await this.actionSheetCtrl.create({
    header:'Optiones',
    buttons:normalBtns

    
  })

 

  

    await actionSheet.present();

  }

  onShareArticle(){
    const {title,source,url }=this.article;
    this.socialSharing.share(
     title,
     source.name,
      null,
      url
    );
  }

  onToggleFavorite(){
   this.storeService.saveRemoveArticle(this.article);
  }

}
