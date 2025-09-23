import { expect } from '@open-wc/testing';
import { initRouter } from '../src/router.js';
import '../src/pages/404.js';

describe('Router', () => {
  let outlet;
  let loader;
  let router;
  let routes;

  beforeEach(() => {
    outlet = document.createElement('div');
    loader = { active: false };

    const result = initRouter(outlet, loader);
    router = result.router;
    routes = result.routes;
  });

  it('should configure the router correctly', () => {
    expect(router).to.exist;
    expect(routes).to.be.an('array');
  });

  it('should have a home page as the first route', () => {
    expect(routes[0].path).to.equal('/');
  });

  it('should have a 404 as the last route', () => {
    expect(routes[routes.length - 1].path).to.equal('(.*)');
    expect(routes[routes.length - 1].component).to.equal('page-not-found');
  });

  it('should deactivate the loader when a page is loaded', async () => {
    await router.render('/');
    expect(loader.active).to.be.false;
  });

  it('should show the loader when a page is not loaded yet', async () => {
    const homeRoute = routes.find(route => route.path === '/');
    homeRoute.onBeforeEnter();
    expect(loader.active).to.be.true;
  });

  it('should execute the action block for each route except 404', async () => {
    for (const route of routes) {
      if (route.action && route.path !== '(.*)') {
        // eslint-disable-next-line no-await-in-loop
        await router.render(route.path);
        expect(loader.active).to.be.false;
      }
    }
  });

  it('should execute the action block for 404 page', async () => {
    await router.render('/unknown-route');
    expect(loader.active).to.be.false;
    expect(outlet.firstElementChild.tagName).to.equal('PAGE-NOT-FOUND');
  });
});
