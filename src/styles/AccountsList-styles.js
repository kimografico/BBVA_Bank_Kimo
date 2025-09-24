import { css } from 'lit';

const styles = css`
  * {
    /* outline: 2px solid red; */
    margin: 0px;
    box-sizing: border-box;
  }

  .container {
    width: 100%;
    justify-self: center;
  }

  h2 {
    font-family: 'Sansation', sans-serif;
    text-align: left;
    border-bottom: 4px solid var(--primary-color);
    padding-bottom: 5px;
    margin: 0 0 20px 10px;
    width: calc(100% - 15px);
    position: relative;
  }

  h2::after {
    content: '';
    position: absolute;
    right: -3px;
    bottom: -2px;
    width: 48px;
    height: 48px;
    background-image: url('assets/user.svg');
    background-size: contain;
    background-repeat: no-repeat;
  }

  table {
    border-spacing: 0px;
    background-color: rgba(var(--primary-color-rgb), 0.05);
    border-radius: 20px;
    overflow: hidden;
    font-family: 'Sansation', sans-serif;
    width: 100vw;
    max-width: 100%;

    tr:nth-child(odd) {
      background-color: rgba(var(--primary-color-rgb), 0.05);
    }

    tr:hover {
      background-color: var(--primary-color);
      cursor: pointer;
      p,
      span {
        color: white;
      }
    }

    td {
      vertical-align: bottom;
      text-align: left;
      padding: 15px 25px;
      min-height: 75px;
      &:first-child {
        width: 300px;
      }
      &:nth-child(2) {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
    }
  }

  .iban {
    font-size: 0.9rem;
    color: #555;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .alias {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
  }

  .amount {
    font-size: 1.5rem;
    font-weight: bold;
    color: #444;
  }

  .EUR::after {
    content: '€';
  }

  .USD::before {
    content: '$';
  }

  .error {
    font-family: 'Sansation', sans-serif;
    font-weight: bold;
    font-size: 2rem;
    color: red;
    padding: 25px;
  }

  button {
    background: #e1e2e8;
    border-radius: 20px;
    border: 1px solid var(--primary-color);
    font-size: 0.8rem;
    color: var(--primary-color);
    padding: 5px 10px;
    transition: 0.5s;
    &:hover {
      cursor: pointer;
      background: var(--primary-color);
      border: 1px solid white;
      color: white;
    }
  }

  #error {
    color: red;
    margin-top: 25px;
    font-size: 1rem;
  }

  @media (max-width: 1280px) and (min-width: 641px) {
    .container {
      width: calc(100% - 50px);
      justify-self: center;
    }
  }

  @media (max-width: 640px) {
    .container {
      margin: 0 -20px;
      td {
        display: flex;
        flex-direction: column;
        padding: 5px 25px;
        &:first-child {
          padding-top: 15px;
        }
        &:last-child {
          padding-bottom: 15px;
          align-items: flex-start;
        }
        .amount {
          margin-top: -10px;
        }
      }
    }

    h2 {
      font-size: 2rem;
    }
  }
`;

export default styles;
