document.addEventListener('DOMContentLoaded', function() {

document.getElementById('productForm').addEventListener('submit', async e => {
      e.preventDefault();
      const form = e.target;
      const fd = new FormData(form);
      const res = await fetch('/api/products', { method: 'POST', body: fd });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        alert('Товар додано успішно!');
        form.reset();
      } else {
        alert('Помилка: ' + (data.message || 'невідома'));
      }
    });
});