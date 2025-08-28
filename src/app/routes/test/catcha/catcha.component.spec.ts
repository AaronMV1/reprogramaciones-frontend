import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchaComponent } from './catcha.component';

describe('CatchaComponent', () => {
  let component: CatchaComponent;
  let fixture: ComponentFixture<CatchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatchaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
