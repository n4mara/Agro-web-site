class Footer extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <style>
        .footer {
          background-color:#AEC670;
          color: white;
          padding: 30px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          font-family: Arial, sans-serif;
        }
        .footer-section {
          flex: 1;
          min-width: 220px;
          margin: 15px 0;
        }
        .footer-section h4 {
          margin-bottom: 12px;
          font-size: 16px;
          color: #ff6f61;
        }
        .footer-section ul {
          list-style: none;
          padding: 0;
        }
        .footer-section ul li {
          margin: 6px 0;
        }
        .footer-section ul li a {
          text-decoration: none;
          color: white;
          font-size: 14px;
          transition: color 0.3s;
        }
        .footer-section ul li a:hover {
          color: #ff6f61;
        }
      </style>
      <footer class="footer">
        <div class="footer-section">
          <h4>Про платформу</h4>
          <ul>
            <li><a href="/about">Хто ми</a></li>
            <li><a href="/blog">Блоги</a></li>
            <li><a href="/contacts">Контакти</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Для покупців</h4>
          <ul>
            <li><a href="/favorites">Обрані товари</a></li>
            <li><a href="/orders">Мої покупки</a></li>
            <li><a href="/support">Центр підтримки</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Для продавців</h4>
          <ul>
            <li><a href="/create-product">Додати товар</a></li>
            <li><a href="/my-products">Мої товари</a></li>
            <li><a href="/policy">Політика безпеки</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Ми в соцмережах</h4>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Telegram</a></li>
          </ul>
        </div>
      </footer>
      `;
    }
  }
  customElements.define('custom-footer', Footer);