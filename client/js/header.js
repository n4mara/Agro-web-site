class Header extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <style>
        .header {
          background-color: #AEC670;
          color: white;
          padding: 20px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: Arial, sans-serif;
        }
        .header .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: #ff6f61;
          text-decoration: none;
        }
        .header nav a {
          color: white;
          text-decoration: none;
          margin-left: 20px;
          font-size: 14px;
          transition: color 0.3s;
        }
        .header nav a:hover {
          color: #ff6f61;
        }
      </style>
      <header class="header">
        <a href="index.html" class="logo">Agro IoT</a>
        <nav>
          <a href="">Головна</a>
          <a href="about.html">Про проєкт</a>
          <a href="sensors.html">Сенсори</a>
          <a href="contacts.html">Контакти</a>
          <a href="/login">Вхід</a>
        </nav>
      </header>
      `;
    }
  }
  customElements.define('custom-header', Header);