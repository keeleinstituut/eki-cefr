import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'app-about-project',
    templateUrl: './about-project.component.html',
    styleUrls: ['./about-project.component.css'],
    standalone: false
})

export class AboutProjectComponent {

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
