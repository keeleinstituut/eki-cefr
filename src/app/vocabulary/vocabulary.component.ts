import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {VocabularyService} from './vocabulary.service';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.css'],
  providers: [DecimalPipe]
})
export class VocabularyComponent implements OnInit {

  public searchWord: string;
  public list: string;
  public wordList: object[];

  constructor( private vocService: VocabularyService) {
  }

  onSort({column, direction}) {
  }

  ngOnInit() {
  }

  getData() {
    this.vocService.getSearchData(this.searchWord).subscribe((data: any) => {
      this.wordList = data.items;
    });
  }

}
