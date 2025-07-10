import { AfterViewInit, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ApiService } from "./service/api.service";
import { ContentComponent } from "./content/content.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, ContentComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "Doc Viewer";

  print() {
    document.addEventListener("paged-rendered", () => {
      setTimeout(() => window.print(), 100); // let browser layout stabilize
    });
  }
}
