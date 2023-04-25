import { Link } from 'react-router-dom';

// styles
import './Banner.scss';

// icons
import { BsArrowRight } from 'react-icons/bs';

export const Banner = () => {
  return (
    <header className="banner">
      <div className="banner__wrapper">
        <div className="banner__info">
          <Link to="/store">
            <button className="banner__info-btn">
              <span>Shop now</span>
              <BsArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};
