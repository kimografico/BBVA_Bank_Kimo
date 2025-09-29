import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/UserProfile.js';
import Sinon from 'sinon';
import { UserService } from '../src/services/UserService.js';
import { ValidationService } from '../src/services/ValidationService.js';

describe('UserProfile.js', () => {
  const mockUser = {
    id: 1,
    name: 'Nombre',
    surname: 'Apellido',
    email: 'email@dominio.es',
    address: 'Direccion',
    phone: '000000000',
    avatar: 'assets/johndoe.jpg',
  };

  beforeEach(() => {
    // Crear una copia nueva en cada test para evitar mutaciones
    Sinon.stub(UserService, 'getUser').returns({ ...mockUser });
  });

  afterEach(() => {
    Sinon.restore();
  });

  it('should render the component', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);
    expect(component).to.exist;
  });

  it('should load user data on initialization', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);
    expect(component.user).to.deep.equal(mockUser);
  });

  it('should update user property when input changes', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);

    const nameInput = component.shadowRoot.querySelector('input[name="name"]');

    nameInput.value = 'Kimo';
    nameInput.dispatchEvent(new Event('input'));

    expect(component.user.name).to.equal('Kimo');
  });

  it('should return false when no changes are made', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);

    const nameInput = component.shadowRoot.querySelector('input[name="name"]');

    nameInput.value = 'Nombre';
    nameInput.dispatchEvent(new Event('input'));

    expect(component._hasChanges()).to.be.false;
  });

  it('should return true when name is changed', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);

    const nameInput = component.shadowRoot.querySelector('input[name="name"]');

    nameInput.value = 'Kimo';
    nameInput.dispatchEvent(new Event('input'));

    expect(component._hasChanges()).to.be.true;
  });

  it('should return false when there are no errors', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);
    expect(component._hasErrors()).to.be.false;
  });

  it('should return true when there are validation errors', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);

    Sinon.stub(ValidationService, 'validateName').returns('Some error');
    Sinon.stub(ValidationService, 'validateSurname').returns('Some error');
    Sinon.stub(ValidationService, 'validateEmail').returns('Some error');
    Sinon.stub(ValidationService, 'validateAddress').returns(null);
    Sinon.stub(ValidationService, 'validatePhone').returns(null);

    component._validateForm();

    expect(component._hasErrors()).to.be.true;
  });

  it('should return false when there are no validation errors', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);

    Sinon.stub(ValidationService, 'validateName').returns(null);
    Sinon.stub(ValidationService, 'validateSurname').returns(null);
    Sinon.stub(ValidationService, 'validateEmail').returns(null);
    Sinon.stub(ValidationService, 'validateAddress').returns(null);
    Sinon.stub(ValidationService, 'validatePhone').returns(null);

    component._validateForm();

    expect(component._hasErrors()).to.be.false;
  });

  it('should have specific errors in errors object', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);

    // Mock validaciones específicas
    Sinon.stub(ValidationService, 'validateName').returns('Specific error');
    component._validateForm();

    expect(component.errors.name).to.equal('Specific error');
  });

  it('should validate on input change', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);

    Sinon.stub(ValidationService, 'validateName').returns('Some Error');

    const nameInput = component.shadowRoot.querySelector('input[name="name"]');
    nameInput.value = 'X';
    nameInput.dispatchEvent(new Event('input'));

    await component.updateComplete;

    expect(component.errors.name).to.equal('Some Error');
  });

  it('should show form and hide card when edit button is clicked', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);
    const editBtn = component.shadowRoot.querySelector('#edit-btn');
    const form = component.shadowRoot.querySelector('.user-form');
    const info = component.shadowRoot.querySelector('.user-card');

    editBtn.dispatchEvent(new Event('click'));

    expect(form.style.display).to.equal('block');
    expect(info.style.display).to.equal('none');
  });

  it('should show card and hide form when cancel button is clicked', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);
    const cancelBtn = component.shadowRoot.querySelector('#cancel-btn');
    const form = component.shadowRoot.querySelector('.user-form');
    const info = component.shadowRoot.querySelector('.user-card');

    cancelBtn.dispatchEvent(new Event('click'));

    expect(form.style.display).to.equal('none');
    expect(info.style.display).to.equal('flex');
  });

  it('should restore original user data when cancel is clicked', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);
    const cancelBtn = component.shadowRoot.querySelector('#cancel-btn');

    component.user.name = 'Kimo';
    cancelBtn.dispatchEvent(new Event('click'));

    expect(component.user).to.deep.equal(mockUser);
  });

  it('should return true when UserService.updateUser succeeds', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);
    Sinon.stub(UserService, 'updateUser').resolves(true);

    const result = await component._sendToService();

    expect(result).to.be.true;
  });

  it('should show error toast when no changes are made', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);
    const toastStub = Sinon.stub(component, '_showToast');

    const form = component.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(toastStub.calledOnce).to.be.true;
    expect(toastStub.firstCall.args[0]).to.equal('error');
    expect(toastStub.firstCall.args[1]).to.equal('ui.no-changes');
  });

  it('should show success toast when update is successful', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);
    const toastStub = Sinon.stub(component, '_showToast');

    const form = component.shadowRoot.querySelector('form');
    component.user.name = 'Kimo';
    form.dispatchEvent(new Event('submit'));

    expect(toastStub.calledOnce).to.be.true;
    expect(toastStub.firstCall.args[0]).to.equal('success');
    expect(toastStub.firstCall.args[1]).to.equal('user-profile.toast.success');
  });

  it('should show error toast when form has validation errors', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);

    Sinon.stub(ValidationService, 'validateName').returns('Some error');
    Sinon.stub(ValidationService, 'validateSurname').returns(null);

    const toast = component.shadowRoot.querySelector('bk-toast');
    const showErrorSpy = Sinon.spy(toast, 'showError');

    const form = component.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit', { bubbles: true }));

    expect(showErrorSpy.calledOnce).to.be.true;

    showErrorSpy.restore();
  });

  it('should show error toast when service update fails', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);

    component.user.name = 'OtroNombre';
    Sinon.stub(UserService, 'updateUser').throws(new Error('Service error'));
    const toast = component.shadowRoot.querySelector('bk-toast');
    const showErrorSpy = Sinon.spy(toast, 'showError');
    const form = component.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit', { bubbles: true }));

    expect(showErrorSpy.calledOnce).to.be.true;

    showErrorSpy.restore();
  });

  it('should render error messages for address and phone fields', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);
    Sinon.stub(ValidationService, 'validateAddress').returns('Error');
    Sinon.stub(ValidationService, 'validatePhone').returns('OtroError');

    component._validateForm();
    await component.updateComplete;
    const addressError = component.shadowRoot.querySelector('.error');

    expect(addressError).to.exist;
  });

  it('should call showSuccess when _showToast is called with success type', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);
    const toast = component.shadowRoot.querySelector('bk-toast');
    const showSuccessSpy = Sinon.spy(toast, 'showSuccess');

    component._showToast('success', 'Test OK');

    expect(showSuccessSpy.calledOnce).to.be.true;
    expect(showSuccessSpy.calledWith('Test OK')).to.be.true;

    showSuccessSpy.restore();
  });

  it('should call showError when _showToast is called with error type', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);

    const toast = component.shadowRoot.querySelector('bk-toast');
    const showErrorSpy = Sinon.spy(toast, 'showError');

    component._showToast('error', 'Test error message');

    expect(showErrorSpy.calledOnce).to.be.true;
    expect(showErrorSpy.calledWith('Test error message')).to.be.true;

    showErrorSpy.restore();
  });

  it('should show ui.error-form when form has errors on submit', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);
    await component.updateComplete;
    const toast = component.shadowRoot.querySelector('bk-toast');
    const showErrorSpy = Sinon.spy(toast, 'showError');
    const form = component.shadowRoot.querySelector('form');

    component.user.name = 'K';
    Sinon.stub(ValidationService, 'validateName').returns('Error en nombre');
    Sinon.stub(ValidationService, 'validateSurname').returns(null);
    form.dispatchEvent(new Event('submit', { bubbles: true }));

    expect(showErrorSpy.calledOnce).to.be.true;
    expect(showErrorSpy.args[0][0]).to.include('ui.error-form');

    showErrorSpy.restore();
  });

  it('should not call _showToast with other types', async () => {
    const component = await fixture(html`<bk-user-profile></bk-user-profile>`);
    const toast = component.shadowRoot.querySelector('bk-toast');
    const showSuccessSpy = Sinon.spy(toast, 'showSuccess');
    const showErrorSpy = Sinon.spy(toast, 'showError');

    component._showToast('warning', 'Test warning message');

    expect(showSuccessSpy.called).to.be.false;
    expect(showErrorSpy.called).to.be.false;

    showSuccessSpy.restore();
    showErrorSpy.restore();
  });
});
