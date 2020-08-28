import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApresentandoPage } from './apresentando.page';

describe('ApresentandoPage', () => {
  let component: ApresentandoPage;
  let fixture: ComponentFixture<ApresentandoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApresentandoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApresentandoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
