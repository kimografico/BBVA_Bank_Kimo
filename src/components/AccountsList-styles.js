import { css } from 'lit';

const styles = css`
  * {
    margin: 0px;
    box-sizing: border-box;
  }

  table {
    border-spacing: 0px;
    background-color: #ddd;
    border-radius: 20px;
    overflow: hidden;
    font-family: 'Sansation', sans-serif;
    min-width: 500px;

    tr:nth-child(odd) {
      background-color: #ccc;
    }

    td {
      text-align: left;
      padding: 15px 25px;
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
`;

export default styles;
