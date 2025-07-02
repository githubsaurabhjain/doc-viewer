import { trigger, transition, style, animate } from "@angular/animations";
import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";
import { CommonModule } from "@angular/common";
import { Component, Inject, Input } from "@angular/core";

@Component({
  selector: "app-alert",
  imports: [CommonModule],
  templateUrl: "./alert.component.html",
  styleUrl: "./alert.component.scss",
  animations: [
    trigger("slideIn", [
      transition(":enter", [
        style({ transform: "translateY(100%)", opacity: 0 }),
        animate(
          "300ms ease-out",
          style({ transform: "translateY(0)", opacity: 1 })
        ),
      ]),
      transition(":leave", [
        animate(
          "200ms ease-in",
          style({ transform: "translateY(100%)", opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class AlertComponent {
  constructor(
    public dialogRef: DialogRef<AlertComponent>,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  onButtonClick(button: any): void {
    if (button.handler) {
      button.handler();
    }
    this.dialogRef.close();
  }
}
