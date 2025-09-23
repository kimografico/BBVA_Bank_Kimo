import { css } from 'lit';

const styles = css`
  :host {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: calc(10px + 2vmin);
    color: var(--text-color);
    margin: 0 auto;
    text-align: center;
    overflow-x: hidden;
    padding-top: 100px;
    box-sizing: border-box;
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

  bk-header {
    position: fixed;
    top: 0;
    z-index: 10;
  }

  @media (max-width: 640px) {
    :host {
      padding-top: 180px;
    }
  }
`;

export default styles;
