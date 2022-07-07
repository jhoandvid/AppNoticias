import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interface/index';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent{

  @Input() articles:Article[]=[];
  constructor() { }


}
