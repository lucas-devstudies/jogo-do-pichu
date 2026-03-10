import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResults } from './modal-results';

describe('ModalResults', () => {
  let component: ModalResults;
  let fixture: ComponentFixture<ModalResults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalResults]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalResults);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
