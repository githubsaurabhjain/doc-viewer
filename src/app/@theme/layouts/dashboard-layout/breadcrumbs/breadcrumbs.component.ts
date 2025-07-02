import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface Breadcrumb {
  title: string;
  activeLink?: string;
}
@Component({
  selector: 'app-breadcrumbs',
  imports: [CommonModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent {
  @Input() config: Breadcrumb | undefined;
  constructor() { }
}
