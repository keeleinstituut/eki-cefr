import { NgbdSortableHeader, SortEvent } from '../services/sortable.directive';
import { DecimalPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Pipe,
  PipeTransform,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { UsecaseService } from './usecase.service';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
//import { GrammarDetailService } from '../services/grammar-detail.service';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

/*
@Pipe({ name: 'keys', pure: false })
export class KeysPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.values(value).sort((a: any, b: any) => a.ord - b.ord);
  }
}
*/

export interface DataItem {
  maincategory_name: string;
  subcategory_name: string;
  langlevel: string;
  can_do_statement: string;
  example: string;
  descriptors: string;
}

@Component({
    selector: 'app-usecase',
    templateUrl: './usecase.component.html',
    styleUrls: ['./usecase.component.css'],
    providers: [DecimalPipe],
    standalone: false
})
export class UsecaseComponent implements OnInit, OnDestroy {

  public adultLangLevel: string[];
  public childLangLevel: string[];
  public adultWordTypes: string[];
  public childWordTypes: string[];
  public langLevel: string[];
  public form;
  public tableData: DataItem[];
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
  public total$: number;
  @ViewChild(FeedbackModalComponent)
  public modal: FeedbackModalComponent;
  @ViewChild(NgbPagination)
  public pageConf: NgbPagination;
  public showSpinner = false;
  public noResult = false;
  @Input() public page = 0;
  public pageSize = 20;
  public column = '';
  public direction = '';
  public levelLongString = '';
  public routeHandler: any;
  public showTable = true;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  @ViewChild('searchResults', { static: true }) searchResults: ElementRef;

  constructor(
    private listService: UsecaseService,
    private formBuilder: UntypedFormBuilder,
    private pipe: DecimalPipe,
    private router: Router,
    //private detailService: GrammarDetailService,
    private activatedRoute: ActivatedRoute) {

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

  get category() {
    return (this.form.get('category')).controls;
  }

  get subCategory() {
    return (this.form.get('category')).controls;
  }

  handleOnPageChange(pageNr) {
    if (pageNr) {
      this.sendData(pageNr);
    }
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
    this.sendData();
  }

  ngOnInit() {
    this.listService.getCheckboxData().subscribe((data: any) => {
      this.adultLangLevel = data.items.etLex.levels;
      this.childLangLevel = data.items.noor.levels;
      //remove C1
      var index1 = this.childLangLevel.indexOf('C1');
      if (index1 > -1) {
        this.childLangLevel.splice(index1, 1);
      }
      var index2 = this.childLangLevel.indexOf('eelA1');
      if (index2 > -1) {
        this.childLangLevel.splice(index2, 1);
      }
      this.adultWordTypes = data.items.etLex.poslist;
      this.childWordTypes = data.items.noor.poslist;
    }, () => {
    }, () => {
      this.listService.getTypeData().subscribe((data: any) => {
        this.categoriesList = data.items.filter(item => item.parent === null);
        this.categories = data.items;

        if (localStorage.getItem('search')) {
          const value = JSON.parse(localStorage.getItem('search'));
          this.form = this.formBuilder.group({
            category: new UntypedFormArray(value.category.map((item, index) => {
                const group = this.initSection();
                this.getChildValues(item.maincategory, index);
                group.patchValue({
                  maincategory: item.maincategory,
                  subcategory: item.subcategory,
                  subCategory: item.subCategory
                });
                group.setControl('subCategory', this.addCont(item, index));
                return group;
              })
            ),
            list: 'noor',
            lang: new UntypedFormArray([]),
            types: new UntypedFormArray([])
          });

          this.langCheckboxes(value.lang);
          this.sendData();
          localStorage.removeItem('search');
        } else {
          this.form = this.formBuilder.group({
            category: new UntypedFormArray([]),
            list: 'noor',
            lang: new UntypedFormArray([]),
            types: new UntypedFormArray([])
          });
          this.addRow();
          this.getChildData();
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.routeHandler.unsubscribe();
  }

  addCont(item, index): UntypedFormArray {
    return new UntypedFormArray(item.subCategory.map((obj, i) => {
      const secGroup = this.initSecSection();
      this.getTypeValues(item.subcategory, index);
      this.getTypes(obj.descriptor, index, i);
      secGroup.patchValue({
        descriptor: obj.descriptor,
        values: obj.values
      });
      return secGroup;
    }));
  }

  getChildValues(selected: string, index: number) {
    if (selected !== null) {
      this.childLists[index] = [];
      this.childCatList = this.categories.filter(item => item.parent === selected);
      this.childLists[index] = this.childCatList;
    } else {
      this.childLists[index] = [];
      this.typeLists[index] = [];
      this.valTypeLists[index] = [];
    }
  }

  getTypeValues(selected: string, index: number) {
    if (selected !== 'null') {
      this.listService.getTypeValues().subscribe((data: any) => {
        this.typeList = this.categories.find(item => item.category === selected);
        if (this.typeList) {
          this.typeList['names'] = [];
          for (const item of this.typeList['descriptors']) {
            const desc = data.items.find(x => x.descriptor === item);
            this.typeList['names'].push(desc.name);
          }
        }

        this.typeLists[index] = this.typeList;
      });
    } else {
      this.typeLists[index] = [];
      this.valTypeLists[index] = [];
    }
  }

  getTypes(selected: string, index: number, indexTwo: number) {
    if (selected !== 'null') {
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
    } else {
      return this.valTypeLists && this.valTypeLists.length
        ? this.valTypeLists[index][indexTwo].values = []
        : null;
    }
  }

  getAdultData() {
    this.langLevel = this.adultLangLevel;
    this.form.controls.lang.controls = [];
    this.form.controls.types.controls = [];
    this.addCheckboxes();
  }

  getChildData() {
    this.form.controls.lang.controls = [];
    this.langLevel = this.childLangLevel;
    this.form.controls.lang.controls = [];
    this.form.controls.types.controls = [];
    this.addCheckboxes();
  }

  initSection() {
    return this.formBuilder.group({
      maincategory: [],
      subcategory: [],
      subCategory: new UntypedFormArray([]),
    });
  }

  initSecSection() {
    return this.formBuilder.group({
      descriptor: [],
      values: []
    });
  }

  addRow() {
    (this.form.get('category')).push(this.formBuilder.group({
      maincategory: [],
      subcategory: [],
      subCategory: new UntypedFormArray([]),
    }));
  }

  removeRow(index: number) {
    this.form.controls.category.removeAt(index);
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

  sendData(pageNr?: number) {
    if (pageNr) {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          page: pageNr,
        },
        queryParamsHandling: 'merge',
      });
    }

    this.showSpinner = true;
    this.levelLongString = '';

    const langLevel = this.form ? this.form.value.lang
      .map((v, i) => v ? this.langLevel[i] : null)
      .filter(v => v !== null) : [];

    for (const lang of langLevel) {
      let levelString = '';
      if (lang === langLevel[0] && this.form.value.search === '') {
        levelString = 'level=' + lang;
      } else {
        levelString = '&level=' + lang;
      }
      this.levelLongString = this.levelLongString + levelString;
    }

    const category = this.form ? this.form.value.category : [];

    for (const item of category) {
      let valueArray = {};
      const descriptors = [];
      for (const part of item.subCategory) {
        if (part.descriptor === 'null') {
          part.descriptor = null;
        }
        if (part.values === 'null') {
          part.values = null;
        }
        descriptors.push([part.descriptor, part.values]);
      }
      if (item.maincategory === 'null') {
        item.maincategory = null;
      }
      if (item.subcategory === 'null') {
        item.subcategory = null;
      }
      valueArray = { maincategory: item.maincategory, subcategory: item.subcategory, descriptors };
      this.valuesArray.push(valueArray);
    }

    const offset =  (this.page - 1) * this.pageSize + 1;

    this.listService.getTableData(encodeURI(JSON.stringify(this.valuesArray)), this.levelLongString, this.pageSize, offset,
      this.column, this.direction).subscribe((data: any) => {
      this.valuesArray = [];
      this.itemsCount = data.count;
      this.tableData = data.items;
      this.total$ = data.total_count;
      if (localStorage.getItem('page')) {
        this.pageSize = JSON.parse(localStorage.getItem('size'));
        this.page = JSON.parse(localStorage.getItem('page'));
        this.sendData();
        localStorage.removeItem('size');
        localStorage.removeItem('page');
      }


    }, () => {
    }, () => {
      this.noResult = this.tableData.length === 0;
      setTimeout(() => this.showSpinner = false, 1000);
    });
  }

  /*
  toDetail(item) {
    this.detailService.sendData(item.id);
    this.router.navigate(['/grammar-detail']);
    this.detailService.saveSearchData(this.form.value, this.pageSize, this.page);
  }*/

  scrollTo(el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  private addCheckboxes() {
    this.langLevel.forEach((o, i) => {
      const control = new UntypedFormControl();
      (this.form.controls.lang as UntypedFormArray).push(control);
    });
  }

  private langCheckboxes(item: any) {
    this.langLevel = this.childLangLevel;
    this.langLevel.forEach((o, i) => {
      const control = new UntypedFormControl(item[i]);
      (this.form.controls.lang as UntypedFormArray).push(control);
    });
  }
}
