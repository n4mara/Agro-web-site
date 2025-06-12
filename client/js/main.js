fetch('/api/status')
  .then(res => res.json())
  .then(data => {
    document.getElementById('status').innerText = `Статус: ${data.status}`;
  });