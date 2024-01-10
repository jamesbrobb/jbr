import { Component, EventEmitter, Input, Output } from '@angular/core';
import {SortOrder} from "@jamesbenrobb/core";

@Component({
  selector: 'sortable-header',
  standalone: true,
  templateUrl: './sortable-header.component.html',
  styleUrls: ['./sortable-header.component.css']
})
export class SortableHeaderComponent {

  @Input() direction: SortOrder = 'none';
  @Output() directionChange = new EventEmitter<SortOrder>();

  public sortable = true;


  get none() {
    return this.direction === 'none';
  }

  get ascending() {
    return this.direction === 'asc';
  }

  get descending() {
    return this.direction === 'desc';
  }

  sort() {
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    this.directionChange.emit(this.direction);
  }
}
