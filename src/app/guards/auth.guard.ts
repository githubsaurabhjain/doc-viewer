import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { UtilsService } from "../@theme/services/utils.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private util: UtilsService) {}
  isAuthenticated() {
    return this.util.currentUser();
  }

  public getDataFromLocalStorage = (key?: string) => {
    const sessionObject = JSON.parse(localStorage.getItem("session")!);
    if (key && sessionObject?.["details"]?.[key]) {
      return sessionObject?.["details"]?.[key];
    }
    return sessionObject?.["details"];
  };

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //let isAuthorized = this.isAuthenticated().then(() => { return true }).catch(() => { return false; })
    let isAuthorized = this.isAuthenticated() && this.getDataFromLocalStorage();

    if (isAuthorized) {
      return true;
    }
    if (this.util.currentUser() && this.getDataFromLocalStorage()) {
      return true;
    }

    console.log(this.util.currentUser(), this.getDataFromLocalStorage());
    this.util.href("/splashscreen");
    return false;
  }
}
