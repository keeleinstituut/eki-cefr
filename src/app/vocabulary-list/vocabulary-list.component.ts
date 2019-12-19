import {NgbdSortableHeader, SortDirection, SortEvent} from '../services/sortable.directive';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {VocabularyListService} from './vocabulary-list.service';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {FeedbackModalComponent} from '../feedback-modal/feedback-modal.component';
import {environment} from './../../environments/environment';


@Component({
  selector: 'app-vocabulary-list',
  templateUrl: './vocabulary-list.component.html',
  styleUrls: ['./vocabulary-list.component.css'],
  providers: [DecimalPipe]
})
export class VocabularyListComponent implements OnInit {

  public adultLangLevel: string[];
  public childLangLevel: string[];
  public adultWordTypes: string[];
  public childWordTypes: string[];
  public langLevel: string[];
  public wordTypes: any[];
  public form;
  public tableData: object[];
  public total$: Observable<number>;
  @ViewChild(FeedbackModalComponent, {static: false})
  public modal: FeedbackModalComponent;
  public levelLongString = '';
  public wordLongString = '';
  public searchLongString = '';
  public showSpinner = false;
  public APIEndpoint = environment; // .APIEndpoint;
  public noResult = false;
  public page = 1;
  public pageSize = 20;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private listService: VocabularyListService, private formBuilder: FormBuilder, private pipe: DecimalPipe) {

    this.form = this.formBuilder.group({
      search: '',
      list: 'etLex',
      lang: new FormArray([]),
      types: new FormArray([])
    });
  }

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    if (direction === '') {
      // api request
    } else {
      //api request
    }
  }

  private addCheckboxes() {
    this.langLevel.forEach((o, i) => {
      const control = new FormControl();
      (this.form.controls.lang as FormArray).push(control);
    });
    this.wordTypes.forEach((o, i) => {
      const control = new FormControl();
      (this.form.controls.types as FormArray).push(control);
    });
  }

  ngOnInit() {
    this.listService.getCheckboxData().subscribe((data: any) => {
      this.adultLangLevel = data.items.etLex.levels;
      this.childLangLevel = data.items.noor.levels;
      this.adultWordTypes = data.items.etLex.poslist;
      this.childWordTypes = data.items.noor.poslist;
      this.getAdultData();
    });
  }

  getAdultData() {
    this.langLevel = this.adultLangLevel;
    this.wordTypes = this.adultWordTypes;
    this.form.controls.lang.controls = [];
    this.form.controls.types.controls = [];
    this.addCheckboxes();
  }

  getChildData() {
    this.form.controls.lang.controls = [];
    this.langLevel = this.childLangLevel;
    this.wordTypes = this.childWordTypes;
    this.form.controls.lang.controls = [];
    this.form.controls.types.controls = [];
    this.addCheckboxes();
  }

  sendData() {
    this.showSpinner = true;
    this.levelLongString = '';
    this.wordLongString = '';
    this.searchLongString = '';

    const langLevel = this.form.value.lang
      .map((v, i) => v ? this.langLevel[i] : null)
      .filter(v => v !== null);

    const wordList = this.form.value.types
      .map((v, i) => v ? this.wordTypes[i].pos : null)
      .filter(v => v !== null);

    for (const lang of langLevel) {
      let levelString = '';
      if (lang === langLevel[0] && this.form.value.search === '') {
        levelString = 'level=' + lang;
      } else {
        levelString = '&level=' + lang;
      }
      this.levelLongString = this.levelLongString + levelString;
    }

    for (const word of wordList) {
      let wordString = '';
      if (word === wordList[0] && this.levelLongString === '') {
        wordString = 'pos=' + word;
      } else {
        wordString = '&pos=' + word;
      }
      this.wordLongString = this.wordLongString + wordString;
    }

    if (this.form.value.search !== '') {
      this.searchLongString = '&word=' + this.form.value.search;
    }
    const offset = (this.page - 1) * this.pageSize + 1;

    this.listService.getTableData(this.searchLongString, this.form.value.list, this.pageSize, offset,
      this.levelLongString, this.wordLongString)
      .subscribe((data: any) => {
        console.log(data);
        this.tableData = data.items;
        this.total$ = data.total_count;
      }, () => {
      }, () => {
        if (this.tableData.length === 0) {
          this.noResult = true;
        } else {
          this.noResult = false;
        }
        setTimeout(() => this.showSpinner = false, 1000);
      });
  }

  sendToFile(item) {
    this.listService.sendToFile(this.searchLongString, this.form.value.list, item, this.levelLongString, this.wordLongString);
  }

  checkAll() {
    this.form.controls.types.setValue(
      this.form.controls.types.value.map(value => value = true)
    );
  }

  sendToTab(url: any) {
    console.log(url);
    window.open(url, '_blank');
  }

}
