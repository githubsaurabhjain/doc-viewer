import { Component } from "@angular/core";
import { ApiService } from "../service/api.service";

@Component({
  selector: "app-content",
  imports: [],
  templateUrl: "./content.component.html",
  styleUrl: "./content.component.scss",
})
export class ContentComponent {
  public isLoading: boolean;
  public tables: string[];
  public tableData: any[];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getTables();
    this.getTableData();
  }

  public getTableData() {
    this.apiService.getTablesData({
      req: {
        authorizeDb: "connect",
      },
      onSuccess: (res) => {
        if (res.status) {
          console.log(res.output);
          this.tableData = res?.output;
          this.isLoading = false;
          this.loadPagedJsPolyfill();
        }
      },
      onFailure: (err) => {
        this.isLoading = false;
      },
    });
  }

  getTables() {
    this.isLoading = true;
    this.apiService.getTables({
      req: { authorizeDb: "connect" },
      onSuccess: (res) => {
        if (res?.status) {
          this.tables = res?.output;
        }
      },
      onFailure: (err) => {},
    });
  }

  loadPagedJsPolyfill() {
    const node = document.createElement("script");
    node.src = "https://unpkg.com/pagedjs/dist/paged.polyfill.js";
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }

  printDocument() {
    document.addEventListener(
      "paged-rendered",
      () => {
        setTimeout(() => window.print(), 100);
      },
      { once: true }
    );
  }
}
