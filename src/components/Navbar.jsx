import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../store/cartSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const cartCount = useSelector(selectCartCount);
  const wishCount = useSelector((s) => s.wishlist.items.length);
  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo" onClick={close}>
          Shop<span>Easy</span>
        </Link>

        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={close}>
            Home
          </NavLink>
          <NavLink to="/wishlist" onClick={close}>
            Wishlist
            {wishCount > 0 && <span className="badge badge-alt">{wishCount}</span>}
          </NavLink>
          <NavLink to="/cart" onClick={close}>
            Cart
            <span className="badge" data-testid="cart-count">
              {cartCount}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
