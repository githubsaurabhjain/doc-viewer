import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-selection-list',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        CommonModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectionListComponent),
            multi: true,
        },
    ],
    templateUrl: './selection-list.component.html',
    styleUrls: ['./selection-list.component.scss']
})
export class SelectionListComponent implements ControlValueAccessor, OnInit {
  @Input() public list!: any[];
  @Input() public isMultiSelect: boolean = false;
  public selectedValue: any;
  @Input() public label: string = '';
  @Input() public placeholder?: string;
  @Input() public isDisable: boolean | undefined;
  @Input() public textMapKey?: string;
  @Input() public valueMapper: string = 'id';
  public isDisabled!: boolean;
  @Output() public onSelectionChange = new EventEmitter<string | number>();
  public isDirty: boolean = false;
  private dropdownOpened = false;

  public ngOnInit(): void {
    console.log(this.list);
  }

  onOptionChange() {
    this.onChange(this.selectedValue);
    this.onTouch();

    if (this.selectedValue !== undefined) {
      this.markAsDirty();
    }

    this.onSelectionChange.emit(this.selectedValue);
  }

  private markAsDirty() {
    if (this.onChange) {
      this.onChange(this.selectedValue);
    }
    this.isDirty = true;
  }

  onDropdownOpen() {
    this.dropdownOpened = true;
  }

  onDropdownClose() {
    if (!this.selectedValue && this.dropdownOpened) {
      this.dropdownOpened = false;
    }
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {
    console.log(obj);

    if (obj) {
      if (this.isMultiSelect) {
        this.selectedValue = obj;
      } else {
        this.selectedValue =
          this.list.find((item) => item[this.valueMapper] === obj) || null;
      }
    }
    this.onChange(this.selectedValue);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
