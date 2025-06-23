import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNameTakenComponent } from './item-name-taken.component';

describe('ItemNameTakenComponent', () => {
  let component: ItemNameTakenComponent;
  let fixture: ComponentFixture<ItemNameTakenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemNameTakenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemNameTakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
