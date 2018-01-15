import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesContactsComponent } from './favorites-contacts.component';

describe('FavoritesContactsComponent', () => {
  let component: FavoritesContactsComponent;
  let fixture: ComponentFixture<FavoritesContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
