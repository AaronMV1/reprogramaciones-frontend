import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsalComponent } from './msal.component';

describe('MsalComponent', () => {
  let component: MsalComponent;
  let fixture: ComponentFixture<MsalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MsalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
