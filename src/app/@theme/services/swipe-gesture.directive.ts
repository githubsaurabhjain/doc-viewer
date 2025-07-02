import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[swipeGesture]'
})
export class SwipeGestureDirective {
  private touchStartX = 0;
  private touchEndX = 0;
  private touchStartY = 0;
  private touchEndY = 0;
  private readonly swipeThreshold = 50; // Minimum swipe distance

  @Output() swipeRight = new EventEmitter<void>();
  @Output() swipeLeft = new EventEmitter<void>();

  constructor(private el: ElementRef) { }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (this.isInsideScrollableDiv(event.target as HTMLElement)) {
      return; // Ignore swipes inside scrollable areas
    }
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    if (this.isInsideScrollableDiv(event.target as HTMLElement)) {
      return; // Ignore swipes inside scrollable areas
    }
    this.touchEndX = event.changedTouches[0].clientX;
    this.touchEndY = event.changedTouches[0].clientY;
    this.handleSwipeGesture();
  }

  private handleSwipeGesture() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    // Check for horizontal swipes
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > this.swipeThreshold) {
        this.swipeRight.emit(); // Swipe Right
      } else if (deltaX < -this.swipeThreshold) {
        this.swipeLeft.emit(); // Swipe Left
      }
    }
  }

  private isInsideScrollableDiv(element: HTMLElement): boolean {
    while (element !== document.body) {
      if (element.scrollWidth > element.clientWidth) {
        return true; // Found a scrollable container
      }
      element = element.parentElement;
    }
    return false;
  }
}
