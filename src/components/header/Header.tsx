import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="app-header">
      <div className="container">
        <div className="logo">
          <h1>Stok Yönetimi</h1>
        </div>
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/">Ana Sayfa</Link>
            </li>
            <li>
              <Link to="/customers">Müşteriler</Link>
            </li>
            <li>
              <Link to="/products">Ürünler</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
