import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterboxComponent } from './filterbox.component';

describe('FilterboxComponent', () => {
  let component: FilterboxComponent;
  let fixture: ComponentFixture<FilterboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
