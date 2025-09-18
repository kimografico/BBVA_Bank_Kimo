import { css } from 'lit';

const styles = css`
  :host {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: calc(10px + 2vmin);
    color: #1a2b42;
    margin: 0 auto;
    text-align: center;
    background-color: var(--bank-kimo-background-color);
    overflow-x: hidden;
  }

  .container {
    flex: 1;
    align-content: center;
    align-self: center;
    max-width: 1280px;
  }

  main {
    flex-grow: 1;
  }

  .logo {
    margin-top: 36px;
    animation: app-logo-spin infinite 20s linear;
  }

  @keyframes app-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .app-footer {
    font-size: calc(12px + 0.5vmin);
    align-items: center;
  }

  .app-footer a {
    margin-left: 5px;
  }
`;

export default styles;
