import { css } from 'lit';

const styles = css`
  .user-card {
    font-family: 'Sansation', sans-serif;
    display: flex;
    max-width: 800px;
    margin: 25px auto;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    text-align: left;
    min-width: 450px;
  }

  .avatar-container {
    width: 150px;
    height: auto;
    flex-shrink: 0;
    overflow: hidden;
  }

  .avatar-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.75s;
    &:hover {
      transform: scale(1.15);
    }
  }

  .info {
    flex: 1;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px 5px 5px 30px;
  }

  .info h1 {
    font-size: 1.75rem;
    margin: 0 0 10px 0;
    color: var(--primary-color);
  }

  .info p {
    font-size: 1rem;
    color: #555555;
    margin: 5px 0;
  }

  .info button {
    align-self: flex-end;
    margin-top: 15px;
    border-radius: 20px;
    border: 1px solid white;
    background: white;
    font-size: 0.8rem;
    color: var(--primary-color);
    padding: 5px 10px;
    transition: 0.5s;
  }

  .info button:hover {
    cursor: pointer;
    background: var(--primary-color);
    border: 1px solid white;
    color: white;
  }

  .user-form {
    max-width: 800px;
    margin: 25px auto;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    font-family: 'Sansation', sans-serif;
    text-align: left;
    min-width: 450px;
    display: none;
  }

  .user-form h1 {
    font-size: 1.75rem;
    margin-bottom: 20px;
    margin-top: 0;
    color: var(--primary-color);
  }

  .user-form label {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }

  .user-form label span {
    font-size: 1rem;
    color: #555555;
    margin-bottom: 5px;
  }

  .user-form input {
    padding: 8px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 15px;
    transition: border-color 0.75s;
  }

  .user-form input:focus {
    border-color: var(--primary-color);
    outline: none;
  }

  .user-form .buttons {
    display: flex;
    flex-direction: row;
    padding-bottom: 15px;
    justify-content: space-between;
    margin-top: 30px;
  }

  .user-form button {
    display: block;
    padding: 10px 20px;
    font-size: 1rem;
    color: var(--primary-color);
    background-color: white;
    border: 2px solid var(--primary-color);
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.5s;
    width: 45%;
  }

  .user-form button:hover {
    color: white;
    background-color: var(--primary-color);
  }

  @media (max-width: 640px) {
    .user-card {
      flex-direction: column;
      align-items: center;
    }

    .avatar-container {
      width: 100%;
      height: 200px;
    }

    .info {
      padding: 10px;
      text-align: center;
    }

    .info h1 {
      font-size: 1.25rem;
    }

    .info p {
      font-size: 0.9rem;
    }
  }
`;

export default styles;
