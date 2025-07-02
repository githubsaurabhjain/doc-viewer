import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements AfterViewInit {
  // @ViewChild('sidePanel', { static: true }) sidePanel: ElementRef;
  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<any>();


  constructor(private readonly renderer: Renderer2) {

  }
  ngAfterViewInit() {
    this.handleBodyScroll();
  }
  ngOnChanges() {
    this.handleBodyScroll();
  }

  closeDrawer() {
    this.onClose.emit(true);
    this.enableBodyScroll();
  }
  handleBodyScroll() {
    if (this.isOpen) {
      this.disableBodyScroll();
    } else {
      this.enableBodyScroll();
    }
  }
  disableBodyScroll() {
    this.renderer.addClass(document.body, 'no-scroll');
  }

  enableBodyScroll() {
    this.renderer.removeClass(document.body, 'no-scroll');
  }
}
