import { NavLink } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useCartContext } from '../../context/CartContext';
import { Cart } from '../Cart/Cart';

// styles
import './Navbar.scss';

// icons
import { CiTwitter, CiInstagram, CiFacebook } from 'react-icons/ci';
import { FaBars } from 'react-icons/fa';
import { VscChromeClose } from 'react-icons/vsc';
import { BsBasket3 } from 'react-icons/bs';

export const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const { cartQuantity, setIsOpen, isOpen } = useCartContext();

  useEffect(() => {
    if (menuRef.current && socialsRef.current) {
      if (isMenuActive) {
        menuRef.current.classList.add('nav__menu-active');
        socialsRef.current?.classList.add('nav__socials-active');
      } else {
        menuRef.current.classList.remove('nav__menu-active');
        socialsRef.current?.classList.remove('nav__socials-active');
      }
    }
  }, [isMenuActive]);

  const handleClick = () => {
    setIsMenuActive(false);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Cart closeMenu={setIsMenuActive} />
      <nav className="nav">
        <div className="nav__wrapper">
          <h1 className="nav__logo" onClick={handleClick}>
            <NavLink to="/">FakeStore</NavLink>
          </h1>
          <ul className="nav__menu" ref={menuRef}>
            <li className="nav__menu-item">
              <NavLink to="/" onClick={handleClick}>
                Home
              </NavLink>
            </li>
            <li className="nav__menu-item">
              <NavLink to="/admin" onClick={handleClick}>
                Admin
              </NavLink>
            </li>
          </ul>
          <div className="nav__right">
            <div className="nav__socials" ref={socialsRef}>
              <a href="#" className="nav__socials-item">
                <CiTwitter className="nav__socials-icon" />
              </a>
              <a href="#" className="nav__socials-item">
                <CiInstagram className="nav__socials-icon" />
              </a>
              <a href="#" className="nav__socials-item">
                <CiFacebook className="nav__socials-icon" />
              </a>
            </div>
            <div className="nav__btn">
              {isMenuActive ? (
                <VscChromeClose
                  className="nav__btn-icon"
                  onClick={() => setIsMenuActive(false)}
                />
              ) : (
                <FaBars
                  className="nav__btn-icon"
                  onClick={() => {
                    setIsMenuActive(true);
                    setIsOpen(false);
                  }}
                />
              )}
            </div>
            <div className="nav__cart" onClick={() => setIsOpen(!isOpen)}>
              <span className="nav__cart-badge">{cartQuantity}</span>
              <BsBasket3 className="nav__cart-icon" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
