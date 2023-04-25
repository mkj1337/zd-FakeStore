import { Link } from 'react-router-dom';

// styles
import './Category.scss';

export const Category = () => {
  return (
    <section className="category">
      <div className="category__wrapper">
        <div className="category__item">
          <Link to="/">
            <div className="category__info">women's clothing</div>
            <img
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt=""
            />
          </Link>
        </div>
        <div className="category__item">
          <Link to="/">
            <div className="category__info">men's clothing</div>
            <img
              src="https://images.unsplash.com/photo-1474031317822-f51f48735ddd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt=""
            />
          </Link>
        </div>
        <div className="category__item">
          <Link to="/">
            <div className="category__info">jewelery</div>
            <img
              src="https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt=""
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
