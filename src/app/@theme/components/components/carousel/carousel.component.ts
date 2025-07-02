import { Component, Input } from "@angular/core";
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
export type CarouselSlides = { title: string, description: string, image: string }[];
@Component({
  selector: "carousel",
  imports: [NgbCarouselModule],
  templateUrl: "./carousel.component.html",
  styleUrl: "./carousel.component.scss",
})
export class CarouselComponent {
  @Input() list: any[];
  @Input() images: CarouselSlides = [1, 2, 3].map((n) => {
    return {
      title: `Slide ${n}`,
      description: `Description ${n}`,
      image: `assets/slider/${n}.png`,
    };
  });
}
