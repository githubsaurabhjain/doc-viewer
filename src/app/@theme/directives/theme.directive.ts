import { Directive, Input, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { DetectScrollDirective } from './detect-scroll.directive';

@Directive({
  selector: '[appTheme]',
  standalone: true,
  providers: [DetectScrollDirective]
})
export class ThemeDirective implements OnInit, OnDestroy {
  @Input() type: 'scrollDetection' | 'otherDirective';
  private scrollDetection: DetectScrollDirective | null = null
  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2,
  ) { }

  ngOnInit() {
    console.log('ThemeDirective', this.type);
    switch (this.type) {
      case 'scrollDetection':
        this.scrollDetection = new DetectScrollDirective(this.el);
        break;
      case 'otherDirective':
        // Do something
        break;
      default:
        break;
    }
  }

  ngOnDestroy() {
    switch (this.type) {
      case 'scrollDetection':
        this.scrollDetection = null
        break;
      case 'otherDirective':
        // Do something
        break;
      default:
        break;
    }
  }
}
