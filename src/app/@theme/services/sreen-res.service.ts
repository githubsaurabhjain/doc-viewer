import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ScreenResolutionService {
    getFontSize(): string {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) return '12px';
        if (screenWidth < 1024) return '12px';
        if (screenWidth < 1280) return '12px';
        if (screenWidth < 1440) return '13px';
        return '14px';
    }
}
