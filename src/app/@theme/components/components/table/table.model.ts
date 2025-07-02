import { TemplateRef } from "@angular/core";

export interface IColumnConfig {
  label: string;
  columnDef: string;
  cellTemplate?: TemplateRef<any>;
  type?: string | number;
  columnType?: string | number;
  isSticky?: boolean;
  hasTextColor?: boolean;
}
