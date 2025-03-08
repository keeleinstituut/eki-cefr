import { AfterViewInit, Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'app-educational-material',
    templateUrl: './educational-material.component.html',
    styleUrls: ['./educational-material.component.css'],
    standalone: false
})
export class EducationalMaterialComponent {

  constructor(private route: ActivatedRoute, private router: Router) {}

  onAnchorClick(value?: string) {
    this.route.fragment.subscribe(f => {
      let element;

      if (value) {
        element = document.querySelector('#' + value);
      } else {
        element = document.querySelector('#' + f);
      }

      if (element) {
        element.scrollIntoView(true);
      }
    });
  }

  toTop() {
    window.scrollTo(0, 0);
  }
}
