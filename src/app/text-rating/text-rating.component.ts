import {Component, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {TextService} from './text.service';
import {FeedbackModalComponent} from '../feedback-modal/feedback-modal.component';

@Component({
  selector: 'app-text-rating',
  templateUrl: './text-rating.component.html',
  styleUrls: ['./text-rating.component.css']
})
export class TextRatingComponent {

  public form;
  public resultData = [];
  public resultDataGrammar = [];
  public resultDataPhrases = []
  public phrases ={};
  public smTable = '';
  public smTableForms = '';
  public wordCount = '';
  public Findex = '';
  public Nindex = '';
  public LixIndex = '';
  public SVprop = '';
  public levels = [];
  public notAllowed = [];
  public clicked = false;
  public project = 'noor';
  public activeId = 'sonavara';


  @ViewChild(FeedbackModalComponent)
  public modal: FeedbackModalComponent;

  constructor(private formBuilder: FormBuilder, private service: TextService) {
    this.form = this.formBuilder.group({
      list: 'noor',
      lang: new FormArray([]),
      text: 'Eesti keel on emakeeleks umbes miljonile inimesele üle maailma. Eesti keeles on 14 käänet, mille üle eestlased on iseäranis uhked. Selletõttu aga ei ole eesti keele lauses sõnade järjekord kindlate reeglitega määratud, nagu on seda paljudes indo-euroopa keeltes. Käänete rohkus ei garanteeri veel, et lauseliikmete süntaktilised funktsioonid oleks nende käänete vahel võrdselt ära jaotatud. Ei, nii lihtne eesti keel siiski ei ole! Enamasti sõltub sõna süntaktiline funktsioon ka veel lause tähendusest, see aga on arvutile seni veel ületamatu raskus. Näiteks kui vaadata kahte lauset «Lapsed sõid need kommid ära» ja «Need kommid sõid lapsed ära», siis nendes lausetes saab alust ja sihitist määrata ainult lause tähendust teades.',
      result: ''
    });
    this.setlangList();
  }

  setlangList() {
    this.notAllowed = [];

    this.project = this.form.value.list;
    this.activeId = 'sonavara';

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
  getStatTable() {
   if (this.activeId == 'vormid')
   {
      return this.smTableForms;
   }
   return this.smTable
  }

  getData() {
    this.service.getTextData(encodeURI(this.form.value.text), this.form.value.list).subscribe((data: any) => {

      this.resultData = data.evaluatedText;
      this.resultDataGrammar = data.evaluatedGrammarText;
      this.resultDataPhrases = data.evaluatedPhrasesText;
      this.phrases = data.phrasesData;
      this.smTable = data.textStat.tables.by_level;
      this.smTableForms = data.textStat.tables_forms.by_level;
      this.wordCount = data.textStat.wordCount;
      this.Findex = data.textStat.Findex;
      this.LixIndex = data.textStat.LixIndex;
      this.Nindex = data.textStat.Nindex;
      this.SVprop = data.textStat.SVprop;
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

  colors(index): string {

    var level = this.resultData[index].level;
    var formsLevel = this.resultDataGrammar[index].level;
    var level1 = 'color-' + level;
    var level2 = 'border-'+ formsLevel;
    if (!level) {
      level1 = 'color-no';
    }
    /**
    if (!formsLevel || !(this.form.value.list=='noor')) {
      level2 = 'border-no';
    }
    **/
    for (const color of this.notAllowed) {
      if (color === level) {
        level1 = 'color-no';
      }
       if (color === formsLevel) {
        level2 = 'border-no';
      }

    }
    return level1 + ' ' + level2;
  }

  phraseColors(wordData): string {
    if (wordData.isbaseword){
      return 'textcolor-'+wordData.phraselevels[wordData.phraselevels.length-1];
    }
    else
    {
      return '';
    }
  }

  removeFirst(arr) {
    var arr1 = [...arr];
    if (arr1.length){
      arr1.shift();
      return arr1;
    }
    return [];
  }

}
