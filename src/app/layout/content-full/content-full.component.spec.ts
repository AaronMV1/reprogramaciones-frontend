import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentFullComponent } from './content-full.component';

describe('ContentFullComponent', () => {
  let component: ContentFullComponent;
  let fixture: ComponentFixture<ContentFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentFullComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
