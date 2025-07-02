
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppListenerService } from '@theme/services/app-listener.service';

export type LoaderType = 'spinner' | 'pulse' | 'dots' | 'ripple';
@Component({
  selector: 'app-theme-loader',
  imports: [CommonModule],
  templateUrl: './theme-loader.component.html',
  styleUrls: ['./theme-loader.component.scss']
})

export class ThemeLoaderComponent {
  isLoading = false;
  loaderType: LoaderType = 'spinner';
  constructor(private readonly app: AppListenerService) {
    this.app.watch('loader').subscribe((res: boolean) => {
      this.isLoading = res;
    });
  }
}
