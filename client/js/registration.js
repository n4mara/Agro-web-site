document.addEventListener("DOMContentLoaded", function () {
document.getElementById('register-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;
    const message = document.getElementById('message');

    if (password !== confirm) {
        message.textContent = "Паролі не співпадають!";
        return;
    }

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            message.style.color = "green";
            message.textContent = "Успішна реєстрація! Перенаправлення...";
            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);
        } else {
            message.textContent = data.message || "Помилка реєстрації.";
        }

    } catch (err) {
        message.textContent = "Сервер недоступний.";
    }
});
});