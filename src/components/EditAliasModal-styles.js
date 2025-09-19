import { css } from 'lit';

const styles = css`
  dialog {
    border: none;
    border-radius: 10px;
    padding: 0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    font-family: 'Sansation', sans-serif;
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
  }

  .header {
    background-color: var(--primary-color);
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    height: 50px;
    padding: 15px 20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  form {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  menu {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 15px;
    padding-inline-start: 0;
  }

  input {
    font-family: 'Sansation', sans-serif;
    font-size: 1rem;
    background: #ddd;
    border-radius: 20px;
    border: none;
    padding: 10px 20px;
    margin-left: 10px;
    &:focus {
      border: none;
      outline: none;
    }
  }

  button {
    background: #ddd;
    border-radius: 20px;
    border: 2px solid var(--primary-color);
    font-size: 0.9rem;
    color: var(--primary-color);
    padding: 5px 10px;
    transition: 0.5s;
    width: 100%;
    height: 32px;
    &:hover {
      cursor: pointer;
      background: var(--primary-color);
      color: white;
    }
  }
`;

export default styles;
