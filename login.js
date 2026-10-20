// ========================================
// صفحة الدخول - learn with Smail
// ========================================

const LOGIN_KEY = 'lws-user';

function getLoggedUser() {
    try { return JSON.parse(localStorage.getItem(LOGIN_KEY) || 'null'); }
    catch (e) { return null; }
}

function showLogin() {
    const ls = document.getElementById('loginScreen');
    if (ls) ls.classList.remove('hidden');
}

function hideLogin() {
    const ls = document.getElementById('loginScreen');
    if (ls) ls.classList.add('hidden');
}

function updateUserChip() {
    const user = getLoggedUser();
    const chip = document.getElementById('userChip');
    const chipName = document.getElementById('userChipName');
    if (user && chip) {
        chip.classList.remove('hidden');
        if (chipName) chipName.textContent = user.name + ' · ' + user.age + ' سنة';
    } else if (chip) {
        chip.classList.add('hidden');
    }
}

function loginSubmit(e) {
    e.preventDefault();
    const nameEl = document.getElementById('loginName');
    const ageEl = document.getElementById('loginAge');
    const errEl = document.getElementById('loginError');
    const name = (nameEl.value || '').trim();
    const age = parseInt(ageEl.value, 10);

    if (name.length < 2) { errEl.textContent = 'أدخل اسماً صحيحاً (حرفان على الأقل).'; return; }
    if (!age || age < 8 || age > 99) { errEl.textContent = 'أدخل عمراً صحيحاً بين 8 و 99.'; return; }

    errEl.textContent = '';
    localStorage.setItem(LOGIN_KEY, JSON.stringify({ name: name, age: age, ts: Date.now() }));
    hideLogin();
    updateUserChip();
}

function logout() {
    const user = getLoggedUser();
    if (!user) return;
    if (!confirm('تسجيل الخروج من حساب "' + user.name + '"؟')) return;
    localStorage.removeItem(LOGIN_KEY);
    const nameEl = document.getElementById('loginName');
    const ageEl = document.getElementById('loginAge');
    if (nameEl) nameEl.value = '';
    if (ageEl) ageEl.value = '';
    const errEl = document.getElementById('loginError');
    if (errEl) errEl.textContent = '';
    updateUserChip();
    showLogin();
    navigate('#/');
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    if (form) form.addEventListener('submit', loginSubmit);
    const chip = document.getElementById('userChip');
    if (chip) chip.addEventListener('click', logout);

    const user = getLoggedUser();
    if (user) { hideLogin(); } else { showLogin(); }
    updateUserChip();
});

window.logout = logout;
window.showLogin = showLogin;
