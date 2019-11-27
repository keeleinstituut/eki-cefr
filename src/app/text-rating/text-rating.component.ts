import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {TextService} from './text.service';

@Component({
  selector: 'app-text-rating',
  templateUrl: './text-rating.component.html',
  styleUrls: ['./text-rating.component.css']
})
export class TextRatingComponent implements OnInit {

  public form;
  public resultData = '';
  public smTable = '';
  public levels = [];
  constructor(private formBuilder: FormBuilder, private service: TextService) {
    this.form = this.formBuilder.group({
      list: 'etLex',
      lang: new FormArray([]),
      text: '',
      result: ''
    });
  }

  ngOnInit() {
  }

  getData() {
    this.service.getLevels(this.form.value.list).subscribe((data: any) => {
      this.levels = [];
      this.levels = data.item.evaluationLevels;
      this.form.controls.lang.controls = [];
      this.addCheckboxes();
      console.log(this.form.controls.lang.controls);
    });

    this.service.getTextData(this.form.value.text, this.form.value.list).subscribe((data: any) => {
      console.log(data);
      this.resultData = data;
      this.smTable = data.textStat;
    });
  }

  private addCheckboxes() {
    this.levels.forEach((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.lang as FormArray).push(control);
    });
  }

}
