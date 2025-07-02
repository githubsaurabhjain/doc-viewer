import { Directive, ElementRef, Renderer2, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[sticky]'
})
export class StickyDirective implements AfterViewInit {
  @Input() targetId?: string; // Optional: Target element ID
  @Input() stickyOffset: number = 0; // Offset before sticking

  private observer!: IntersectionObserver;
  private targetElement?: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    if (this.targetId) {
      this.targetElement = document.getElementById(this.targetId);
      if (!this.targetElement) {
        console.warn(`Sticky Directive: No element found with ID '${this.targetId}'`);
        return;
      }
    }

    this.initObserver();
  }

  private initObserver() {
    const threshold = this.stickyOffset / window.innerHeight; // Convert pixels to percentage of viewport

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            this.setSticky(true);
          } else {
            this.setSticky(false);
          }
        });
      },
      {
        root: null, // Observes in the viewport
        threshold: threshold || 0.1, // Default to 10% visibility before triggering
      }
    );

    if (this.targetElement) {
      this.observer.observe(this.targetElement);
    } else {
      this.observer.observe(this.el.nativeElement);
    }
  }

  private setSticky(sticky: boolean) {
    if (sticky) {
      this.renderer.addClass(this.el.nativeElement, 'sticky');
      this.renderer.setStyle(this.el.nativeElement, 'position', 'fixed');
      this.renderer.setStyle(this.el.nativeElement, 'top', `${this.stickyOffset}px`);
      this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
      this.renderer.setStyle(this.el.nativeElement, 'z-index', '1000');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'sticky');
      this.renderer.removeStyle(this.el.nativeElement, 'position');
      this.renderer.removeStyle(this.el.nativeElement, 'top');
    }
  }
}
