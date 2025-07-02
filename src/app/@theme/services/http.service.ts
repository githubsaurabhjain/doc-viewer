import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UtilsService } from "./utils.service";
export interface ApiRequest {
  url?: string;
  body?: any;
  header?: any;
  responseType?: any;
}

@Injectable({
  providedIn: "root",
})
export class HttpService {
  private __requestInterface = {
    req: {},
    onSuccess: (res: any) => {},
    onFailure: (err: any) => {
      this.util.toast(err?.message);
      console.log(err);
      this.util.spinner.stop();
    },
  };
  private __responseInterface = (status: any, res: any, req: any) => {
    // debugger
    this.util.spinner.stop();
    if (status === true) {
      if (res["status"] == true) {
        req.onSuccess(res);
        return;
      } else if (res["status"] == false) {
        req.onFailure(res);
      } else {
        req.onFailure(res.error);
      }
      return;
    } else {
      switch (res?.status) {
        case undefined:
          this.util.toast(res?.statusText);
          break;
        case 403:
        case 401:
          this.util.toast(res?.error.message);
          this.util
            .destroySession()
            .then((i) => {
              this.util.toast(res?.error.message);
              this.util.href("/get-started");
            })
            .catch((e) => {
              this.util.toast(
                "Logout Failed, Please close the browser to logout"
              );
            });
          break;
        default:
          req.onFailure(res.error);
          break;
      }
    }
  };

  private __responseInterfaceForBlob = (status: any, res: any, req: any) => {
    req.onSuccess(res);
  };

  private __defaultApiParam = {
    baseurl: "",
    header: {
      "Content-Type": "application/json",
    },
  };
  constructor(
    private readonly http: HttpClient,
    private readonly util: UtilsService
  ) {}
  private httpCall(req: any, response: any = {}) {
    let p = { ...this.__defaultApiParam, ...req };
    this.http
      .request("POST", `${p.baseurl}/${p.url}`, {
        body: p?.body,
        headers: p?.header,
        withCredentials: false,
        responseType: req?.responseType || "json",
      })
      .subscribe(
        (res) => {
          response(true, res);
        },
        (err) => {
          console.log("error", err);
          response(false, err);
        }
      ); //.unsubscribe();
  }
  set(param: any) {
    this.__defaultApiParam = { ...this.__defaultApiParam, ...param };
  }

  apiCall(apiParam: ApiRequest, param: any) {
    let __p = { ...this.__requestInterface, ...param };
    let __apiParam = { ...this.__defaultApiParam, ...apiParam };
    return this.httpCall(__apiParam, (status: boolean, res: any) => {
      return __apiParam.responseType !== "blob"
        ? this.__responseInterface(status, res, __p)
        : this.__responseInterfaceForBlob(status, res, __p);
    });
  }
}
