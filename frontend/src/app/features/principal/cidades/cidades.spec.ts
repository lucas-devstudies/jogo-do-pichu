import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cidades } from './cidades';

describe('Cidades', () => {
  let component: Cidades;
  let fixture: ComponentFixture<Cidades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cidades]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cidades);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
