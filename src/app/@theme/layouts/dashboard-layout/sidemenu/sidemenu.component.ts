import { Component, Input, OnInit, Renderer2 } from "@angular/core";

import { CommonModule } from "@angular/common";
import { UtilsService } from "../../../services/utils.service";
import { SwipeGestureDirective } from "../../../services/swipe-gesture.directive";
import { ApiService } from "src/app/service/api.service";
import { MatMenuModule } from "@angular/material/menu";

@Component({
  selector: "app-sidemenu",
  imports: [CommonModule, SwipeGestureDirective, MatMenuModule],
  templateUrl: "./sidemenu.component.html",
  styleUrl: "./sidemenu.component.scss",
})
export class SidemenuComponent implements OnInit {
  @Input() menu: any;
  sideMenu = [];
  @Input() collapsed: boolean = true;
  profile__config: any = false;
  appVersion = "1.0.0";
  constructor(
    private readonly util: UtilsService,
    private readonly renderer: Renderer2,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    console.log(this.menu);
    this.sideMenu = this.menu?.menus.filter(
      (item: any) => item.isVisible !== false
    );
    this.appVersion = this.util.getGlobal("appVersion");
    this.util.watch("profile__config").subscribe((data) => {
      this.profile__config = data;
    });
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
  private applyStyles(element: Element, styles: { [key: string]: string }) {
    Object.keys(styles).forEach((style) => {
      this.renderer.setStyle(element, style, styles[style]);
    });
  }
  private removeStyles(element: Element, styles: string[]) {
    styles.forEach((style) => {
      this.renderer.removeStyle(element, style);
    });
  }
  toggleHover(div, type) {
    if (!this.collapsed) return;
    const title = div.querySelector(".title");
    if (type === "hover") {
      const [left, top, height, width] = [
        div.getBoundingClientRect().left,
        div.getBoundingClientRect().top,
        div.getBoundingClientRect().height,
        div.getBoundingClientRect().width,
      ];

      this.applyStyles(title, {
        display: "flex",
        left: left + width + 5 + "px",
        top: top + "px",
        height: height + "px",
      });
    } else {
      this.removeStyles(title, ["display", "left", "top", "height"]);
    }
  }
  closeMenu() {
    console.log("close menu");
    this.util.setGlobal("menuCollapsed", true);
  }
  toggleProfile() {
    this.util.href("dashboard/profile");
  }

  logout() {
    this.apiService.logout({
      req: {},
      onSuccess: (res: any) => {
        if (res.status) {
          this.util.destroySession();
          this.util.href("");
        }
      },
      onFailure: (err: any) => {
        this.util.toast(err.message);
      },
    });
  }
}
