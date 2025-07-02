import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { UtilsService } from "@theme/services/utils.service";
import { ApiService } from "src/app/service/api.service";

@Component({
  selector: "app-manage-documents",
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: "./manage-documents.component.html",
  styleUrl: "./manage-documents.component.scss",
})
export class ManageDocumentsComponent implements OnInit {
  public tableList: string[];
  public filteredTableList: string[];
  public documentForm: FormGroup;
  public selectedTableName: string;
  public tableStructureQuery: string;
  public tableIndex: any[];
  public tableInfo: any[];
  public ownerList: any[];
  public columnList: any[];
  public applicationList: any[];
  public moduleList: any[];
  public tableColumns: any[];
  public isLoading: boolean;
  public searchedTableName: string;
  public authorizeDb: string;
  public canEditDoc: boolean;
  constructor(
    private apiService: ApiService,
    private util: UtilsService,
    public fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.util.checkSession().then((data) => {
      console.log(data);
      if (data?.details) {
        const { dbIds, userType } = data?.details;
        this.authorizeDb = dbIds;
        this.getDataBaseList();
        this.getTableList();
        this.initializeForm();
      }
    });
  }

  initializeForm() {
    this.documentForm = this.fb.group({
      About: [],
      Owner: [],
      Pi: [],
      Modules: [],
      Applications: [],
      DataFlow: [],
    });
  }

  getDataBaseList() {
    this.apiService.getDatabaseList({
      req: {},
      onSuccess: (res) => {
        if (res.status) {
          console.log(res.output);
        }
      },
    });
  }

  getTableList() {
    this.util.spinner.start();
    this.apiService.getTables({
      req: {
        authorizeDb: this.authorizeDb,
      },
      onSuccess: (res: any) => {
        if (res.status) {
          this.util.spinner.stop();
          this.tableList = this.filteredTableList = res?.output;
        }
      },
      onFailure: (err: any) => {
        this.util.spinner.stop();
        this.util.toast(err?.message);
      },
    });
  }

  public onTableSelect(typeName) {
    this.isLoading = true;
    this.documentForm.reset();
    this.selectedTableName = typeName;
    this.util.spinner.start();
    this.apiService.getTablesData({
      req: {
        type: "table",
        typeName,
        authorizeDb: this.authorizeDb,
      },
      onSuccess: (res) => {
        if (res.status) {
          this.isLoading = false;
          this.util.spinner.stop();
          this.patchForm(res?.output);
        }
      },
      onFailure: (err) => {
        this.util.spinner.stop();
      },
    });
  }

  patchForm(data) {
    this.tableStructureQuery = data?.createTableQuery;
    this.tableIndex = data?.tableIndex;
    this.tableInfo = data?.tableInfo;
    for (let i of this.tableIndex) {
      this.documentForm.addControl(
        i.keyName,
        this.fb.control(data?.tableDoc?.Index?.[i.keyName]?.description)
      );
    }

    for (let i of this.tableInfo) {
      this.documentForm.addControl(
        "Column_" + i.Field,
        this.fb.control(data?.tableDoc?.Column?.[i.Field]?.description)
      );
    }
    const { Owners, Modules, Applications } = data?.autoCompleteOptions?.common;
    this.ownerList = Owners?.description?.split(",").map((itm) => ({
      text: itm,
      value: itm,
    }));
    this.moduleList = Modules?.description.split(",").map((itm) => ({
      text: itm,
      value: itm,
    }));
    this.applicationList = Applications?.description.split(",").map((itm) => ({
      text: itm,
      value: itm,
    }));
    const {
      About = null,
      DataFlow = null,
      Owner = null,
      Pi = null,
      Modules: module = null,
      Applications: application = null,
    } = data?.tableDoc?.Desc;

    this.columnList = this.tableInfo.map((columnInfo) => ({
      text: columnInfo.Field,
      value: columnInfo.Field,
    }));

    this.documentForm.patchValue({
      About: About?.description,
      DataFlow: DataFlow?.description,
      Owner: Owner?.description?.length ? Owner?.description?.split(",") : null,
      Pi: Pi?.description?.length ? Pi?.description?.split(",") : null,
      Modules: module?.description?.length
        ? module?.description.split(",")
        : null,
      Applications: application?.description?.length
        ? application?.description?.split(",")
        : null,
    });
  }

  onSave(name, fieldType) {
    this.cdRef.detectChanges();

    console.log(name, this.documentForm);
    let value;
    if (fieldType === "Column") {
      value = this.documentForm.value["Column_" + name];
    } else {
      value = this.documentForm.value[name];
      console.log(value, this.documentForm.controls["About"].value);
    }

    const reqObj = {
      type: "table",
      typeName: this.selectedTableName,
      action: "save",
      value,
      name,
      fieldType,
    };

    this.apiService.saveData({
      req: { ...reqObj, authorizeDb: this.authorizeDb },
      onSuccess: (res) => {
        if (res.status) this.util.toast("Data saved Successfully");
      },
      onFailure: (err) => {
        this.util.toast(err?.message);
      },
    });
  }

  public onSearch() {
    if (this.searchedTableName != "") {
      this.filteredTableList = this.tableList.filter((item) =>
        item?.toLowerCase().includes(this.searchedTableName)
      );
    } else {
      this.filteredTableList = this.tableList;
    }
  }
}
