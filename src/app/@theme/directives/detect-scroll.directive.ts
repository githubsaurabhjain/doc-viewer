import { Directive, ElementRef, Input, Output, EventEmitter, AfterViewInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollDetection]',
  standalone: true,
})
export class DetectScrollDirective implements AfterViewInit {
  @Output() vertical = new EventEmitter<boolean>();
  @Output() horizontal = new EventEmitter<boolean>();

  constructor(private readonly el: ElementRef) {
    console.log('DetectScrollDirective');
    this.checkScroll();
  }

  ngAfterViewInit() {
    setTimeout(() => this.checkScroll(), 500); // Ensure DOM is ready
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScroll(); // Re-check on window resize
  }

  @HostListener('scroll', ['$event'])
  onScroll() {
    this.checkScroll();
  }

  private checkScroll() {
    console.log('DetectScrollDirective', this);
    const element = this.el.nativeElement;
    const hasHorizontalScroll = element.scrollWidth > element.clientWidth;
    const hasVerticalScroll = element.scrollHeight > element.clientHeight;
    this.horizontal.emit(hasHorizontalScroll);
    this.vertical.emit(hasVerticalScroll);
  }
}
