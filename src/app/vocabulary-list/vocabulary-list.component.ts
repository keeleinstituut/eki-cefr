import {NgbdSortableHeader, SortDirection, SortEvent} from '../services/sortable.directive';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {VocabularyListService} from './vocabulary-list.service';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {FeedbackModalComponent} from '../feedback-modal/feedback-modal.component';
import {environment} from './../../environments/environment';

interface SearchResult {
  words: any[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(countries: any[], column: string, direction: string): any[] {
  if (direction === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

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
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _words$ = new BehaviorSubject<any[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  public words$: Observable<object[]>;
  public total$: Observable<number>;
  @ViewChild(FeedbackModalComponent, {static: false})
  public modal: FeedbackModalComponent;
  public levelLongString = '';
  public wordLongString = '';
  public searchLongString = '';
  public showSpinner = false;
  public APIEndpoint = environment; // .APIEndpoint;
  public noResult = false;

  private _state: State = {
    page: 1,
    pageSize: 20,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private listService: VocabularyListService, private formBuilder: FormBuilder, private pipe: DecimalPipe) {

    this.form = this.formBuilder.group({
      search: '',
      list: 'etLex',
      lang: new FormArray([]),
      types: new FormArray([])
    });
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get page() {
    return this._state.page;
  }

  get pageSize() {
    return this._state.pageSize;
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({page});
  }

  set pageSize(pageSize: number) {
    this._set({pageSize});
  }

  set searchTerm(searchTerm: string) {
    this._set({searchTerm});
  }

  set sortColumn(sortColumn: string) {
    this._set({sortColumn});
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({sortDirection});
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }


  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page} = this._state;

    // 1. sort
    let words = sort(this.tableData, sortColumn, sortDirection);

    const total = words.length;

    // 3. paginate
    words = words.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({words, total});
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.sortColumn = column;
    this.sortDirection = direction;
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
      this.searchLongString = 'word=' + this.form.value.search;
    }

    this.listService.getTableData(this.searchLongString, this.form.value.list, this.levelLongString, this.wordLongString)
      .subscribe((data: any) => {
        console.log(data);
        this.tableData = data.items;
        this._search$.pipe(
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search()),
          delay(200),
          tap(() => this._loading$.next(false))
        ).subscribe(result => {
          this._words$.next(result.words);
          this._total$.next(result.total);
        });

        this._search$.next();
        this.words$ = this._words$.asObservable();
        this.total$ = this._total$.asObservable();
      }, () => {
      }, () => {
        if (this.tableData.length === 0) {
          console.log('here');
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
