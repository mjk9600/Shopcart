import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyheaderComponent } from './bodyheader.component';

describe('BodyheaderComponent', () => {
  let component: BodyheaderComponent;
  let fixture: ComponentFixture<BodyheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyheaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
