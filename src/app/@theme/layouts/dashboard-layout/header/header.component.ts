import { Component, OnInit } from '@angular/core';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';
import { UtilsService } from '../../../services/utils.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../service/api.service';

@Component({
  selector: 'app-header',
  imports: [ProfileMenuComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  profile__config: any = false;
  collapsed = false;
  public countryList: any[] = [];
  public selectedCountry: any;
  countrySideDrawer: boolean;
  public currentPoints: number | undefined;
  public showPointsInfo: boolean | undefined;
  cartCount: number = 0;
  public isCustomer: boolean;
  constructor(private readonly util: UtilsService) {}
  ngOnInit() {
    this.util.watch('cartItem').subscribe((data: any) => {
      if (data) {
        this.cartCount = data.length;
      }
    });
    this.util.watch('info').subscribe((data: any) => {
      if (data) {
        this.currentPoints = data['currentPoints'];
      }
    });

    this.countryList = [];

    this.selectedCountry = {
      name: 'Colombia',
      code: 'CO',
    };
    this.util.watch('menuCollapsed').subscribe((data: any) => {
      this.collapsed = data;
    });

    this.util.watch('profile__config').subscribe((data: any) => {
      this.profile__config = data;
    });
    this.util.setGlobal('selectedCountry', this.selectedCountry);
  }

  toggleMenu() {
    this.collapsed = !this.collapsed;
    this.util.setGlobal('menuCollapsed', this.collapsed);
  }

  navigateTo(route: string) {
    this.util.href('dashboard/' + route);
  }
}
