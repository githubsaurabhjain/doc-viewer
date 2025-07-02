import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";
import { UtilsService } from "@theme/services/utils.service";

@Component({
  selector: "app-footer-nav",
  imports: [CommonModule, MatMenuModule],
  templateUrl: "./footer-nav.component.html",
  styleUrl: "./footer-nav.component.scss",
})
export class FooterNavComponent implements OnInit {
  @Input() menu: any;
  sideMenu = [];
  constructor(private readonly util: UtilsService) {}
  ngOnInit(): void {
    this.sideMenu = this.menu?.menus.filter(
      (item: any) => item.isVisible !== false
    );
  }
  navigateTo(page: any) {
    this.util.watch("deviceType").subscribe((data: string) => {
      if (["mobile", "tablet"].includes(data)) {
        this.util.setGlobal("menuCollapsed", true);
      }
    });
    this.util.href("dashboard/" + page);
    this.menu["currentLink"] = page;
  }
}
