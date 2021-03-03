import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import * as Platform from '@ionic/angular';
import * as SplashScreen from '@ionic-native/splash-screen/ngx';
import * as StatusBar from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';

export const createSpyObj = (
  baseName,
  methodNames
): { [key: string]: jest.Mocked<any> } => {
  let obj: any = {};

  for (let i = 0; i < methodNames.length; i++) {
    obj[methodNames[i]] = jest.fn();
  }

  return obj;
};
describe('AppComponent', () => {
  let statusBarSpy;
  let splashScreenSpy;
  let platformReadySpy;
  let platformSpy;

  beforeEach(async(() => {
    statusBarSpy = jest.spyOn(StatusBar, 'StatusBar');
    // statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jest.spyOn(SplashScreen, 'SplashScreen');
    // splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jest.spyOn(Platform, 'Platform');
    // platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    // expect(true).toBeTruthy();
  });

  xit('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });

  // TODO: add more tests!
});
