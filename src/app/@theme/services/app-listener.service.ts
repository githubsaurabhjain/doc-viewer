import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface AppState {
    loader?: boolean; // Global loader state
    toast?: { message: string; type: 'success' | 'error' | 'info' }; // Toast messages
    [key: string]: any; // Allow adding more states dynamically
}

@Injectable({
    providedIn: 'root',
})
export class AppListenerService {
    private readonly appStateSubject = new BehaviorSubject<AppState>({});
    appState$ = this.appStateSubject.asObservable();

    /** ✅ Set a key-value state dynamically */
    set(key: keyof AppState, value: any): void {
        const currentState = this.appStateSubject.value;
        this.appStateSubject.next({ ...currentState, [key]: value });
    }

    /** ✅ Get a specific state as an observable */
    watch<T>(key: keyof AppState): Observable<T> {
        return new Observable<T>((observer) => {
            this.appState$.subscribe((state) => {
                observer.next(state[key] as T);
            });
        });
    }

    /** ✅ Get a specific state */
    get<T>(key: keyof AppState): T {
        return this.appStateSubject.value[key] as T;
    }

    /** ✅ Reset a specific state */
    reset(key: keyof AppState): void {
        const currentState = this.appStateSubject.value;
        const newState = { ...currentState };
        delete newState[key];
        this.appStateSubject.next(newState);
    }

    /** ✅ Reset all states */
    resetAll(): void {
        this.appStateSubject.next({});
    }
}
