document.addEventListener("DOMContentLoaded", function () {
document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
          document.getElementById('message').innerText = 'Успішний вхід!';
          
          setTimeout(() => window.location.href = '/profile', 1000);
        } else {
          document.getElementById('message').innerText = data.message;
        }
      } catch (err) {
        document.getElementById('message').innerText = 'Помилка мережі';
      }
    });
});