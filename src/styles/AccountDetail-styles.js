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

  @media (max-width: 640px) {
    .image-container {
      display: none;
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
  }
`;

export default styles;
