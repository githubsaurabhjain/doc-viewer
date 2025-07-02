import { trigger, transition, style, animate, keyframes } from '@angular/animations';

export const pageAnimations = {
    FadeSlide: trigger('routeAnimations', [transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ])]),
    BounceIn: trigger('routeAnimations', [transition('* <=> *', [
        animate(
            '600ms ease-in-out',
            keyframes([
                style({ opacity: 0, transform: 'scale(0.5)', offset: 0 }),
                style({ opacity: 1, transform: 'scale(1.1)', offset: 0.5 }),
                style({ opacity: 1, transform: 'scale(1)', offset: 1 })
            ])
        )
    ])]),
    ZoomIn: trigger('routeAnimations', [transition('* <=> *', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
    ])]),
    SlideIn: trigger('routeAnimations', [transition('* <=> *', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('400ms ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))
    ])]),
    Flip: trigger('routeAnimations', [transition('* <=> *', [
        animate(
            '500ms ease-out',
            keyframes([
                style({ opacity: 0, transform: 'rotateY(90deg)', offset: 0 }),
                style({ opacity: 1, transform: 'rotateY(0deg)', offset: 1 })
            ])
        )
    ])])
};


