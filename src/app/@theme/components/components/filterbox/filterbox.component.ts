import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-filterbox',
    imports: [CommonModule],
    templateUrl: './filterbox.component.html',
    styleUrl: './filterbox.component.scss'
})
export class FilterboxComponent {
  searchType;
}
