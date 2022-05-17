import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallAsideComponent } from './aside.component';

describe('WallAsideComponent', () => {
  let component: WallAsideComponent;
  let fixture: ComponentFixture<WallAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallAsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
