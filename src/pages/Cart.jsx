import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../store/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="state-box">
        <h2>Your cart is empty 🛒</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleRemove = (item) => {
    if (window.confirm(`Remove "${item.title}" from your cart?`)) {
      dispatch(removeFromCart(item.id));
    }
  };

  const handleClear = () => {
    if (window.confirm("Remove all items from your cart?")) {
      dispatch(clearCart());
    }
  };

  return (
    <>
      <h1 className="page-title">Shopping Cart</h1>
      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <Link to={`/product/${item.id}`} className="cart-img">
                <img src={item.image} alt={item.title} />
              </Link>
              <div className="cart-info">
                <Link to={`/product/${item.id}`} className="card-title">
                  {item.title}
                </Link>
                <span className="category">{item.category}</span>
                <span className="muted">৳{item.price.toFixed(2)} each</span>
              </div>
              <div className="qty">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  aria-label="Increase quantity"
                  onClick={() => dispatch(increaseQuantity(item.id))}
                >
                  +
                </button>
              </div>
              <div className="line-total">
                ৳{(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                className="remove"
                aria-label={`Remove ${item.title}`}
                onClick={() => handleRemove(item)}
              >
                ✕
              </button>
            </div>
          ))}
          <button className="btn btn-outline" onClick={handleClear}>
            Clear Cart
          </button>
        </div>

        <aside className="summary">
          <h2>Order Summary</h2>
          <div className="row">
            <span>Subtotal</span>
            <span>৳{total.toFixed(2)}</span>
          </div>
          <div className="row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="row total">
            <span>Total</span>
            <span>৳{total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn btn-primary block">
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </>
  );
}
