import { NgbdSortableHeader, SortEvent } from '../services/sortable.directive';
import { DecimalPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { VocabularyListService } from './vocabulary-list.service';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import { environment } from './../../environments/environment';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

export interface TableItem {
  url: string;
  lemma_text: string;
  pos_text: string;
  level: string;
}

@Component({
    selector: 'app-vocabulary-list',
    templateUrl: './vocabulary-list.component.html',
    styleUrls: ['./vocabulary-list.component.css'],
    providers: [DecimalPipe],
    standalone: false
})

export class VocabularyListComponent implements OnInit, OnDestroy {
  public themesList: string[];
  public adultLangLevel: string[];
  public childLangLevel: string[];
  public adultWordTypes: string[];
  public childWordTypes: string[];
  public langLevel: string[];
  public wordTypes: any[];
  public form;
  public tableData: TableItem[];
  public total$: number;
  @ViewChild(FeedbackModalComponent)
  public modal: FeedbackModalComponent;
  public levelLongString = '';
  public wordLongString = '';
  public searchLongString = '';
  public showSpinner = false;
  public themeLongString = '';
  public APIEndpoint = environment.production && environment.APIEndpoint ? environment.APIEndpoint : environment;
  public noResult = false;
  public page = 0;
  public showTable = true;
  public pageSize = 20;
  public column = '';
  public direction = '';
  public routeHandler: any;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;


  constructor(private listService: VocabularyListService, private formBuilder: UntypedFormBuilder,
              private pipe: DecimalPipe, private router: Router, private activatedRoute: ActivatedRoute) {
    this.form = this.formBuilder.group({
      search: '',
      list: 'etLex',
      theme: '',
      lang: new UntypedFormArray([]),
      types: new UntypedFormArray([])
    });

    this.routeHandler = router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.page = +this.activatedRoute.snapshot.queryParamMap.get('page');

        if (this.page > 0) {
          this.showTable = true;
          this.sendData(this.page);
        } else {
          this.showTable = false;
        }
      }
    });
  }

  onSort({ column, direction }: SortEvent) {
    this.column = '&sort=' + column;
    this.direction = '&direction=' + direction;
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.sendData(this.page);
  }

  ngOnInit() {
    this.listService.getCheckboxData().subscribe((data: any) => {
      this.adultLangLevel = data.items.etLex.levels;
      this.childLangLevel = data.items.noor.levels;
      this.adultWordTypes = data.items.etLex.poslist;
      this.childWordTypes = data.items.noor.poslist;
      this.getAdultData();
    });
    this.listService.getThemesData().subscribe((data: any) => {
      this.themesList = data.items;
    });
  }

  ngOnDestroy(): void {
    this.routeHandler.unsubscribe();
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

  sendData(pageNr?: number) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: pageNr,
      },
      queryParamsHandling: 'merge',
    });

    this.showSpinner = true;
    this.levelLongString = '';
    this.wordLongString = '';
    this.searchLongString = '';
    this.themeLongString = '';

    const langLevel = this.form.value.lang
      .map((v, i) => v ? this.langLevel[i] : null)
      .filter(v => v !== null);

    const wordList = this.form.value.types
      .map((v, i) => v ? this.wordTypes[i].pos : null)
      .filter(v => v !== null);

    for (const lang of langLevel) {
      let levelString = '';
      levelString = '&level=' + lang;
      this.levelLongString = this.levelLongString + levelString;
    }

    for (const word of wordList) {
      let wordString = '';
      wordString = '&pos=' + word;
      this.wordLongString = this.wordLongString + wordString;
    }

    if (this.form.value.search !== '') {
      this.searchLongString = '&word=' + this.form.value.search;
    }

    if (this.form.value.theme !== '' && this.form.value.theme !== null) {
      this.themeLongString = '&themes=' + this.form.value.theme;
    }
    
    const offset = (this.page - 1) * this.pageSize + 1;

    this.listService.getTableData(this.searchLongString, this.form.value.list, this.pageSize, offset,
      this.column, this.direction, this.levelLongString, this.wordLongString, this.themeLongString)
      .subscribe((data: any) => {
        this.tableData = data.items;
        this.total$ = data.total_count;
      }, () => {
      }, () => {
        this.noResult = this.tableData.length === 0;
        setTimeout(() => this.showSpinner = false, 1000);
      });
  }

  sendToFile(item) {
    this.listService.sendToFile(this.searchLongString, this.form.value.list, item, this.levelLongString, this.wordLongString, this.themeLongString);
  }

  checkAll() {
    this.form.controls.types.setValue(
      this.form.controls.types.value.map(value => value = true)
    );
  }

  sendToTab(url: string) {
    if (url !== null) {
      window.open(url, '_blank');
    }
  }

  scrollTo(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  private addCheckboxes() {
    this.langLevel.forEach((o, i) => {
      const control = new UntypedFormControl();
      (this.form.controls.lang as UntypedFormArray).push(control);
    });
    this.wordTypes.forEach((o, i) => {
      const control = new UntypedFormControl();
      (this.form.controls.types as UntypedFormArray).push(control);
    });
  }
}
