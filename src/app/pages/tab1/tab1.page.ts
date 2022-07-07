import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsResponse } from 'src/app/interface';
import { NewsService } from 'src/app/services/news.service';
import { Article } from '../../interface/index';
import { IonInfiniteScroll } from '@ionic/angular';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  @ViewChild(IonInfiniteScroll,{static:true}) infinetyScroll: IonInfiniteScroll;

  public articles:Article[]=[];

  constructor(private newService:NewsService) {}
  ngOnInit(): void {
   this.newService.getTopHeadlinesByCategory('business')
   .subscribe(articles=>{
    this.articles=[...articles]
   });
  }

  loadData(){
     this.newService.getTopHeadlinesByCategory('business', true).subscribe(articles=>{
      if(this.articles.length===articles.length){
        this.infinetyScroll.disabled=true;
        return;

      }

      this.articles=articles;
      this.infinetyScroll.complete();
     })
  }

}
