import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';

@Component({
    selector: 'button-toggle',
    imports: [MatButtonToggleModule, FormsModule],
    templateUrl: './button-toggle.component.html',
    styleUrl: './button-toggle.component.scss'
})
export class ButtonToggleComponent {
  @Input() selected?: any;
  @Input() buttonList: any[] = [];
  @Output() onToggle = new EventEmitter();

  constructor() {}

  onChange(e: MatButtonToggleChange) {
    this.onToggle.emit(this.selected);
  }
}
