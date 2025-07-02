import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
export type Slides = { title: string, description: string, image: string }[];
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  imports: [CommonModule]
})
export class SliderComponent implements OnInit {
  @Input() images: Slides = []; // Image list
  @Input() animationType: 'zoom' | 'flip' | 'ripple' = 'zoom'; // Default animation

  currentIndex = 0;

  ngOnInit() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 6000); // Change image every 6 seconds
  }
}
