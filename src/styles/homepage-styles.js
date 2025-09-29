import { css } from 'lit';

const styles = css`
  * {
    margin: 0px;
    box-sizing: border-box;
  }

  .container {
    display: flex;
    justify-content: center;
    padding: 40px;
    font-family: 'Sansation', sans-serif;
    max-width: 1280px;
    margin: 0 auto;
  }

  .content-section {
    width: 100%;
    max-width: 600px;
  }

  h2 {
    font-family: 'Source Serif 4', serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 20px;
    border-bottom: 3px solid var(--primary-color);
    padding-bottom: 10px;
    text-align: center;
  }

  p {
    font-size: 1.25rem;
    color: #333;
    margin-bottom: 15px;
    line-height: 1.6;
    text-align: center;
  }

  .welcome-text {
    font-size: 1.4rem;
    color: var(--primary-color-dark);
    font-weight: 600;
    margin-bottom: 0px;
  }

  .question-text {
    font-size: 1.3rem;
    color: var(--primary-color);
    font-weight: 500;
    margin-bottom: 30px;
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  li {
    background: white;
    border-radius: 50px;
    border: 2px solid var(--primary-color);
    transition: all 0.3s ease;
    overflow: hidden;
  }

  li:hover {
    background: var(--primary-color-dark);
  }

  li a {
    display: block;
    padding: 10px 25px;
    text-decoration: none;
    color: var(--primary-color-dark);
    font-size: 1.2rem;
    font-weight: 500;
    transition: color 0.3s ease;
    text-align: center;
  }

  li:hover a {
    color: white;
  }

  @media (max-width: 640px) {
    .container {
      padding: 20px;
    }
  }
`;
export default styles;
