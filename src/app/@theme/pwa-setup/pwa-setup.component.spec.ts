import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwaSetupComponent } from './pwa-setup.component';

describe('PwaSetupComponent', () => {
  let component: PwaSetupComponent;
  let fixture: ComponentFixture<PwaSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PwaSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PwaSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
