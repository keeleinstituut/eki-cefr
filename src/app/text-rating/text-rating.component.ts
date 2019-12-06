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
  public wordCount = '';
  public levels = [];
  public notAllowed = [];
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
    console.log(this.form.value.text);
    this.service.getLevels(this.form.value.list).subscribe((data: any) => {
      this.levels = [];
      this.levels = data.item.evaluationLevels;
      this.form.controls.lang.controls = [];
      this.addCheckboxes();
    });

    this.service.getTextData(encodeURI(this.form.value.text), this.form.value.list).subscribe((data: any) => {
      this.resultData = data.evaluatedText;
      this.smTable = data.textStat.tables.by_level;
      this.wordCount = data.textStat.wordCount;
      this.form.controls.result.setValue(this.form.value.text);
    });
  }

  private addCheckboxes() {
    this.levels.forEach((o, i) => {
      const control = new FormControl(i >= 0);
      (this.form.controls.lang as FormArray).push(control);
    });
  }

  wordColor(level, val) {
    if (val === false) {
      this.notAllowed.push(level);
    } else {
      this.notAllowed = this.notAllowed.filter(item => item !== level);
    }
  }

  colors(level): string {
    for (const color of this.notAllowed) {
      if (color === level) {
        return '';
      }
    }
    return 'color-' + level;
  }

}
