import { Component, inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";

@Component({
  selector: "app-confirmation-modal",
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogModule,
  ],
  templateUrl: "./confirmation-modal.component.html",
  styleUrl: "./confirmation-modal.component.scss",
})
export class ConfirmationModalComponent {
  public readonly dialogRef = inject(MatDialogRef<any>);
  public data = inject(MAT_DIALOG_DATA);

  public close(val) {
    this.dialogRef.close(val);
  }
}
