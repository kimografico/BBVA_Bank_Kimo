import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/bank-kimo.js';

describe('BankKimo', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<bank-kimo></bank-kimo>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
