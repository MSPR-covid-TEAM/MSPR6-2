import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropagationComponent } from './propagation.component';

describe('PropagationComponent', () => {
  let component: PropagationComponent;
  let fixture: ComponentFixture<PropagationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropagationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropagationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
