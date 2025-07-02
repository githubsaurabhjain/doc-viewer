import { Injectable, HostListener, Host } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  Observable,
} from "rxjs";
import { environment } from "../../../environments/environment";
import { Dialog } from "@angular/cdk/dialog";
import { AppListenerService } from "./app-listener.service";
import { AlertComponent } from "@theme/components/components/alert/alert.component";
interface AppState {
  loader?: boolean; // Global loader state
  toast?: {
    message: string;
    type: "success" | "error" | "info";
    duration: number;
  }; // Toast messages
  [key: string]: any; // Allow adding more states dynamically
}
export interface AlertConfig {
  title: string;
  subTitle?: string;
  message: string;
  type?: "success" | "error" | "info";
  buttons?: {
    text: string;
    class?: string;
    handler?: () => void;
  }[];
}
@Injectable({
  providedIn: "root",
})
export class UtilsService {
  session: any = false;
  private _storage: any;
  __localSession: any = {};
  private readonly deviceType: Array<string> = ["mobile", "tablet", "desktop"];
  constructor(
    private readonly app: AppListenerService,
    private readonly route: Router,
    private readonly currentRoute: ActivatedRoute,
    private readonly toastController: MatSnackBar,
    // private storage: Storage,
    private readonly alertController: Dialog // private loadingCtrl: LoadingController
  ) {
    this.init();
  }
  init() {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 200);

    this.setGlobal(
      "ENV",
      environment?.production ? "production" : "development"
    );
    this.setGlobal("appVersion", environment?.version || "1.0.0");
    window.addEventListener("resize", () => {
      switch (true) {
        case window.innerWidth < 768:
          this.setGlobal("deviceType", "mobile");
          this.setGlobal("menuCollapsed", true);
          break;
        case window.innerWidth < 1024:
          this.setGlobal("deviceType", "tablet");
          this.setGlobal("menuCollapsed", true);
          break;
        default:
          this.setGlobal("deviceType", "desktop");
          this.setGlobal("menuCollapsed", false);
          break;
      }
    });
  }

  private readonly __globalSubject = new BehaviorSubject<{
    [key: string]: any;
  }>({});

  watch<T>(key: string): Observable<T> {
    return this.__globalSubject.asObservable().pipe(
      map((data: { [x: string]: any }) => data?.[key]), // Extract only the specified key
      distinctUntilChanged(), // Ignore unchanged values
      filter((value) => value !== null && value !== undefined) // Ignore null/undefined
    );
  }
  globalVar$ = this.__globalSubject.asObservable();

  setGlobal(key: string, value: any) {
    const currentData = { ...this.__globalSubject.value };
    currentData[key] = value;
    this.__globalSubject.next(currentData);
  }

  getGlobal(key: string) {
    return this.__globalSubject.value[key];
  }

  spinner = {
    status: () => this.app.get("loader"),
    start: () => this.app.set("loader", true),
    setProgress: (val: number) => this.app.set("loaderProgress", val),
    getProgress: () => this.app.get("loaderProgress"),
    stop: () => this.app.set("loader", false),
  };
  async ngOnInit() {
    // const storage = await this.storage.create();
    this._storage = localStorage;
  }
  async toast(message, duration = 3000) {
    //this._snackBar.open(message)
    const __toast = this.toastController.open(message, "Okay", {
      duration: duration,
    });
    __toast.afterDismissed();
  }
  notify(param: AlertConfig) {
    let opt = {
      title: "Alert",
      subTitle: "Action Needed",
      message: "",
      type: "success",
      buttons: [
        {
          text: "Cancel",
          class: "secondary",
          handler: () => void 0,
        },
        {
          text: "Okay",
          class: "primary",
          handler: () => void 0,
        },
      ],
      ...param,
    };
    this.alertController.closeAll();
    this.alertController.open(AlertComponent, {
      data: opt,
      disableClose: true,
      width: "500px", // Full width
      panelClass: "bottom-fixed-modal", // Custom class for styling
      backdropClass: "backdrop-class", // Custom class for backdrop
    });
  }
  promt(param: AlertConfig, callback: (arg0: boolean) => void) {
    let opt = {
      cssClass: "my-custom-class",
      title: "Alert",
      subTitle: "Action Needed",
      message: "",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            callback(false);
          },
        },
        {
          text: "Okay",
          handler: () => {
            callback(true);
          },
        },
      ],
      ...param,
    };
    this.alertController.open(AlertComponent, {
      data: opt,
      disableClose: true,
      width: "500px",
      height: "500px",
    });
  }
  smoothScrollTo(target: string) {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  uniqID() {
    return uuidv4();
  }
  currentUrl() {
    return this.route.url;
  }
  href(location: any, reqData: any = {}) {
    console.log("l", location, reqData);
    this.set("currentUrl", location);
    return this.route.navigateByUrl(location, {
      skipLocationChange: false,
      state: reqData,
    });
    //this.route.navigate([location])
  }
  reqData() {
    return this.route.getCurrentNavigation()?.extras?.state || null;
  }
  dateNow() {
    return moment().format("YYYY-MM-DD HH:mm:ss");
  }

  async sessionStart(data: any) {
    window.localStorage.setItem("session", "");
    this.session = false;
    this.session = data;
    window.localStorage.setItem("session", JSON.stringify(data));
  }
  async checkSession() {
    let session = window.localStorage.getItem("session") || false;
    console.log("session", session);
    if (session) {
      this.session = JSON.parse(session);
      return this.session;
    }
    return false;
  }
  currentUser() {
    if (this.session) {
      return this.session;
    }
    return false;
  }
  async destroySession() {
    localStorage.removeItem("session");
    this.session = null;
  }
  setLocal(type: string, data: string) {
    localStorage.setItem(type, data);
    return true;
  }
  getLocal(type: string) {
    return localStorage.getItem(type);
  }

  removeLocal(item: string) {
    localStorage.removeItem(item);
    return true;
  }

  localSession = {
    get: (key: string) => {
      return this.__localSession[key] || false;
    },
    set: (key: string, value: any) => {
      this.__localSession[key] = value;
      return true;
    },
  };
  set(type, data) {
    if (this.session) {
      if (!this.session.hasOwnProperty("extra")) {
        this.session["extra"] = {};
      }
      this.session["extra"][type] = data;
      return true;
    }
    return false;
  }
  get(type) {
    try {
      return this.session["extra"][type];
    } catch (e) {
      return null;
    }
  }
}
