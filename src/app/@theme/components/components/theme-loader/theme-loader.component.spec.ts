import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeLoaderComponent } from './theme-loader.component';

describe('ThemeLoaderComponent', () => {
  let component: ThemeLoaderComponent;
  let fixture: ComponentFixture<ThemeLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
