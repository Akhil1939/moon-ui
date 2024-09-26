import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonDropdownComponent } from './moon-dropdown.component';

describe('MoonDropdownComponent', () => {
  let component: MoonDropdownComponent;
  let fixture: ComponentFixture<MoonDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoonDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoonDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
