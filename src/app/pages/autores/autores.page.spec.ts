import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutoresPage } from './autores.page';

describe('AutoresPage', () => {
  let component: AutoresPage;
  let fixture: ComponentFixture<AutoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
