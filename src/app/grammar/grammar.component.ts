import {NgbdSortableHeader, SortDirection, SortEvent} from '../services/sortable.directive';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {Component, OnInit, Pipe, PipeTransform, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {GrammarService} from './grammar.service';
import {FeedbackModalComponent} from '../feedback-modal/feedback-modal.component';
import {Router} from '@angular/router';
import {GrammarDetailService} from '../services/grammar-detail.service';


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

@Pipe({name: 'keys', pure: false})
export class KeysPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.values(value).sort((a: any, b: any) => a.ord - b.ord);
  }
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
  selector: 'app-grammar',
  templateUrl: './grammar.component.html',
  styleUrls: ['./grammar.component.css'],
  providers: [DecimalPipe]
})
export class GrammarComponent implements OnInit {

  public adultLangLevel: string[];
  public childLangLevel: string[];
  public adultWordTypes: string[];
  public childWordTypes: string[];
  public langLevel: string[];
  public wordTypes: any[];
  public form;
  public tableData: object[];
  public categoriesList: any[];
  public childCatList = [];
  public childLists = [];
  public typeLists = [];
  public typeList = [];
  public valTypeList = [];
  public valTypeLists = [];
  public categories: any[];
  public valuesArray = [];
  public list = [];
  itemsCount: number;
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _words$ = new BehaviorSubject<any[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  public words$: Observable<object[]>;
  public total$: Observable<number>;
  @ViewChild(FeedbackModalComponent, {static: false})
  private modal: FeedbackModalComponent;

  private _state: State = {
    page: 1,
    pageSize: 20,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private listService: GrammarService, private formBuilder: FormBuilder, private pipe: DecimalPipe, private router: Router,
              private detailService: GrammarDetailService) {
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

  private langCheckboxes(item: any) {
    this.langLevel = this.childLangLevel;
    this.langLevel.forEach((o, i) => {
      const control = new FormControl(item[i]);
      (this.form.controls.lang as FormArray).push(control);
    });
  }

  ngOnInit() {
    this.listService.getCheckboxData().subscribe((data: any) => {
      this.adultLangLevel = data.items.etLex.levels;
      this.childLangLevel = data.items.noor.levels;
      this.adultWordTypes = data.items.etLex.poslist;
      this.childWordTypes = data.items.noor.poslist;
    });
    this.listService.getTypeData().subscribe((data: any) => {
      this.categoriesList = data.items.filter(item => item.parent === null);
      this.categories = data.items;

      if (localStorage.getItem('search')) {
        const value = JSON.parse(localStorage.getItem('search'));
        // this.form.controls.category.setValue(value.category);
        this.form = this.formBuilder.group({
          category: new FormArray(value.category.map((item, index) => {
            const group = this.initSection();
            this.getChildValues(item.maincategory, index);
            group.patchValue({
              maincategory: item.maincategory,
              subcategory: item.subcategory
            });
            return group;
          })),
          list: 'noor',
          lang: new FormArray([]),
          types: new FormArray([])
        });
        this.langCheckboxes(value.lang);

        this.sendData();
        localStorage.removeItem('search');
      } else {
        this.form = this.formBuilder.group({
          category: new FormArray([]),
          list: 'noor',
          lang: new FormArray([]),
          types: new FormArray([])
        });
        this.getChildData();
        this.addRow();
      }
    });
  }

  getChildValues(selected: string, index: number) {
    this.childCatList = this.categories.filter(item => item.parent === selected);
    this.childLists[index] = this.childCatList;
  }

  getTypeValues(selected: string, index: number) {
    this.typeList = this.categories.find(item => item.category === selected);
    this.typeLists[index] = this.typeList;
  }

  getTypes(selected: string, index: number, indexTwo: number) {
    this.listService.getTypeValues().subscribe((data: any) => {
      this.valTypeList = data.items.find(item => item.descriptor === selected);

      if (this.valTypeLists[index] === undefined) {
        this.list = [];
        this.list[indexTwo] = this.valTypeList;
        this.valTypeLists[index] = this.list;
      } else {
        const tempList = this.valTypeLists[index];
        tempList[indexTwo] = this.valTypeList;
        this.valTypeLists[index] = tempList;
      }
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

  initSection() {
    return this.formBuilder.group({
      maincategory: [],
      subcategory: [],
      subCategory: new FormArray([]),
    });
  }

  addRow() {
    (this.form.get('category')).push(this.formBuilder.group({
      maincategory: [],
      subcategory: [],
      subCategory: new FormArray([]),
    }));
  }

  addSubRow(index: number) {
    (this.form.get('category')).controls[index].controls.subCategory.push(this.formBuilder.group({
      descriptor: [],
      values: []
    }));
  }

  removeSubRow(k: any, i: any) {
    (this.form.get('category')).controls[i].controls.subCategory.removeAt(k);
  }

  get category() {
    return (this.form.get('category')).controls;
  }

  get subCategory() {
    return (this.form.get('category')).controls;
  }

  sendData() {
    const langLevel = this.form.value.lang
      .map((v, i) => v ? this.langLevel[i] : null)
      .filter(v => v !== null);

    for (const item of this.form.value.category) {
      let valueArray = {};
      const descriptors = [];
      for (const part of item.subCategory) {
        descriptors.push([part.descriptor, part.values]);
      }
      valueArray = {maincategory: item.maincategory, subcategory: item.subcategory, descriptors};
      this.valuesArray.push(valueArray);
    }
    this.listService.getTableData(encodeURI(JSON.stringify(this.valuesArray)), langLevel).subscribe((data: any) => {
      this.valuesArray = [];
      this.itemsCount = data.count;
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
    });
  }

  toDetail(item) {
    this.detailService.sendData(item.id);
    this.router.navigate(['/grammar-detail']);
    this.detailService.saveSearchData(this.form.value);
  }
}
