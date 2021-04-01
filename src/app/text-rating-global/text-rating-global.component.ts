import {Component, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {TextRatingGlobalService} from './text-rating-global.service';
import {FeedbackModalComponent} from '../feedback-modal/feedback-modal.component';

@Component({
  selector: 'app-text-rating',
  templateUrl: './text-rating-global.component.html',
  styleUrls: ['./text-rating-global.component.css']
})
export class TextRatingGlobalComponent {

  public form;
  public resultData = '';
  public smTable = '';
  public wordCount = '';
  public Findex = '';
  public Ldindex = '';
  public NindexVproportion = '';
  public NindexSproportion = '';
  public LixIndex = '';
  public levels = [];
  public notAllowed = [];
  public clicked = false;
  @ViewChild(FeedbackModalComponent, {static: false})
  public modal: FeedbackModalComponent;

  constructor(private formBuilder: FormBuilder, private service: TextRatingGlobalService) {
    this.form = this.formBuilder.group({
      list: 'etLex',
      lang: new FormArray([]),
      text: 'Eesti keeles on 14 käänet, mille üle eestlased on iseäranis uhked. Selletõttu aga ei ole eesti keele lauses sõnade järjekord kindlate reeglitega määratud, nagu on seda paljudes indo-euroopa keeltes. Käänete rohkus ei garanteeri veel, et lauseliikmete süntaktilised funktsioonid oleks nende käänete vahel võrdselt ära jaotatud. Ei, nii lihtne eesti keel siiski ei ole! Enamasti sõltub sõna süntaktiline funktsioon ka veel lause tähendusest, see aga on arvutile seni veel ületamatu raskus. Näiteks kui vaadata kahte lauset «Lapsed sõid need kommid ära» ja «Need kommid sõid lapsed ära», siis nendes lausetes saab alust ja sihitist määrata ainult lause tähendust teades.',
      result: ''
    });
    this.setlangList();
  }

  setlangList() {
    this.notAllowed = [];
    this.service.getLevels(this.form.value.list).subscribe((data: any) => {
      this.levels = [];
      this.levels = data.item.evaluationLevels;
      (this.form.controls.lang as FormArray).clear();
      this.levels.forEach((o, i) => {
        const control = new FormControl(i >= 0);
        (this.form.controls.lang as FormArray).push(control);
      });

    });
    if (this.clicked === true) {
      this.getData();
    }
  }


  getData() {
    this.service.getTextData(encodeURI(this.form.value.text), this.form.value.list).subscribe((data: any) => {
      this.resultData = data.evaluatedText;
      this.smTable = data.textStat.tables.by_level;
      this.wordCount = data.textStat.wordCount;
      this.Findex = data.textStat.Findex;
      this.LixIndex = data.textStat.LixIndex;
      this.Ldindex = data.textStat.Ldindex;
      this.NindexSproportion = data.textStat.NindexSproportion;
      this.NindexVproportion = data.textStat.NindexVproportion;
      this.form.controls.text.setValue(this.form.value.text);
      this.form.controls.result.setValue(this.form.value.text);
    });
  }


clearText() {
  this.form.controls.text.setValue('');
  this.form.value.text = '';
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
        return 'color-no';
      }
    }
    return 'color-' + level;
  }

}
