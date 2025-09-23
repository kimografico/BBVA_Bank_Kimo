import { Router } from '@vaadin/router';

export function initRouter(outlet, loader) {
  const router = new Router(outlet);

  router.setRoutes([
    {
      path: '/',
      component: 'accounts-page',
      action: async () => {
        const localLoader = loader;
        localLoader.active = true;

        // Retraso para ver que funciona el loader.
        // TODO: Eliminar despues de la demo
        await new Promise(resolve => {
          setTimeout(resolve, 1000);
        });

        await import('./pages/accounts.js');

        if (localLoader) {
          localLoader.active = false;
        }
      },
      onBeforeEnter: () => {
        const localLoader = loader;
        if (localLoader) localLoader.active = true;
      },
      onAfterEnter: () => {
        const localLoader = loader;
        if (localLoader) localLoader.active = false;
      },
    },

    {
      path: '/accounts',
      component: 'accounts-page',
      action: async () => {
        await import('./pages/accounts.js');
      },
      onBeforeEnter: () => {
        const localLoader = loader;
        if (localLoader) localLoader.active = true;
      },
      onAfterEnter: () => {
        const localLoader = loader;
        if (localLoader) localLoader.active = false;
      },
    },

    {
      path: '/accounts/:id',
      component: 'account-detail-page',
      action: async () => {
        await import('./pages/account-detail.js');
      },
      onBeforeEnter: () => {
        const localLoader = loader;
        if (localLoader) localLoader.active = true;
      },
      onAfterEnter: () => {
        const localLoader = loader;
        if (localLoader) localLoader.active = false;
      },
    },

    {
      path: '(.*)',
      component: 'page-not-found',
      action: async () => {
        await import('./pages/404.js');
      },
      onBeforeEnter: () => {
        const localLoader = loader;
        if (localLoader) localLoader.active = true;
      },
      onAfterEnter: () => {
        const localLoader = loader;
        if (localLoader) localLoader.active = false;
      },
    },
  ]);

  return router;
}
