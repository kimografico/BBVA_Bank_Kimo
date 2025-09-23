import { css } from 'lit';

const styles = css`
  header {
    font-family: 'Source Serif 4', serif;
    font-weight: 700;
    font-size: 1.75rem;
    /* background-color: var(--primary-color); */
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

    a {
      text-decoration: none;
      color: inherit;
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
        color: var(--text-color-light);
        transition: 0.5s;
        &:hover {
          color: white;
          cursor: pointer;
          transition: 0.25s;
        }
      }
    }
  }

  @media (max-width: 640px) {
    header {
      text-align: center;
      display: flex;
      div {
        flex-direction: column;
        ul {
          margin: 10px;
          font-size: 1.75rem;
        }
      }
      h1 {
        padding: 0;
        font-size: 4rem;
      }
    }
  }
`;
export default styles;
