import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallCreatePostComponent } from './create-post.component';

describe('CreerPublicationComponent', () => {
  let component: WallCreatePostComponent;
  let fixture: ComponentFixture<WallCreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallCreatePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
