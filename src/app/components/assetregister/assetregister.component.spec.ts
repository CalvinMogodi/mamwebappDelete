import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetregisterComponent } from './assetregister.component';

describe('AssetregisterComponent', () => {
  let component: AssetregisterComponent;
  let fixture: ComponentFixture<AssetregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
