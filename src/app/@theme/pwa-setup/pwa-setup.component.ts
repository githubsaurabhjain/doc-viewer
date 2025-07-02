import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import moment from "moment";
import { NetworkService } from "../services/network.service";
import { SwUpdate } from "@angular/service-worker";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-pwa-setup",
  imports: [CommonModule],
  templateUrl: "./pwa-setup.component.html",
  styleUrl: "./pwa-setup.component.scss",
})
export class PwaSetupComponent implements OnInit {
  baseHref = "/tecnired.app";
  showInstallPrompt = false;
  private deferredPrompt: any;
  isDesktop = false;
  isOnline: any;
  isUpdateAvailable = false;

  constructor(
    private readonly network: NetworkService,
    private readonly swUpdate: SwUpdate,
    private readonly http: HttpClient
  ) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === "VERSION_READY") {
          this.isUpdateAvailable = true;
        }
      });
    }
  }
  updateApp() {
    window.location.reload();
  }
  ngOnInit() {
    this.isOnline = this.network.isOnline$;
    this.isDesktop = this.checkIfDesktop();

    // Register Protocol Handler
    // if ('registerProtocolHandler' in navigator) {
    //   navigator.registerProtocolHandler(
    //     'web+heromotoconnect', // Custom protocol scheme
    //     `${window.location.origin}/${this.baseHref}/splashscreen?url=%s`
    //   );
    //   console.log(`Protocol handler registered for  ${this.baseHref}/handlers?url=%s`);
    // } else {
    //   console.warn('registerProtocolHandler is not supported in this browser.');
    // }

    // if (localStorage.getItem('pwaInstalled')) {
    //   return; // Do nothing if already installed
    // }

    // Check if we need to show the reminder
    const remindMeAfter = localStorage.getItem("pwa_remindMeAfter");
    const today = moment().format("YYYY-MM-DD");

    if (!remindMeAfter || moment(today).isSameOrAfter(remindMeAfter)) {
      window.addEventListener("beforeinstallprompt", (event: any) => {
        event.preventDefault();
        this.deferredPrompt = event;
        this.showInstallPrompt = true; // Show custom UI
      });
    }
  }

  installPWA() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt(); // Show install prompt
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the PWA install");
          // localStorage.setItem('pwaInstalled', "true"); // Store user choice
        } else {
          console.log("User dismissed the PWA install");
          // Store user choice
        }
        this.deferredPrompt = null;
        this.showInstallPrompt = false; // Hide custom dialog
      });
    }
  }

  dismissPrompt() {
    this.showInstallPrompt = false;
    localStorage.setItem(
      "pwa_remindMeAfter",
      moment().add(10, "days").format("YYYY-MM-DD")
    );
  }

  private checkIfDesktop(): boolean {
    return window.innerWidth > 768; // Adjust based on device detection needs
  }
}
