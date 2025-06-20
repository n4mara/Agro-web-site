
document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('avatarForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData();
  const fileInput = document.getElementById('avatarInput');
  formData.append('avatar', fileInput.files[0]);

  const res = await fetch('/api/user/avatar', {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  if (res.ok) {
    document.getElementById('avatarMessage').textContent = 'Фото оновлено!';
    document.getElementById('profile-avatar').src = `/api/user/avatar/${data.id}`;
  } else {
    document.getElementById('avatarMessage').textContent = data.message;
  }
});

});

window.addEventListener('DOMContentLoaded', async () => {
  
  const res = await fetch('/api/auth/token');
  const data = await res.json();

  if (res.ok) {
    document.getElementById('profile-avatar').src = `/api/user/avatar/${data.id}`;
    document.getElementById('profile-name').textContent = data.email;
  }
});


document.addEventListener('DOMContentLoaded', () => {
  
  const menuLinks = document.querySelectorAll('.sidebar nav a');
  const sections = document.querySelectorAll('.content section');
  menuLinks.forEach(link =>
    link.addEventListener('click', () => {
      selectMenu(link.dataset.section);
    })
  );

  function selectMenu(sectionId) {
    menuLinks.forEach(l => l.classList.toggle('active', l.dataset.section === sectionId));
    sections.forEach(sec => sec.classList.toggle('active', sec.id === sectionId));
  }

  const nameEl = document.getElementById('profile-name');
  fetch('/api/user/name')
    .then(res => res.json())
    .then(user => {
      nameEl.textContent = user.name;
      document.getElementById('profile_name').value = user.name;
      ;
    })
    .catch(console.error);

  document.getElementById('logout-button').addEventListener('click', () => {
    fetch('/api/auth/logout', { method: 'POST' }).then(() => window.location.href = '/login.html');
  });

  document.getElementById('avatarForm').addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', document.getElementById('avatarInput').files[0]);
    const res = await fetch('/api/user/avatar', { method: 'POST', body: formData });
    const data = await res.json();
    document.getElementById('avatarMessage').textContent = data.message;
    if (res.ok) avatarEl.src = data.avatarUrl;
  });

  document.getElementById('profileForm').addEventListener('submit', async e => {
    e.preventDefault();
    const payload = {
      name: document.getElementById('profile_name').value,
      email: document.getElementById('profile_email').value
    };
    const res = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    document.getElementById('profileMessage').textContent = data.message;
    if (res.ok) nameEl.textContent = payload.name;
  });

  fetch('/api/user/purchases')
    .then(res => res.json())
    .then(list => {
      const container = document.getElementById('purchasesContainer');
      container.innerHTML = list.length
        ? list.map(item => `<div class="list-item">${item.title} — ${item.date}</div>`).join('')
        : '<p>Немає покупок.</p>';
    })
    .catch(console.error);

  fetch('/api/user/orders')
    .then(res => res.json())
    .then(list => {
      const container = document.getElementById('ordersList');
      container.innerHTML = list.length
        ? list.map(o => `<div class="list-item">#${o.id}: ${o.description} — ${o.status}</div>`).join('')
        : '<p>Немає замовлень.</p>';
    })
    .catch(console.error);
});