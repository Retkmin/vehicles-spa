import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { TranslateService } from '@ngx-translate/core';

bootstrapApplication(App, appConfig)
  .then(appRef => {
    const translate = appRef.injector.get(TranslateService);
    translate.use('en');
  })
  .catch((err) => console.error(err));
