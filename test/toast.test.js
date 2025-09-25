import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/toast.js';
import Sinon from 'sinon';

describe('bk-toast', () => {
  let component;

  beforeEach(async () => {
    component = await fixture(html`<bk-toast></bk-toast>`);
    await component.updateComplete;
  });

  it('should render the component with toast container', async () => {
    const container = component.shadowRoot.getElementById('toast-container');
    expect(container).to.exist;
  });

  it('should show a toast with correct message and type', async () => {
    component.showToast('Test message', 'success');

    const container = component.shadowRoot.getElementById('toast-container');
    const toast = container.querySelector('.toast');

    expect(toast).to.exist;
    expect(toast.textContent).to.equal('Test message');
    expect(toast.classList.contains('success')).to.be.true;
  });

  it('should add show class after timeout', done => {
    component.showToast('Test message', 'info');

    const container = component.shadowRoot.getElementById('toast-container');
    const toast = container.querySelector('.toast');

    expect(toast.classList.contains('show')).to.be.false;

    setTimeout(() => {
      expect(toast.classList.contains('show')).to.be.true;
      done();
    }, 60);
  });

  it('should remove show class and then remove toast after duration', done => {
    const duration = 500;
    component.showToast('Test message', 'info', duration);

    const container = component.shadowRoot.getElementById('toast-container');
    const toast = container.querySelector('.toast');

    expect(toast).to.exist;

    setTimeout(() => {
      expect(toast.classList.contains('show')).to.be.false;

      setTimeout(() => {
        const removedToast = container.querySelector('.toast');
        expect(removedToast).to.be.null;
        done();
      }, 350);
    }, duration + 50);
  });

  it('should call showToast with warning type and default duration', () => {
    const showToastSpy = Sinon.spy(component, 'showToast');

    component.showWarning('Warning message');

    expect(showToastSpy.calledOnce).to.be.true;
    expect(showToastSpy.calledWith('Warning message', 'warning', 3500)).to.be
      .true;

    showToastSpy.restore();
  });

  it('should call showToast with warning type and custom duration', () => {
    const showToastSpy = Sinon.spy(component, 'showToast');

    component.showWarning('Warning message', 2000);

    expect(showToastSpy.calledOnce).to.be.true;
    expect(showToastSpy.calledWith('Warning message', 'warning', 2000)).to.be
      .true;

    showToastSpy.restore();
  });

  it('should call showToast with info type and default duration', () => {
    const showToastSpy = Sinon.spy(component, 'showToast');

    component.showInfo('Info message');

    expect(showToastSpy.calledOnce).to.be.true;
    expect(showToastSpy.calledWith('Info message', 'info', 3000)).to.be.true;

    showToastSpy.restore();
  });

  it('should call showToast with info type and custom duration', () => {
    const showToastSpy = Sinon.spy(component, 'showToast');

    component.showInfo('Info message', 1500);

    expect(showToastSpy.calledOnce).to.be.true;
    expect(showToastSpy.calledWith('Info message', 'info', 1500)).to.be.true;

    showToastSpy.restore();
  });

  it('should show warning toast with correct styling', async () => {
    component.showWarning('Warning message');

    const container = component.shadowRoot.getElementById('toast-container');
    const toast = container.querySelector('.toast');

    expect(toast).to.exist;
    expect(toast.classList.contains('warning')).to.be.true;
    expect(toast.textContent).to.equal('Warning message');
  });

  it('should show info toast with correct styling', async () => {
    component.showInfo('Info message');

    const container = component.shadowRoot.getElementById('toast-container');
    const toast = container.querySelector('.toast');

    expect(toast).to.exist;
    expect(toast.classList.contains('info')).to.be.true;
    expect(toast.textContent).to.equal('Info message');
  });

  it('should handle multiple toasts', async () => {
    component.showInfo('First message');
    component.showWarning('Second message');

    const container = component.shadowRoot.getElementById('toast-container');
    const toasts = container.querySelectorAll('.toast');

    expect(toasts.length).to.equal(2);
    expect(toasts[0].textContent).to.equal('First message');
    expect(toasts[1].textContent).to.equal('Second message');
  });

  it('should not remove toast if it has no parent node', done => {
    component.showToast('Test message', 'info', 100);

    const container = component.shadowRoot.getElementById('toast-container');
    const toast = container.querySelector('.toast');

    toast.remove();
    setTimeout(() => {
      done();
    }, 450);
  });
});
