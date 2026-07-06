const chatForm = document.getElementById('chat-form');
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');

function appendMessage(text, role) {
  if (!chatBody) return;
  const bubble = document.createElement('div');
  bubble.className = `bubble ${role}`;
  bubble.textContent = text;
  chatBody.appendChild(bubble);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function generateReply(text) {
  const lower = text.toLowerCase();
  if (lower.includes('报价') || lower.includes('价格')) {
    return '我可以先帮您梳理一份基础报价框架，包括需求范围、交付周期和优先级建议。';
  }
  if (lower.includes('官网') || lower.includes('网站')) {
    return '如果您需要官网，我们建议先从品牌展示、联系方式和咨询入口三个模块开始。';
  }
  if (lower.includes('crm') || lower.includes('客户')) {
    return 'CRM 的重点通常是线索管理、跟进状态和报价流程。我们可以先把这些流程整理成一个清晰的后台。';
  }
  return '我已经收到您的需求，接下来可以帮您整理服务方案、预算范围和下一步动作建议。';
}

if (chatForm && chatBody && chatInput) {
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = chatInput.value.trim();
    if (!value) return;
    appendMessage(value, 'user');
    chatInput.value = '';
    window.setTimeout(() => appendMessage(generateReply(value), 'bot'), 500);
  });
}

const authButtons = document.querySelectorAll('.auth-trigger');
const authModal = document.getElementById('authModal');
const authTitle = document.getElementById('authTitle');
const authMessage = document.getElementById('authMessage');
const authForm = document.getElementById('authForm');
const authTabs = document.querySelectorAll('.tab-btn');
const closeAuth = document.getElementById('closeAuth');

let activeMode = 'login';

function setAuthMode(mode) {
  activeMode = mode;
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  if (authTitle) {
    authTitle.textContent = mode === 'register' ? '注册' : '登录';
  }
}

function openAuth(mode) {
  setAuthMode(mode);
  if (authModal) authModal.hidden = false;
  if (authMessage) authMessage.textContent = '';
}

function closeAuthModal() {
  if (authModal) authModal.hidden = true;
}

authButtons.forEach((button) => {
  button.addEventListener('click', () => openAuth(button.dataset.mode || 'login'));
});

closeAuth?.addEventListener('click', closeAuthModal);
authModal?.addEventListener('click', (event) => {
  if (event.target === authModal) closeAuthModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && authModal && !authModal.hidden) closeAuthModal();
});

authTabs.forEach((button) => {
  button.addEventListener('click', () => setAuthMode(button.dataset.mode || 'login'));
});

authForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(authForm);
  const email = formData.get('email');
  if (authMessage) {
    authMessage.textContent = activeMode === 'register'
      ? `已为 ${email} 创建账号，欢迎进入 NexaArtistry AI。`
      : `欢迎回来，${email}，您现在可以继续管理客户和订单。`;
  }
});
