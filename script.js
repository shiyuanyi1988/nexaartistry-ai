const form = document.getElementById('consult-form');
const msg = document.getElementById('form-msg');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    msg.textContent = '正在提交您的需求...';
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      msg.textContent = result.message || '已收到您的需求，稍后将由顾问联系您。';
      form.reset();
    } catch (error) {
      msg.textContent = '提交失败，请稍后重试。';
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}
