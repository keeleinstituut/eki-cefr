import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-about-project',
  templateUrl: './about-project.component.html',
  styleUrls: ['./about-project.component.css']
})
export class AboutProjectComponent {

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  onAnchorClick() {
    this.route.fragment.subscribe(f => {
      const element = document.querySelector('#' + f);
      if (element) {
        element.scrollIntoView(true);
      }
    });
  }

  toTop() {
    window.scrollTo(0, 0);
  }

}
