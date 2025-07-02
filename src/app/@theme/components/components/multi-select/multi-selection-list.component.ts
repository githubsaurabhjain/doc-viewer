import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'multi-selection-list',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './multi-selection-list.component.html',
  styleUrl: './multi-selection-list.component.scss',
})
export class MultiSelectionListComponent implements OnChanges {
  @Input() public list: any[] = [];
  @Input() public isMultiSelect: boolean = true;
  @Input() public selectedValue: any[] = [];
  @Input() public label: string = '';
  @Input() public placeholder?: string;
  @Input() public isDisable: boolean = false;
  @Input() public textMapKey?: string;

  @Output() public onToggle = new EventEmitter<any>();

  public allSelected: boolean = false;

  @ViewChild(MatSelect) select: MatSelect;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedValue']) {
      this.allSelected = this.selectedValue?.length === this.list?.length;
    }
  }

  onSelectionChange() {
    if (this.selectedValue.length === this.list.length) {
      this.allSelected = true;
    } else {
      this.allSelected = false;
    }
    this.onToggle.emit(this.selectedValue);
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.selectedValue = this.list.slice();
    } else {
      this.selectedValue = [];
    }
    this.onToggle.emit(this.selectedValue);
  }
}
