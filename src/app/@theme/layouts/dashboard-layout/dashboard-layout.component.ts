import { Component, inject, Renderer2 } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { SidemenuComponent } from "./sidemenu/sidemenu.component";
import { FooterComponent } from "./footer/footer.component";
import { UtilsService } from "../../services/utils.service";
import { CommonModule } from "@angular/common";
import { ApiService } from "../../../service/api.service";
import { FooterNavComponent } from "./footer-nav/footer-nav.component";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationModalComponent } from "@theme/components/components/confirmation-modal/confirmation-modal.component";

@Component({
  selector: "app-dashboard-layout",
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    SidemenuComponent,
    FooterComponent,
    FooterNavComponent,
  ],
  templateUrl: "./dashboard-layout.component.html",
  styleUrl: "./dashboard-layout.component.scss",
})
export class DashboardLayoutComponent {
  collapsed: boolean = false;
  public menu: any;
  deviceType = "desktop";
  readonly dialog = inject(MatDialog);

  constructor(
    private readonly util: UtilsService,
    private readonly apiService: ApiService
  ) {}
  getRouteAnimationState(outlet: any) {
    return outlet?.isActivated
      ? outlet.activatedRoute.snapshot.url.join("/")
      : "default";
  }
  ngOnInit(): void {
    this.util.watch("menuData").subscribe((data) => {
      if (data) {
        this.menu.currentLink = data;
      }
    });
    this.util.watch("deviceType").subscribe((data: string) => {
      this.deviceType = data;
    });

    const { name: title, userType: subTitle = "Team" } =
      this.util?.session?.details;
    this.util.setGlobal("profile__config", {
      title,
      subTitle,
      links: [
        {
          title: "My Profile",
          icon: "ri-user-smile-line",
          action: () => {
            this.util.href("dashboard/my-profile");
            console.log("myProfile Clicked");
          },
        },
        {
          title: "Logout",
          icon: "ri-logout-circle-r-line",
          action: () => {
            this.dialog
              .open(ConfirmationModalComponent, {
                data: {
                  message: "Are you sure want to logout?",
                },
              })
              .afterClosed()
              .subscribe((res) => {
                if (res) {
                  this.apiService.logout({
                    req: {},
                    onSuccess: () => {
                      this.util.destroySession();
                      this.util.href("");
                    },
                  });
                }
              });
          },
        },
      ],
    });

    this.menu = {
      currentLink: "manage-documents",
      menus: [
        {
          title: "Database Tables",
          icon: "ri-home-line",
          link: "manage-documents",
          isVisible: true,
        },
      ],
    };

    this.menu.currentLink = this.util
      .currentUrl()
      .replace("dashboard", "")
      .split("/")
      .filter((v) => v !== "")[0];

    this.util.globalVar$.subscribe((data) => {
      this.collapsed = data?.["menuCollapsed"];
    });
  }

  toggleMenu() {
    this.util.setGlobal("menuCollapsed", !this.collapsed);
  }

  openMenu() {
    if (this.collapsed) this.util.setGlobal("menuCollapsed", false);
  }

  logout() {
    {
      this.dialog
        .open(ConfirmationModalComponent, {
          data: {
            message: "Are you sure want to logout?",
          },
        })
        .afterClosed()
        .subscribe((res) => {
          if (res) {
            this.util.spinner.start();
            this.apiService.logout({
              req: {},
              onSuccess: (res: any) => {
                if (res.status) {
                  this.util.spinner.stop();
                  this.util.destroySession();
                  this.util.href("");
                }
              },
              onFailure: (err: any) => {
                this.util.spinner.stop();
                this.util.toast(
                  err?.message || "Something went wrong, please try again"
                );
              },
            });
          }
        });
    }
  }
}
