import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TermsycPage } from './termsyc.page';

describe('TermsycPage', () => {
  let component: TermsycPage;
  let fixture: ComponentFixture<TermsycPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsycPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TermsycPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
