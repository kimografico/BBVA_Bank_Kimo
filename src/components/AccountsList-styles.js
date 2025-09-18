import { css } from 'lit';

const styles = css`
  * {
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
    border-bottom: 4px solid #001391;
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
    background-color: #ddd;
    border-radius: 20px;
    overflow: hidden;
    font-family: 'Sansation', sans-serif;
    width: 100vw;
    max-width: 100%;

    tr:nth-child(odd) {
      background-color: #ccc;
    }

    td {
      /* outline: 1px solid #d5d5d5; */
      vertical-align: bottom;
      text-align: left;
      padding: 15px 25px;
      &:first-child {
        width: 300px;
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
    margin-left: 5px;
  }

  .USD::before {
    content: '$';
    margin-right: 5px;
  }

  .error {
    font-family: 'Sansation', sans-serif;
    font-weight: bold;
    font-size: 2rem;
    color: red;
    padding: 25px;
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
        }
      }
    }

    h2 {
      font-size: 2rem;
    }
  }
`;

export default styles;
