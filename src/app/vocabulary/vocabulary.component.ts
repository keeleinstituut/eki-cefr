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
  public list = 'etLex';
  public wordList: object[];

  constructor( private vocService: VocabularyService) {
  }

  onSort({column, direction}) {
  }

  ngOnInit() {
  }

  getData() {
    if ( this.searchWord !== '') {
      this.vocService.getSearchData(this.searchWord, this.list).subscribe((data: any) => {
        this.wordList = data.items;
        console.log(this.wordList);
      });
    } else {
      this.wordList = [];
    }
  }
}
