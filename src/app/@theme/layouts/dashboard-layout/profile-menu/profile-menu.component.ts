import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-menu',
  imports: [CommonModule],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss'
})
export class ProfileMenuComponent {
  @Input() config: any = false;
  profile_dropdown: boolean = false;
  constructor() {
    document.addEventListener('click', this.offClickHandler.bind(this));
  }

  offClickHandler(e: any) {

    if (!e.target.closest(".profile__component")) {
      this.profile_dropdown = false;
    }
  }
  toggleDropdown() {
    this.profile_dropdown = !this.profile_dropdown;
  }
}
