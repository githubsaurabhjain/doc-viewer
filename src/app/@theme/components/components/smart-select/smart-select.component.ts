import { CommonModule } from "@angular/common";
import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  HostListener,
  OnInit,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { UtilsService } from "@theme/services/utils.service";

type selectOption = {
  value: any;
  text: string;
  disabled?: boolean;
  isNew?: boolean;
}[];
@Component({
  selector: "app-smart-select",
  templateUrl: "./smart-select.component.html",
  styleUrls: ["./smart-select.component.scss"],
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SmartSelectComponent),
      multi: true,
    },
  ],
})
export class SmartSelectComponent implements ControlValueAccessor, OnInit {
  constructor(
    private readonly util: UtilsService,
    private readonly elementRef: ElementRef,
    private readonly cdRef: ChangeDetectorRef
  ) {}
  @Input() options: selectOption = [];
  @Input() value: any = [];
  @Input() placeholder: string = "Select an option";
  @Input() multiple: boolean = false;
  @Input() searchType: "server" | "client" = "client";
  @Input() hideClear = false;
  @Input() enableSearchAdd: boolean = false;
  @Input() hasSearchAdd: boolean = true;
  @Output() selectionChange = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<any>();
  isMobile: boolean = false;
  selectedValues: any[] = [];
  isOpen = false;
  searchQuery = "";
  isKeyboardOpen = true;
  defaultList: selectOption = [];
  filteredList: selectOption = [];
  ngOnInit(): void {
    this.util.watch("deviceType").subscribe((device: any) => {
      this.isMobile = device === "mobile" || device === "tablet";
    });
    this.filteredList = this.defaultList = this.options?.length
      ? [
          ...new Map(
            this.options.map((option) => [option.value, option])
          ).values(),
        ]
      : [];
    if (this.value && this.value.length) {
      this.writeValue(this.value);
    }
  }
  removeSelected(item: any) {
    const index = this.selectedValues.findIndex(
      (selectedItem: any) => selectedItem.value === item.value
    );
    if (index > -1) {
      this.selectedValues.splice(index, 1);
      this.onChange([...this.selectedValues.map((i) => i.value)]);
    }
    this.selectionChange.emit(
      this.multiple ? [...this.selectedValues.map((i) => i.value)] : item.value
    );
    this.onTouched();
  }

  isOptionSelected(option: any): boolean {
    return this.selectedValues.some((val) => val.value === option.value);
  }

  filteredOptions(): void {
    if (!this.searchQuery) {
      this.filteredList = this.defaultList;
      return;
    }
    const filteredList = this.defaultList.filter(
      (option, index, self) =>
        self.findIndex((o) => o.value === option.value) === index &&
        option.text.toLowerCase().includes(this.searchQuery.toLowerCase()) // Change 'text' to 'label'
    );
    if (this.hasSearchAdd && !filteredList.length) {
      this.filteredList = [
        {
          text: `ADD ${this.searchQuery}...`,
          value: this.searchQuery,
          disabled: false,
          isNew: true,
        },
      ];
    } else {
      this.filteredList = filteredList;
    }
    this.cdRef.detectChanges();

    // return this.options.filter(
    //   (option, index, self) =>
    //     self.findIndex((o) => o.value === option.value) === index &&
    //     option.text.toLowerCase().includes(this.searchQuery.toLowerCase()) // Change 'text' to 'label'
    // );
  }

  onSearchChange(event: any) {
    if (this.searchType === "server") {
      this.onSearch.emit(this.searchQuery);
    }
    this.cdRef.detectChanges();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: any) {
    if (this.multiple) {
      const index = this.selectedValues.findIndex(
        (val) => val.value === option.value
      );
      if (index > -1) {
        this.selectedValues.splice(index, 1);
      } else {
        this.selectedValues.push(
          option.isNew ? { text: option.value, value: option.value } : option
        );
        if (option.isNew) {
          this.searchQuery = "";
          this.filteredOptions();
        }
      }
      this.onChange([...this.selectedValues.map((i) => i.value)]);
    } else {
      this.selectedValues = [option];
      this.isOpen = false;
      this.onChange(option.value);
    }
    this.selectionChange.emit(
      this.multiple
        ? [...this.selectedValues.map((i) => i.value)]
        : option.value
    );
    this.onTouched();
  }

  clear() {
    this.selectedValues = [];
    this.searchQuery = "";
    this.isOpen = false;
    this.onChange(this.multiple ? [] : null);
    this.selectionChange.emit(this.multiple ? [] : null);
    this.onTouched();
  }

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    if (!this.defaultList.length) {
      setTimeout(() => this.writeValue(value), 100);
      return;
    }

    if (this.multiple) {
      this.selectedValues = Array.isArray(value)
        ? value.map((itm) => ({ text: itm, value: itm }))
        : [];

      this.selectedValues = [...this.selectedValues];
    } else {
      const selectedOption = this.defaultList.find(
        (opt) => opt.value === value
      );
      this.selectedValues = selectedOption ? [selectedOption] : [];
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // ✅ Handle click outside for multiple components
  @HostListener("document:click", ["$event"])
  onClickOutside(event: MouseEvent) {
    if (this.isOpen) {
      const target = event.target as HTMLElement;
      if (this.isMobile) {
        if (target.classList.value.includes("smart-select")) {
          this.isOpen = false;
        }
      } else {
        if (!this.elementRef.nativeElement.contains(target)) {
          this.isOpen = false;
        }
      }
    }
  }
}
