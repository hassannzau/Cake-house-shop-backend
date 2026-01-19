import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import style from "./header.module.scss";
import {
  CloseIcon,
  SearchIcon,
  ShoppingIcon,
  UserIcon,
  WishlistIcon,
} from "@/assets/images/icons";
import Logo from "@/assets/images/logo/cake-logo.png";

import { isActivePath } from "@/helpers/activePath";



export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [showModal, setShowModal] = useState(false); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const menu = [
    { label: "HOME", path: "/" },
    { label: "SHOP", path: "/shop" },
    { label: "CONTACT", path: "/contact" },
    { label: "BLOG", path: "/blog" },
  ];

  const cartItems = [
    {
      id: "1",
      title: "Strawberry Cake",
      image: "https://placehold.co/86x110",
      price: 29,
      qty: 1,
      color: "Pink",
      size: "M",
    },
    {
      id: "2",
      title: "Chocolate Muffin Box",
      image: "https://placehold.co/86x110",
      price: 19,
      qty: 2,
      color: "Brown",
      size: "L",
    },
  ];


  const closeAll = () => {
    setShowModal(false);
    setMobileMenuOpen(false);
    setCartOpen(false);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  

  return (
    <header className={style.headerWrap}>
      <div className={style.header_main}>
        <div className={style.headerLeft}>
          <button
            type="button"
            className={style.burger}
            onClick={() => {
              setMobileMenuOpen(true);
              setShowModal(false);
              setCartOpen(false);
            }}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>

          <div className={style.headerLogo} onClick={() => navigate("/")}>
            <img src={Logo} alt="Logo" />
          </div>

          <nav className={style.desktopNav}>
            <ul className={style.pageList}>
              {menu.map((item) => {
                const active = isActivePath(pathname, item.path);

                return (
                  <li
                    key={item.path}
                    className={`${style.navItem} ${active ? style.active : ""}`}
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className={style.headerRight}>
          <div className={style.searchBox}>
            <input
              type="text"
              placeholder="Search..."
              className={style.searchInput}
            />
            <img src={SearchIcon} alt="Search" className={style.searchIcon} />
          </div>

          <button
            type="button"
            className={style.iconBtn}
            onClick={() => {
              setShowModal(true);
              setCartOpen(false);
              setMobileMenuOpen(false);
            }}
            aria-label="User"
          >
            <img src={UserIcon} alt="" />
          </button>

          <button type="button" className={style.iconBtn} aria-label="Wishlist">
            <img src={WishlistIcon} alt="Wishlist" />
          </button>

          <button
            type="button"
            className={style.iconBtn}
            onClick={() => {
              setCartOpen(true);
              setShowModal(false);
              setMobileMenuOpen(false);
            }}
            aria-label="Shopping bag"
          >
            <img src={ShoppingIcon} alt="Cart" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <>
          <div className={style.mobileDrawer}>
            <div className={style.drawerTop}>
              <p>MENU</p>
              <button
                type="button"
                className={style.drawerClose}
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <img src={CloseIcon} alt="Close" />
              </button>
            </div>

            <ul className={style.mobileNavList}>
              {menu.map((item) => {
                const active = isActivePath(pathname, item.path);

                return (
                  <li
                    key={item.path}
                    className={active ? style.active : ""}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            className={`${style.backWall} ${style.backWallOpen}`}
            onClick={() => setMobileMenuOpen(false)}
          />
        </>
      )}

      {showModal && (
        <>
          <div
            className={`${style.backWall} ${style.backWallOpen}`}
            onClick={() => setShowModal(false)}
          />

          <div className={style.userModal} >
            <div className={style.modalTop}>
              <p>LOGIN</p>
              <button
                type="button"
                className={style.closeIcon}
                onClick={() => setShowModal(false)}
                aria-label="Close login"
              >
                <img src={CloseIcon} alt="Close" />
              </button>
            </div>

            <form className={style.formModal}>
              <input
                type="text"
                placeholder="Username or email address"
                className={style.modalInput}
              />
              <input
                type="password"
                placeholder="Password"
                className={style.modalInput}
              />

              <div className={style.aboutPass}>
                <label className={style.rememberPass}>
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <a className={style.lostPass} href="/">
                  Lost password?
                </a>
              </div>

              <button type="submit" className={style.loginBtn}>
                LOG IN
              </button>

              <p className={style.createAcc}>
                No account yet? <Link to="/auth/register">Create Account</Link>
              </p>
            </form>
          </div>
        </>
      )}

      {cartOpen && (
        <>
          <div
            className={`${style.backWall} ${style.backWallOpen}`}
            onClick={() => setCartOpen(false)}
          />

          <div className={style.cartDrawer} role="dialog" aria-modal="true">
            <div className={style.cartHeader}>
              <p className={style.cartTitle}>
                SHOPPING BAG ( {cartItems.length} )
              </p>

              <button
                type="button"
                className={style.cartClose}
                onClick={() => setCartOpen(false)}
                aria-label="Close shopping bag"
              >
                ✕
              </button>
            </div>

            <div className={style.cartBody}>
              {cartItems.length === 0 ? (
                <div className={style.cartEmpty}>
                  <p>Your shopping bag is empty.</p>
                  <button type="button" className={style.cartEmptyBtn}>
                    Continue shopping
                  </button>
                </div>
              ) : (
                <ul className={style.cartList}>
                  {cartItems.map((product) => (
                    <li key={product.id} className={style.cartItem}>
                      <img
                        className={style.cartImg}
                        src={product.image}
                        alt={product.title}
                      />

                      <div className={style.cartMeta}>
                        <div className={style.cartTopLine}>
                          <div>
                            <p className={style.cartItemTitle}>{product.title}</p>
                            <div className={style.cartAttrs}>
                              {product.color && <p>Color: {product.color}</p>}
                              {product.size && <p>Size: {product.size}</p>}
                            </div>
                          </div>

                          <button
                            type="button"
                            className={style.cartRemove}
                            aria-label="Remove item"
                          >
                            ✕
                          </button>
                        </div>

                        <div className={style.cartBottomLine}>
                          <div className={style.cartQty}>
                            <button
                              type="button"
                              className={style.cartQtyBtn}
                              aria-label="Decrease"
                            >
                              −
                            </button>
                            <span className={style.cartQtyVal}>{product.qty}</span>
                            <button
                              type="button"
                              className={style.cartQtyBtn}
                              aria-label="Increase"
                            >
                              +
                            </button>
                          </div>

                          <p className={style.cartPrice}>${product.price}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={style.cartFooter}>
              <div className={style.cartSubtotal}>
                <span>SUBTOTAL:</span>
                <span>$12</span>
              </div>

              <button
                type="button"
                className={style.cartViewBtn}
                onClick={() => {
                  setCartOpen(false);
                  navigate("/cart");
                }}
              >
                View Cart
              </button>

              <button
                type="button"
                className={style.cartCheckoutBtn}
                onClick={() => {
                  setCartOpen(false);
                  navigate("/checkout");
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
