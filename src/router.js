import { Router } from '@vaadin/router';

export function initRouter(outlet, loader) {
  const localLoader = loader;
  const activateLoader = () => {
    if (localLoader) localLoader.active = true;
  };
  const deactivateLoader = () => {
    if (localLoader) localLoader.active = false;
  };

  const routes = [
    {
      path: '/',
      component: 'home-page',
      action: async () => {
        activateLoader();

        // Retraso para ver que funciona el loader.
        // TODO: Eliminar despues de la demo
        await new Promise(resolve => {
          setTimeout(resolve, 1000);
        });

        await import('./pages/homepage.js');
        deactivateLoader();
      },
      onBeforeEnter: activateLoader,
      onAfterEnter: deactivateLoader,
    },

    {
      path: '/user',
      component: 'user-profile-page',
      action: async () => {
        activateLoader();
        await import('./pages/user-profile.js');
        deactivateLoader();
      },
      onBeforeEnter: activateLoader,
      onAfterEnter: deactivateLoader,
    },

    {
      path: '/accounts',
      component: 'accounts-page',
      action: async () => {
        activateLoader();
        await import('./pages/accounts.js');
        deactivateLoader();
      },
      onBeforeEnter: activateLoader,
      onAfterEnter: deactivateLoader,
    },

    {
      path: '/accounts/:id',
      component: 'account-detail-page',
      action: async () => {
        activateLoader();
        await import('./pages/account-detail.js');
        deactivateLoader();
      },
      onBeforeEnter: activateLoader,
      onAfterEnter: deactivateLoader,
    },

    {
      path: '(.*)',
      component: 'page-not-found',
      action: async () => {
        activateLoader();
        await import('./pages/404.js');
        deactivateLoader();
      },
      onBeforeEnter: activateLoader,
      onAfterEnter: deactivateLoader,
    },
  ];

  const router = new Router(outlet);
  router.setRoutes(routes);

  return { router, routes };
}
