import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonLibComponent } from './moon-lib.component';

describe('MoonLibComponent', () => {
  let component: MoonLibComponent;
  let fixture: ComponentFixture<MoonLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoonLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoonLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
