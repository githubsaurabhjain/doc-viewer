import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { UtilsService } from "../../../@theme/services/utils.service";
import { ApiService } from "../../../service/api.service";

@Component({
  selector: "app-splashscreen",
  imports: [],
  standalone: true,
  templateUrl: "./splashscreen.component.html",
  styleUrl: "./splashscreen.component.scss",
})
export class SplashscreenComponent implements OnInit {
  constructor(
    private readonly util: UtilsService,
    private readonly apiService: ApiService
  ) {}
  ngOnInit() {
    this.util
      .checkSession()
      .then((data) => {
        if (data) {
          this.apiService.verifySession({
            req: {},
            onSuccess: (res: any) => {
              this.util.session = data;
              setTimeout(() => {
                this.util.href("dashboard");
              }, 500);
            },
            onFailure: (err: any) => {
              this.util.href("get-started");
            },
          });
        } else {
          this.util.href("get-started");
        }
      })
      .catch((err: any) => {
        console.log("error", err);
        this.util.href("get-started");
      });
  }
}
