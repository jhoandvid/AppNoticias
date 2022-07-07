import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interface/index';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article:Article
  @Input() index:number;
  constructor() { }

  openArticle(){
    window.open(this.article.url, '_black')
  }

}
