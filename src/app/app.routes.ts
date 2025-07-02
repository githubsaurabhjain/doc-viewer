import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "./@theme/layouts/auth-layout/auth-layout.component";
import { DashboardLayoutComponent } from "@theme/layouts/dashboard-layout/dashboard-layout.component";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "splashscreen",
    pathMatch: "full",
  },
  {
    path: "splashscreen",
    loadComponent: () =>
      import("./pages/common/splashscreen/splashscreen.component").then(
        (m) => m.SplashscreenComponent
      ),
  },
  {
    path: "",
    component: AuthLayoutComponent,
    loadChildren: () => [
      // {
      //   path: "get-started",
      //   loadComponent: () =>
      //     import("./pages/auth/get-started/get-started.component").then(
      //       (m) => m.GetStartedComponent
      //     ),
      // },
      // {
      //   path: "verification",
      //   loadComponent: () =>
      //     import("./pages/auth/verification/verification.component").then(
      //       (m) => m.VerificationComponent
      //     ),
      // },
    ],
    //
  },
  {
    path: "dashboard",
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () => [
      {
        path: "",
        redirectTo: "manage-documents",
        pathMatch: "full",
      },
      {
        path: "manage-documents",
        loadComponent: () =>
          import(
            "./pages/dashboard/manage-documents/manage-documents.component"
          ).then((m) => m.ManageDocumentsComponent),
      },
      {
        path: "**",
        loadComponent: () =>
          import("./@theme/error/not-found/not-found.component").then(
            (m) => m.NotFoundComponent
          ),
      },
    ],
  },
];
