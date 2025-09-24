import { css } from 'lit';

const styles = css`
  .container {
    font-family: 'Sansation', sans-serif;
    display: flex;
    max-width: 800px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    text-align: left;
    margin: 25px;
  }

  .container.error {
    box-shadow: none;
    padding: 25px;
    border: 3px solid red;
    color: red;
  }

  .image-container {
    width: 120px;
    height: auto;
    flex-shrink: 0;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .header {
    background-color: white;
    color: var(--primary-color);
    padding: 25px 10px 0 10px;
  }

  .transactions {
    background-color: white;
    color: var(--primary-color);
    padding: 10px 25px;
    border-top: 2px solid lightgrey;
    position: relative;
  }

  .transactions p {
    margin: 0 0 5px 0;
    display: flex;
  }

  .transactions .date {
    color: grey;
    font-size: 1rem;
    position: absolute;
    right: 20px;
    bottom: 5px;
  }

  .transactions .amount {
    color: var(--text-color);
    font-size: 1.5rem;
  }

  .amount.negative {
    color: red;
  }

  .EUR::after {
    content: '€';
    margin-left: 0.5ch;
  }

  .USD::before {
    content: '$';
    margin-right: 0.5ch;
  }

  h3 {
    color: var(--primary-color);
    margin: 10px;
  }

  .header h2 {
    font-size: 2rem;
    margin: 0;
    margin-left: 10px;
  }

  .details {
    padding: 16px;
    background-color: #ffffff;
  }

  .details p {
    font-size: 1.25rem;
    color: #555555;
    margin: 15px 10px;
  }

  .details strong {
    color: var(--primary-color);
  }

  .pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    button {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      border: 2px solid var(--primary-color);
      font-size: 1.25rem;
      color: var(--primary-color);
      margin: 15px;
    }
    button:disabled {
      opacity: 0.25;
    }
    button:hover:enabled {
      background-color: var(--primary-color);
      color: white;
      cursor: pointer;
  }

  @media (max-width: 640px) {
    .container {
      width: 350px;
    }

    .image-container {
      display: none;
    }

    .iban {
      font-size: 1.1rem;
    }

    .header h2 {
      font-size: 2rem;
    }

    .details p {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }

    .container {
      margin: 25px;
    }

    .transactions .amount {
      float: left;
    }

    .transactions p {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }
  }
`;

export default styles;
