'use strict';

import bootstrap from "@tblab/ella-spa-core/lib/bootstrap";
import session from '@tblab/ella-spa-core/lib/session';
import * as sessionModule from "@tblab/ella-spa-core/lib/session/cognito";
import App from './app.svelte';
import LoadingScreen, { loading } from "./widget/loading-screen.svelte";

try {
  let loadingScreen = document.body.querySelector('#loading') || document.body.appendChild(document.createElement('div'));
  loadingScreen.innerHTML = '';
  new LoadingScreen({
    target: loadingScreen
  });
  loading.set(true);

  /** @typeof {import(@tblab/ella-spa-core/lib/bootstrap).CoreConf} */
  await bootstrap({
    envDef: import.meta.env.VITE_ENV_URL,
    session: {
      module: sessionModule,
      tokenStore: 'local'
    }
  });
  if(session.isAnonymous()) {
    session.authenticate();
  } else {
    let target = document.querySelector('#app') || document.body.appendChild(document.createElement('div'));
    target.innerHTML = '';
    new App({
      target: target
    });
    loading.set(false);
  }
} catch(e) {
  console.error('[main] fail to initialize app.', e);
  alert('fail to initialize app.');
}