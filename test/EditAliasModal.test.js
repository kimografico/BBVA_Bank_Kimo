import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import Sinon from 'sinon';
import { EditAliasModal } from '../src/components/EditAliasModal.js';

describe('EditAliasModal', () => {
  it('should render the component', async () => {
    const component = await fixture(
      html`<bk-edit-alias-modal></bk-edit-alias-modal>`,
    );
    expect(component).to.exist;
  });

  it('should render the modal, with input and both buttons', async () => {
    const component = await fixture(
      html`<bk-edit-alias-modal></bk-edit-alias-modal>`,
    );
    const input = component.shadowRoot.querySelector('input'); // hay que usar shadowroot para ver lo que hay dentro
    const buttons = component.shadowRoot.querySelectorAll('button');
    expect(input).to.exist;
    expect(buttons).to.be.lengthOf(2);
  });

  it('should start with the modal closed', async () => {
    const component = await fixture(
      html`<bk-edit-alias-modal></bk-edit-alias-modal>`,
    );
    const dialog = component.shadowRoot.querySelector('dialog');
    expect(dialog.open).to.be.false;
  });

  it('should open the modal when openModal() is called', async () => {
    const component = await fixture(
      html`<bk-edit-alias-modal></bk-edit-alias-modal>`,
    );
    const dialog = component.shadowRoot.querySelector('dialog');
    expect(dialog.open).to.be.false;

    component.openModal('1', 'Test Alias', []);
    expect(dialog.open).to.be.true;
  });

  it('should update editingAlias when the input is filled', async () => {
    const component = await fixture(
      html`<bk-edit-alias-modal></bk-edit-alias-modal>`,
    );
    component.openModal('1', 'Test Alias', []);
    const input = component.shadowRoot.querySelector('input');
    input.value = 'Nuevo alias';
    input.dispatchEvent(new Event('input'));
    expect(component.editingAlias).to.equal('Nuevo alias');
  });

  it('should send a custom save-alias event and close the modal when CAMBIAR is clicked', async () => {
    const component = await fixture(
      html`<bk-edit-alias-modal></bk-edit-alias-modal>`,
    );
    component.openModal('1', 'Test Alias', []);

    const listener = oneEvent(component, 'save-alias'); // One event escucha solo una llamada
    const dialog = component.shadowRoot.querySelector('dialog');
    const button = component.shadowRoot.querySelector('#saveBtn');

    button.click();
    const eventClick = await listener;

    expect(eventClick.detail).to.deep.equal({ id: '1', alias: 'Test Alias' });
    expect(dialog.open).to.be.false;
  });

  it('should close the modal when CANCELAR is clicked', async () => {
    const closeSpy = Sinon.spy(EditAliasModal.prototype, '_close');
    // Creamos un espia del metodo _close para ver que hace.
    // Lo hacemos antes del fixture, porque si no el metodo original ya tiene un listener y no se actualiza

    const component = await fixture(
      html`<bk-edit-alias-modal></bk-edit-alias-modal>`,
    );
    component.openModal('1', 'Test Alias', []);
    const dialog = component.shadowRoot.querySelector('dialog');
    const button = component.shadowRoot.querySelector('#closeBtn');
    button.click();

    expect(closeSpy.calledOnce).to.be.true; // Este no funciona
    expect(dialog.open).to.be.false; // Este si que funciona

    closeSpy.restore(); // Restauramos el método para que no afecte a otros tests
  });
});
