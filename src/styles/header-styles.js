import { css } from 'lit';

const styles = css`
  header {
    font-family: 'Source Serif 4', serif;
    font-weight: 700;
    font-size: 1.75rem;
    background: linear-gradient(
      90deg,
      var(--primary-color) 0%,
      var(--primary-color-dark) 125%
    );
    color: white;
    text-align: left;
    width: 100vw;
    margin-bottom: 25px;
    border-bottom: 6px solid var(--primary-color-dark);
    display: flex;
    justify-content: center;

    div {
      max-width: 1280px;
      width: calc(100% - 50px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 0;
    }

    h1 {
      margin: 0;
      white-space: nowrap;
      font-size: 3rem;
    }

    .menu-toggle {
      display: none;
      background: none;
      border: none;
      color: white;
      font-size: 2rem;
      cursor: pointer;
    }

    ul {
      font-size: 1.25rem;
      font-weight: 350;
      list-style: none;
      display: flex;
      gap: 25px;
      padding: 0;
      justify-self: flex-end;

      li {
        transition: 0.5s;

        a {
          color: var(--text-color-light);
          text-decoration: none;
          transition: color 0.25s;
        }

        a:hover {
          color: white;
        }
      }
    }

    .disabled {
      pointer-events: none;
    }
  }

  @media (max-width: 640px) {
    header {
      text-align: center;
      display: flex;

      div {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        h1 {
          font-size: 2.5rem;
        }

        .menu-toggle {
          display: block;
        }

        ul {
          position: absolute;
          top: calc(100% - 25px);
          left: 0;
          width: 100%;
          margin: 0;
          background: white;
          color: black;
          border-bottom: 4px solid var(--primary-color);
          padding: 10px 0;
          display: none;
          flex-direction: column;
          font-size: 1.75rem;
          font-weight: 600;
        }

        ul.open {
          display: flex;
        }

        li {
          margin: 10px;
          a {
            color: var(--primary-color-dark);
          }

          a:hover {
            color: var(--primary-color);
          }
        }

        .disabled {
          display: none;
        }
      }
    }
  }
`;

export default styles;
