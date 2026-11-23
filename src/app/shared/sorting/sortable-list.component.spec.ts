import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgbdSortableHeader } from '../../services/sortable.directive';
import { SortableListComponent } from './sortable-list.component';

@Component({
  standalone: false,
  template: `<table><thead><tr>
    <th sortable="name" (sort)="onSort($event)">Name</th>
    <th sortable="level" (sort)="onSort($event)">Level</th>
  </tr></thead></table>`
})
class TestListComponent extends SortableListComponent {
  reload = jasmine.createSpy('reload');

  protected override reloadAfterSort(): void {
    this.reload(this.column, this.direction);
  }
}

describe('SortableListComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [TestListComponent, NgbdSortableHeader]
  }));

  it('inherits the header query and cycles sorting before reloading', () => {
    const fixture = TestBed.createComponent(TestListComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const header: HTMLElement = fixture.nativeElement.querySelector('th');
    expect(component.headers.length).toBe(2);
    for (const direction of ['asc', 'desc', '']) {
      header.click();
      fixture.detectChanges();
      expect(component.reload).toHaveBeenCalledWith('name', direction);
      expect(component.headers.first.direction).toBe(direction);
    }
    expect(component.reload).toHaveBeenCalledTimes(3);
  });

  it('clears the previous column when another header is selected', () => {
    const fixture = TestBed.createComponent(TestListComponent);
    fixture.detectChanges();
    const headers: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('th');
    headers[0].click();
    headers[1].click();
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.headers.first.direction).toBe('');
    expect(component.headers.last.direction).toBe('asc');
    expect(component.reload).toHaveBeenCalledWith('level', 'asc');
    expect(component.reload).toHaveBeenCalledTimes(2);
  });
});
