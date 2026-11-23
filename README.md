# ShopEasy – React E-commerce Shopping Application

## Project Description

ShopEasy is a simple e-commerce front end built with **React.js** and **Redux Toolkit**. Users can browse products fetched from the [Fake Store API](https://fakestoreapi.com/), view product details, search / filter / sort products, and manage a shopping cart. The cart is managed entirely through Redux Toolkit.

## Technologies Used

- React 18 (components and Hooks: `useState`, `useEffect`, `useMemo`, `useRef`, `useContext`)
- Redux Toolkit (`configureStore`, `createSlice`, `createAsyncThunk`)
- React Redux (`useSelector`, `useDispatch`)
- React Router v6
- Vite
- Plain CSS (responsive, no UI framework)
- Fake Store API

## Main Features

**Required**
- Home page with a responsive product grid (image, name, price, category, Add to Cart)
- Loading spinner while fetching and error message (with "Try again") on API failure
- Product Details page via React Router (`/product/:id`) with image, title, price, category, description and Add to Cart
- Search by product name, filter by category, sort by price (Low → High / High → Low)
- Shopping cart: increase / decrease quantity, remove items, per-item price and quantity, subtotal and total, empty-cart message
- Responsive navbar with app name, Home, Cart and a live cart item count
- Redux Toolkit cart slice with `addToCart`, `removeFromCart`, `increaseQuantity`, `decreaseQuantity`, `clearCart`

**Bonus**
- Wishlist (Redux slice + Wishlist page)
- Cart and wishlist saved in LocalStorage
- Success toast after adding to cart
- Checkout page with order summary and order confirmation
- Confirmation prompt before removing a product from the cart

## Installation Instructions

Requires [Node.js](https://nodejs.org/) 18 or newer.

```bash
git clone https://github.com/<your-username>/react-ecommerce-assignment.git
cd react-ecommerce-assignment
npm install
```

## How to Run the Project

```bash
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # create a production build in /dist
npm run preview   # preview the production build locally
```

## Project Structure

```
src/
├── components/   Navbar, ProductCard, Toast, Status (loader / error)
├── pages/        Home, ProductDetails, Cart, Checkout, Wishlist
├── store/        store.js, cartSlice.js, wishlistSlice.js, productsSlice.js
├── App.jsx
├── main.jsx
└── styles.css
```

## Live Project Link


Live demo :
