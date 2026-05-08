import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import style from "./header.module.scss";
import {
  CloseIcon,
  Menu,
  SearchIcon,
  ShoppingIcon,
  UserIcon,
  WishlistIcon,
} from "@/assets/images/icons";
import Logo from "@/assets/images/logo/cake-logo.png";

import { isActivePath } from "@/helpers/activePath";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/store/cartSlice";
import { loginUser, logout } from "@/store/authSlice";
import { useTranslation } from "react-i18next";

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const menu = [
    { label: "HOME", path: "/" },
    { label: "SHOP", path: "/products" },
    { label: "CONTACT", path: "/contact" },
  ];

  const dispatch = useAppDispatch();
  const shoppingList = useAppSelector((state: RootState) => state.cart.items);
  const token = useAppSelector((state: RootState) => state.auth.token);
  const authLoading = useAppSelector((state: RootState) => state.auth.loading);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const result = await dispatch(loginUser({ email: loginEmail, password: loginPassword }));
    if (loginUser.fulfilled.match(result)) {
      setShowModal(false);
      setLoginEmail("");
      setLoginPassword("");
    } else {
      setLoginError((result.payload as string) || "Login failed.");
    }
  };

  const closeAll = () => {
    setShowModal(false);
    setCartOpen(false);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  
  

  const subtotal = shoppingList.reduce((sum, product) => {
    const finalPrice =
      product.discountedPrice > 0 ? product.discountedPrice : product.price;
    return sum + finalPrice * product.quantity;
  }, 0);

const handleSubmit = (e) => {
  e.preventDefault();
  if (searchValue.trim()) {
    const currentLang = i18n.language;
    // Birbaşa dilli ünvana yönləndiririk ki, middleware redirect etməsin
    navigate(`/${currentLang}/products?q=${searchValue.trim()}`);
  }
};
  return (
    <header className={style.headerWrap}>
      <div className={style.header_main}>
        <div className={style.headerLeft}>
          <button
            type="button"
            className={style.burger}
            onClick={() => {
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
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                className={style.searchInput}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button type="submit">
                <img
                  src={SearchIcon}
                  alt="Search"
                  className={style.searchIcon}
                />
              </button>
            </form>
          </div>

          <button
            type="button"
            className={style.iconBtn}
            onClick={() => {
              setShowModal(true);
              setCartOpen(false);
            }}
            aria-label="User"
          >
            <img src={UserIcon} alt="" />
          </button>

          <button
            type="button"
            className={style.iconBtn}
            aria-label="Wishlist"
            onClick={() => navigate("/account/wishlist")}
          >
            <img src={WishlistIcon} alt="Wishlist" />
          </button>

          <button
            type="button"
            className={style.iconBtn}
            onClick={() => {
              setCartOpen(true);
              setShowModal(false);
            }}
            aria-label="Shopping bag"
            style={{ position: "relative" }}
          >
            <img src={ShoppingIcon} alt="Cart" />
            {shoppingList.length > 0 && (
              <span className={style.cart_badge} style={{
                position: "absolute", top: -6, right: -6,
                background: "#e11d48", color: "#fff",
                borderRadius: "50%", fontSize: 11, fontWeight: 700,
                width: 18, height: 18, display: "flex",
                alignItems: "center", justifyContent: "center",
                lineHeight: 1,
              }}>
                {shoppingList.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {showModal && (
        <>
          <div
            className={`${style.backWall} ${style.backWallOpen}`}
            onClick={() => setShowModal(false)}
          />

          <div className={style.userModal}>
            <div className={style.modalTop}>
              <p>{token ? "MY ACCOUNT" : "LOGIN"}</p>
              <button
                type="button"
                className={style.closeIcon}
                onClick={() => setShowModal(false)}
                aria-label="Close login"
              >
                <img src={CloseIcon} alt="Close" />
              </button>
            </div>

            {token ? (
              <div className={style.formModal}>
                <p style={{ fontSize: 14, marginBottom: 16, color: "#555" }}>You are logged in.</p>
                <button
                  type="button"
                  className={style.loginBtn}
                  onClick={() => { dispatch(logout()); setShowModal(false); }}
                >
                  LOG OUT
                </button>
                <p className={style.createAcc}>
                  <Link to="/account/details" onClick={() => setShowModal(false)}>My Account</Link>
                </p>
              </div>
            ) : (
              <form className={style.formModal} onSubmit={handleLogin}>
                {loginError && (
                  <p style={{ color: "#e11d48", fontSize: 13, marginBottom: 8 }}>{loginError}</p>
                )}
                <input
                  type="email"
                  placeholder="Email address"
                  className={style.modalInput}
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className={style.modalInput}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button type="submit" className={style.loginBtn} disabled={authLoading}>
                  {authLoading ? "LOGGING IN..." : "LOG IN"}
                </button>
                <p className={style.createAcc}>
                  No account yet? <Link to="/auth/register" onClick={() => setShowModal(false)}>Create Account</Link>
                </p>
              </form>
            )}
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
                SHOPPING BAG ( {shoppingList.length} )
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
              {shoppingList.length === 0 ? (
                <div className={style.cartEmpty}>
                  <p>Your shopping bag is empty.</p>
                  <button
                    type="button"
                    className={style.cartEmptyBtn}
                    onClick={() => { setCartOpen(false); navigate("/products"); }}
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <ul className={style.cartList}>
                  {shoppingList.map((product) => (
                    <li key={product.id} className={style.cartItem}>
                      <img
                        className={style.cartImg}
                        src={product.images?.[0] ?? ""}
                        alt={product.title}
                      />

                      <div className={style.cartMeta}>
                        <div className={style.cartTopLine}>
                          <div>
                            <p className={style.cartItemTitle}>
                              {product.title}
                            </p>
                            <div className={style.cartAttrs}>
                              {product.color && <p>Color: {product.color}</p>}
                              {product.sizes?.[0]?.label && (
                                <p>Size: {product.sizes[0].label}</p>
                              )}
                            </div>
                          </div>

                          <button
                            type="button"
                            className={style.cartRemove}
                            aria-label="Remove item"
                            onClick={() => dispatch(removeFromCart(product))}
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
                              onClick={() =>
                                dispatch(decreaseQuantity(product))
                              }
                            >
                              −
                            </button>
                            <span className={style.cartQtyVal}>
                              {product.quantity}
                            </span>
                            <button
                              type="button"
                              className={style.cartQtyBtn}
                              aria-label="Increase"
                              onClick={() =>
                                dispatch(increaseQuantity(product))
                              }
                            >
                              +
                            </button>
                          </div>

                          <p className={style.cartPrice}>
                            $
                            {product.discountedPrice > 0
                              ? product.discountedPrice * product.quantity
                              : product.price * product.quantity}
                          </p>
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
                <span>${subtotal}</span>
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

      <div className={style.mobileHeader}>
        <div className={style.main_mobile_header}>
          <div className={style.hamburger} onClick={() => setMenuOpen(true)}>
            <img src={Menu} alt="menu" />
          </div>

          <div className={style.mobile_logo}>
            <img src={Logo} alt="Logo" />
          </div>

          <div
            className={style.shopping_icon}
            onClick={() => { setCartOpen(true); setShowModal(false); }}
          >
            <img src={ShoppingIcon} alt="shopping bag" />
            {shoppingList.length > 0 && (
              <span className={style.cart_badge}>{shoppingList.length}</span>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className={style.mobileMenuOverlay}>
          <div className={style.mobileMenuTop}>
            <div
              className={style.closeButton}
              onClick={() => setMenuOpen(false)}
            >
              <img src={CloseIcon} alt="close" />
            </div>

            <div className={style.menuLogo}>
              <img src={Logo} alt="logo" />
            </div>

            <div
              className={style.menuCart}
              onClick={() => { setMenuOpen(false); setCartOpen(true); }}
            >
              <img src={ShoppingIcon} alt="shopping bag" />
              {shoppingList.length > 0 && (
                <span className={style.cart_badge}>{shoppingList.length}</span>
              )}
            </div>
          </div>

          <div className={style.mobileMenuBody}>
            <div className={style.searchBox}>
              <input type="text" placeholder="Search products" />
              <img src={SearchIcon} alt="search" />
            </div>

            <div className={style.menuLinks}>
              {menu.map((item) => (
                <div className={style.menuItem}>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={style.mobileMenuFooter}>
            <div className={style.accountRow}>
              <img src={UserIcon} alt="user" />
              <span>MY ACCOUNT</span>
            </div>

            <div className={style.optionRow}>
              <span className={style.optionLabel}>Language</span>
              <div className={style.optionValue}>
                <span>United Kingdom | English</span>
              </div>
            </div>

            {/* <div className={style.optionRow}>
              <span className={style.optionLabel}>Currency</span>
              <div className={style.optionValue}>
                <span>$ USD</span>
                <img src={ChevronDown} alt="dropdown" />
              </div>
            </div> */}

            {/* <div className={style.socialIcons}>
              <img src={FacebookIcon} alt="facebook" />
              <img src={TwitterIcon} alt="twitter" />
              <img src={InstagramIcon} alt="instagram" />
              <img src={YoutubeIcon} alt="youtube" />
              <img src={PinterestIcon} alt="pinterest" />
            </div> */}
          </div>
        </div>
      )}
    </header>
  );
}
