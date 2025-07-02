import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'hero-table',
  imports: [MatTableModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, OnChanges {
  @Input() public data!: any[];
  @Input() public columnConfig!: any[];
  public env = environment;
  public displayedColumns: string[] = [];

  constructor() { }

  ngOnInit() {
    console.log('TableComponent initialized', this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columnConfig']?.currentValue) {
      this.displayedColumns = changes['columnConfig']?.currentValue.map(
        (itm: any) => itm.columnDef
      );
    }
  }
}
