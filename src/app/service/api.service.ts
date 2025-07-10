import { Injectable } from "@angular/core";
import { HttpService } from "../@theme/services/http.service";
import { UtilsService } from "../@theme/services/utils.service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  config = environment;
  header = {
    devKey: environment.devKey,
    "Content-Type": "application/json",
  };

  // userId: string;
  constructor(private readonly http: HttpService, private util: UtilsService) {
    const session = localStorage.getItem("session");
    let tokenKey = "";

    if (session) {
      const sessionObject = JSON.parse(session);
      if (sessionObject["token"]) {
        tokenKey = sessionObject["token"];
      }
    }

    // this.util.checkSession().then((res) => {
    //   if (res && res?.details && res?.details?.userID)
    //     this.userId = res?.details?.userID;
    // });

    this.setRequestHeaders(tokenKey);
  }

  public setRequestHeaders(tokenKey = "") {
    this.http.set({
      baseurl: this.config.apiUrl + this.config.baseUrl,
      body: {},
      header: { ...this.header, tokenKey },
    });
  }

  public getGoogleOauthRequestId(param) {
    return this.http.apiCall(
      {
        url: `auth/google`,
        body: {
          appId: param?.req?.appId,
          requestScope: param?.req?.requestScope,
          callBackUrl: param?.req?.callBackUrl,
        },
      },
      param
    );
  }

  verifySession(param: any) {
    return this.http.apiCall(
      {
        url: `accounts/verifySession`,
        body: {},
      },
      param
    );
  }

  verifyToken(param: any) {
    return this.http.apiCall(
      {
        url: `account/verifyOauthToken`,
        body: { idToken: param?.req?.idToken },
      },
      param
    );
  }

  getOauthUserDetails(param: any) {
    return this.http.apiCall(
      {
        url: `accounts/oauthUserDetails`,
        body: { requestId: param?.req?.requestId },
      },
      param
    );
  }

  generateOtp(param: any) {
    return this.http.apiCall(
      {
        url: `accounts/generateOtp`,
        body: {
          email: param?.req?.email,
          verificationMethod: param?.req?.verificationMethod,
        },
      },
      param
    );
  }

  logout(param: any) {
    return this.http.apiCall(
      {
        url: `accounts/logout`,
        body: {},
      },
      param
    );
  }

  public verifyOtp(param: any) {
    return this.http.apiCall(
      {
        url: `accounts/verifyOTP`,
        body: { token: param?.req?.token, otp: param?.req?.otp },
      },
      param
    );
  }

  public getTables(param: any) {
    return this.http.apiCall(
      {
        url: `document/list`,
        body: {
          authorizeDb: param?.req?.authorizeDb,
        },
      },
      param
    );
  }

  public getTablesData(param: any) {
    return this.http.apiCall(
      {
        url: `document/list/masterTableData`,
        body: {
          authorizeDb: param?.req?.authorizeDb,
        },
      },
      param
    );
  }

  public saveData(param: any) {
    return this.http.apiCall(
      {
        url: `document/update`,
        body: {
          type: param?.req?.type,
          typeName: param?.req?.typeName,
          action: param?.req?.action,
          name: param?.req?.name,
          value: param?.req?.value,
          fieldType: param?.req?.fieldType,
          authorizeDb: param?.req?.authorizeDb,
        },
      },
      param
    );
  }

  public getDatabaseList(param: any) {
    return this.http.apiCall(
      {
        url: `document/list/database`,
        body: {
          // authorizeDb: param?.req?.authorizeDb,
        },
      },
      param
    );
  }
}
