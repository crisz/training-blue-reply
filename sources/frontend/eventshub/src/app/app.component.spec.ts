import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
    });
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have eventshub as title', () => {
    expect(component.title()).toBeDefined();
    expect(component.title()).toEqual('eventshub');
  });

  it('should render the router outlet', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });
});