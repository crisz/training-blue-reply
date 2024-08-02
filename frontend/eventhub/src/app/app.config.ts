import { ApplicationConfig, NgModule, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { UserState } from '../state/user-state/user.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { EventState } from '../state/event-state/event.state';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(),importProvidersFrom(NgxsModule.forRoot([UserState,EventState]),NgxsReduxDevtoolsPluginModule.forRoot({ disabled: false })),] //va messo qui il reduxdevtoolmodule
};

