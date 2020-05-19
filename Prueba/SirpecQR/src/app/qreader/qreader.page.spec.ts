import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QreaderPage } from './qreader.page';

describe('QreaderPage', () => {
  let component: QreaderPage;
  let fixture: ComponentFixture<QreaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QreaderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QreaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
