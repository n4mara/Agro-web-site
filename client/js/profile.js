
document.addEventListener('DOMContentLoaded', async() => {

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


  
  const res = await fetch('/api/auth/token');
  const data = await res.json();

  if (res.ok) {
    document.getElementById('profile-avatar').src = `/api/user/avatar/${data.id}`;
    
  }

  fetch(`/api/user/name/${data.id}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById('profile-name').textContent= data.name;
  })
  .catch(err => console.error(err));

  const fieldSearch = document.getElementById('fieldSearch');
  const minAreaInput = document.getElementById('minArea');
  const maxAreaInput = document.getElementById('maxArea');

  function applyFilters() {
  const term = fieldSearch.value.trim().toLowerCase();
  const minA = parseFloat(minAreaInput.value);
  const maxA = parseFloat(maxAreaInput.value);

  document.querySelectorAll('.field-card').forEach(card => {
    const title = card.querySelector('.field-title').textContent.toLowerCase();
    const areaText = card.querySelector('.field-title')
                          .nextElementSibling // <p>Площа: <strong>XX га</strong></p>
                          .querySelector('strong').textContent;
    const area = parseFloat(areaText);

    const matchesName = title.includes(term);
    const matchesMin = isNaN(minA) || area >= minA;
    const matchesMax = isNaN(maxA) || area <= maxA;

    card.style.display = (matchesName && matchesMin && matchesMax) ? '' : 'none';
  });
}

[fieldSearch, minAreaInput, maxAreaInput].forEach(input =>
  input.addEventListener('input', applyFilters)
);

applyFilters();

  

  
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

  
  document.getElementById('logout-button').addEventListener('click', () => {
    fetch('/api/auth/logout', { method: 'POST' }).then(() => window.location.href = '/login.html');
  });
  
  async function loadFields() {
    const container = document.getElementById('fieldsContainer');
    container.innerHTML = '<p>Завантаження...</p>';
    try {
      const res = await fetch('/api/fields', { credentials: 'include' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { fields } = await res.json();

      if (fields.length === 0) {
        container.innerHTML = '<p>У вас ще немає жодного поля.</p>';
        return;
      }

      container.innerHTML = '';
      const grid = document.createElement('div');
      grid.className = 'fields-grid';

      fields.forEach(f => {
        const card = document.createElement('div');
        card.className = 'field-card';
        card.innerHTML = `
          <h3 class="field-title">${f.name}</h3>
          <p>Площа: <strong>${f.area} га</strong></p>
          <p>Культура: ${f.crop_type || '—'}</p>
          <p>Ґрунт: ${f.soil_type || '—'}</p>
          <p class="field-location">${f.location || ''}</p>
          <button class="edit-field-btn">Редагувати</button>
        `;
        card.querySelector('.edit-field-btn').addEventListener('click', () => {
          window.location.href = `/edit_field.html?id=${f.id}`;
        });
        grid.appendChild(card);
      });

      container.appendChild(grid);
      // одразу відфільтруємо під поточний запит
      fieldSearch.dispatchEvent(new Event('input'));
    } catch (err) {
      container.innerHTML = `<p>Не вдалося завантажити поля: ${err.message}</p>`;
    }
  }
 loadFields();


 document.getElementById('addFieldForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const form = e.target;
      const formData = {
        name: form.name.value.trim(),
        area: parseFloat(form.area.value),
        crop_type: form.crop_type.value.trim(),
        soil_type: form.soil_type.value,
        location: form.location.value.trim()
      };

      try {
        const res = await fetch('/api/fields/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (res.ok) {
          alert('Поле успішно додано!');
          form.reset();
        } else {
          alert('Помилка: ' + (data.message || 'Не вдалося додати поле'));
        }
      } catch (error) {
        alert('Помилка мережі або сервера');
      }
    });
});

