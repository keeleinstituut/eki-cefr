import {NgbdSortableHeader, SortDirection, SortEvent} from '../services/sortable.directive';
import {DecimalPipe} from '@angular/common';
import {Component, Input, OnInit, Pipe, PipeTransform, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl} from '@angular/forms';
import {GrammarService} from './grammar.service';
import {FeedbackModalComponent} from '../feedback-modal/feedback-modal.component';
import {Router} from '@angular/router';
import {GrammarDetailService} from '../services/grammar-detail.service';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';

@Pipe({name: 'keys', pure: false})
export class KeysPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.values(value).sort((a: any, b: any) => a.ord - b.ord);
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
  public total$: number;
  @ViewChild(FeedbackModalComponent, {static: false})
  public modal: FeedbackModalComponent;
  @ViewChild(NgbPagination, {static: false})
  public pageConf: NgbPagination;
  public showSpinner = false;
  public noResult = false;
 @Input() public page = 1;
  public pageSize = 20;
  public column = '';
  public direction = '';
  public levelLongString = '';

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private listService: GrammarService, private formBuilder: FormBuilder, private pipe: DecimalPipe, private router: Router,
              private detailService: GrammarDetailService) {

  }

  onSort({column, direction}: SortEvent) {
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
    }, () => {
    }, () => {
      this.listService.getTypeData().subscribe((data: any) => {
        this.categoriesList = data.items.filter(item => item.parent === null);
        this.categories = data.items;

        if (localStorage.getItem('search')) {
          const value = JSON.parse(localStorage.getItem('search'));
          this.form = this.formBuilder.group({
            category: new FormArray(value.category.map((item, index) => {
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
          this.addRow();
          this.getChildData();
        }
      });
    });
  }

  addCont(item, index): FormArray {
    return new FormArray(item.subCategory.map((obj, i) => {
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
    if (selected !== 'null') {
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
        this.typeList['names'] = [];
        for (const item of this.typeList['descriptors']) {
          const desc = data.items.find(x => x.descriptor === item);
          this.typeList['names'].push(desc.name);
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
        this.valTypeLists[index][indexTwo].values = [];
    }
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
      subCategory: new FormArray([]),
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

  get category() {
    return (this.form.get('category')).controls;
  }

  get subCategory() {
    return (this.form.get('category')).controls;
  }

  sendData() {
    window.scrollTo(0, 0);
    this.showSpinner = true;
    this.levelLongString = '';
    const langLevel = this.form.value.lang
      .map((v, i) => v ? this.langLevel[i] : null)
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

    for (const item of this.form.value.category) {
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
      valueArray = {maincategory: item.maincategory, subcategory: item.subcategory, descriptors};
      this.valuesArray.push(valueArray);
    }
    const offset = (this.page - 1) * this.pageSize + 1;

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

  toDetail(item) {
    this.detailService.sendData(item.id);
    this.router.navigate(['/grammar-detail']);
    this.detailService.saveSearchData(this.form.value, this.pageSize, this.page);
  }
}
