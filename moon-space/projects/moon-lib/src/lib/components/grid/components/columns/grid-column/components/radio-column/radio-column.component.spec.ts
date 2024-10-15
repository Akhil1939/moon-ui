import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioColumnComponent } from './radio-column.component';

describe('RadioColumnComponent', () => {
  let component: RadioColumnComponent;
  let fixture: ComponentFixture<RadioColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioColumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadioColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
