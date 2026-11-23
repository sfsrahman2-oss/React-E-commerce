import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotal, clearCart } from "../store/cartSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const [placed, setPlaced] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", address: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setPlaced({ name: form.name, total });
    dispatch(clearCart());
  };

  if (placed) {
    return (
      <div className="state-box success">
        <h2>Order confirmed 🎉</h2>
        <p>
          Thank you, {placed.name}! Your order total of{" "}
          <strong>৳{placed.total.toFixed(2)}</strong> has been placed.
        </p>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="state-box">
        <h2>Nothing to check out</h2>
        <Link to="/" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="page-title">Checkout</h1>
      <div className="cart-layout">
        <form className="checkout-form" onSubmit={onSubmit}>
          <label>
            Full name
            <input name="name" required value={form.name} onChange={onChange} />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={onChange}
            />
          </label>
          <label>
            Shipping address
            <textarea
              name="address"
              rows="3"
              required
              value={form.address}
              onChange={onChange}
            />
          </label>
          <button className="btn btn-primary" type="submit">
            Place Order
          </button>
        </form>

        <aside className="summary">
          <h2>Order Summary</h2>
          {items.map((i) => (
            <div className="row" key={i.id}>
              <span className="truncate">
                {i.title} × {i.quantity}
              </span>
              <span>৳{(i.price * i.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="row total">
            <span>Total</span>
            <span>৳{total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </>
  );
}
