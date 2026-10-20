// ========================================
// متفوّق 3 متوسط - منطق التطبيق (SPA)
// ========================================

const app = document.getElementById('app');
const state = {
    subject: null,
    tab: 'lessons',
    quiz: null,
    examFilter: null,
    progress: loadProgress()
};

// ---------- التقدم المحفوظ ----------
function loadProgress() {
    try { return JSON.parse(localStorage.getItem('m3am-progress') || '{}'); }
    catch (e) { return {}; }
}
function saveProgress() {
    localStorage.setItem('m3am-progress', JSON.stringify(state.progress));
}
function getScore(subjectId) {
    const p = state.progress[subjectId];
    return p && p.best != null ? p.best : null;
}
function setScore(subjectId, score, total) {
    const prev = state.progress[subjectId] || {};
    const pct = Math.round((score / total) * 100);
    state.progress[subjectId] = {
        best: prev.best != null ? Math.max(prev.best, pct) : pct,
        tries: (prev.tries || 0) + 1
    };
    saveProgress();
}

// ---------- التنقل ----------
function navigate(hash) {
    if (location.hash !== hash) location.hash = hash;
    else route();
}
window.addEventListener('hashchange', route);

function route() {
    const h = location.hash.replace(/^#\/?/, '');
    const parts = h.split('/').filter(Boolean);
    closeDrawer();
    if (parts.length === 0) { renderHome(); return; }
    if (parts[0] === 'subject' && parts[1]) {
        const subject = SUBJECTS.find(s => s.id === parts[1]);
        if (!subject) { renderHome(); return; }
        if (parts[2] === 'quiz') { renderQuiz(subject); return; }
        if (parts[2] === 'exams') { state.subject = subject; state.tab = 'exams'; renderSubject(subject); return; }
        state.subject = subject;
        state.tab = parts[2] || 'lessons';
        renderSubject(subject);
        return;
    }
    if (parts[0] === 'search') { renderSearch(decodeURIComponent(parts[1] || '')); return; }
    renderHome();
}

// ---------- الصفحة الرئيسية ----------
function renderHome() {
    const totalTopics = SUBJECTS.reduce((n, s) => n + s.units.reduce((m, u) => m + u.topics.length, 0), 0);
    const totalQuizzes = SUBJECTS.reduce((n, s) => n + (s.quiz ? s.quiz.length : 0), 0);
    const totalExams = SUBJECTS.reduce((n, s) => n + (s.exams ? s.exams.length : 0), 0);
    const totalTris = SUBJECTS.reduce((n, s) => n + (s.triExams ? s.triExams.length : 0), 0);
    app.innerHTML = `
    <section class="hero">
        <div class="hero-inner">
            <div class="hero-badge">🎓 ${APP_META.year} — البرنامج الرسمي</div>
            <h1>${APP_META.name}</h1>
            <p class="hero-sub">ملخصات الدروس، القواعد الأساسية، الفيديوهات، المراجعات،
            اختبارات Quiz تفاعلية، ونماذج اختبارات مع الحلول — لكل مواد السنة الثالثة متوسط.</p>
            <div class="hero-search">
                <input type="search" id="globalSearch" placeholder="🔍 ابحث عن درس، قاعدة، مادة…" />
            </div>
            <div class="hero-stats">
                <div class="stat"><b>${SUBJECTS.length}</b><span>مادة</span></div>
                <div class="stat"><b>${totalTopics}</b><span>محور دراسي</span></div>
                <div class="stat"><b>${totalQuizzes}</b><span>سؤال Quiz</span></div>
                <div class="stat"><b>${totalExams}</b><span>نموذج اختبار</span></div>
                <div class="stat"><b>${totalTris}</b><span>حُولي بالحلول</span></div>
            </div>
        </div>
    </section>
    <section class="section">
        <h2 class="section-title">📚 المواد الدراسية</h2>
        <div class="subjects-grid">
            ${SUBJECTS.map(s => subjectCard(s)).join('')}
        </div>
    </section>
    <section class="section tips">
        <h2 class="section-title">💡 نصائح للتحضير</h2>
        <div class="tips-grid">
            <div class="tip-card"><b>1. مراجعة القواعد</b><p>ابدأ بملخصات المحاور ثم راجع القواعد الأساسية لكل مادة.</p></div>
            <div class="tip-card"><b>2. اختبر نفسك</b><p>حلّ اختبارات Quiz التفاعلية واحفظ أفضل نتيجة لك.</p></div>
            <div class="tip-card"><b>3. نماذج الاختبارات</b><p>حلّ النماذج بوقت محدّد ثم قارن مع الحلول النموذجية.</p></div>
            <div class="tip-card"><b>4. الفيديوهات</b><p>شاهد فيديوهات الدروس المرتبطة بكل محور لترسيخ الفهم.</p></div>
        </div>
    </section>
    <footer class="footer">
        <p>${APP_META.ministry} · ${APP_META.ref}</p>
        <p>تطبيق تعليمي مجاني — يعمل بدون إنترنت بعد أول فتح.</p>
    </footer>`;

    const si = document.getElementById('globalSearch');
    let t;
    si.addEventListener('input', e => {
        clearTimeout(t);
        const q = e.target.value.trim();
        if (q.length >= 2) { t = setTimeout(() => renderSearch(q), 250); }
    });
}

function subjectCard(s) {
    const topics = s.units.reduce((n, u) => n + u.topics.length, 0);
    const best = getScore(s.id);
    const triCount = s.triExams ? s.triExams.length : 0;
    const extras = s.exams ? s.exams.length : 0;
    return `
    <button class="subject-card" style="--c:${s.color}" onclick="navigate('#/subject/${s.id}')">
        <span class="subject-icon">${s.icon}</span>
        <span class="subject-name">${s.name}</span>
        <span class="subject-meta">${topics} محور · ${s.quiz ? s.quiz.length : 0} سؤال${triCount ? ` · ${triCount} حُولي` : ''}${extras ? ` · ${extras} نموذج` : ''}</span>
        ${best != null ? `<span class="best-badge">🏆 أفضل نتيجة: ${best}%</span>` : ''}
    </button>`;
}

// ---------- صفحة المادة ----------
function renderSubject(subject) {
    const tabs = [
        { id: 'lessons', label: '📚 الدروس', icon: '📚' },
        { id: 'rules', label: '📐 القواعد', icon: '📐' },
        { id: 'videos', label: '🎬 الفيديوهات', icon: '🎬' },
        { id: 'review', label: '🔁 المراجعة', icon: '🔁' },
        { id: 'quiz', label: '🧠 اختبار Quiz', icon: '🧠' },
        { id: 'exams', label: '📋 النماذج والحلول', icon: '📋' }
    ];
    app.innerHTML = `
    <header class="subject-hero" style="--c:${subject.color}">
        <button class="back-btn" onclick="navigate('#/')">→ رجوع</button>
        <div class="subject-hero-inner">
            <span class="big-icon">${subject.icon}</span>
            <div>
                <h1>${subject.name}</h1>
                <p>${subject.desc}</p>
                <span class="coef">معامل المادة: ${subject.coef}</span>
                ${getScore(subject.id) != null ? `<span class="best-badge light">🏆 أفضل نتيجة Quiz: ${getScore(subject.id)}%</span>` : ''}
            </div>
        </div>
    </header>
    <nav class="tabs">
        ${tabs.map(t => `<button class="tab ${state.tab === t.id ? 'active' : ''}" onclick="goTab('${subject.id}','${t.id}')">${t.label}</button>`).join('')}
    </nav>
    <section class="section tab-content" id="tabContent"></section>`;

    renderTabContent(subject);
}

function goTab(subjectId, tab) {
    state.tab = tab;
    if (tab === 'quiz') { navigate('#/subject/' + subjectId + '/quiz'); return; }
    navigate('#/subject/' + subjectId + '/' + tab);
}

function renderTabContent(subject) {
    const el = document.getElementById('tabContent');
    if (!el) return;
    if (state.tab === 'lessons') el.innerHTML = lessonsView(subject);
    else if (state.tab === 'rules') el.innerHTML = rulesView(subject);
    else if (state.tab === 'videos') el.innerHTML = videosView(subject);
    else if (state.tab === 'review') el.innerHTML = reviewView(subject);
    else if (state.tab === 'exams') el.innerHTML = examsView(subject);
    else el.innerHTML = lessonsView(subject);
    bindTabEvents(el);
}

function bindTabEvents(el) {
    el.querySelectorAll('.accordion-header').forEach(h => {
        h.addEventListener('click', () => {
            const item = h.parentElement;
            item.classList.toggle('open');
        });
    });
    el.querySelectorAll('.solution-toggle').forEach(b => {
        b.addEventListener('click', e => {
            e.stopPropagation();
            const sol = b.parentElement.querySelector('.solution');
            sol.classList.toggle('show');
            b.textContent = sol.classList.contains('show') ? '🙈 إخفاء الحل' : '👁 إظهار الحل النموذجي';
        });
    });
    el.querySelectorAll('.exam-filter-btn').forEach(b => {
        b.addEventListener('click', () => setExamFilter(b.dataset.filter));
    });
}

function setExamFilter(key) {
    state.examFilter = key;
    const el = document.getElementById('tabContent');
    if (el && state.subject && state.tab === 'exams') {
        el.innerHTML = examsView(state.subject);
        bindTabEvents(el);
    }
}

function lessonsView(subject) {
    return subject.units.map(u => `
        <h3 class="unit-title" style="border-color:${subject.color}">${u.title}</h3>
        ${u.topics.map(t => `
        <div class="accordion-item">
            <button class="accordion-header">
                <span>${t.title}</span><span class="chev">▾</span>
            </button>
            <div class="accordion-body">
                <div class="lesson-summary">${t.summary}</div>
            </div>
        </div>`).join('')}`).join('');
}

function rulesView(subject) {
    return subject.units.map(u => `
        <h3 class="unit-title" style="border-color:${subject.color}">${u.title}</h3>
        ${u.topics.map(t => `
        <div class="accordion-item">
            <button class="accordion-header">
                <span>📐 ${t.title}</span><span class="chev">▾</span>
            </button>
            <div class="accordion-body">
                <h4>القواعد الأساسية:</h4>
                <ol class="rules-list">${t.rules.map(r => `<li>${r}</li>`).join('')}</ol>
            </div>
        </div>`).join('')}`).join('');
}

function videosView(subject) {
    return `<div class="videos-intro">
        <p>🎬 لكل محور فيديوهات تعليمية منتقاة من يوتيوب. اضغط على الزر لمشاهدة فيديوهات المحور (يتطلب اتصالاً بالإنترنت):</p>
    </div>` + subject.units.map(u => `
        <h3 class="unit-title" style="border-color:${subject.color}">${u.title}</h3>
        ${u.topics.map(t => `
        <div class="video-card">
            <div class="video-info">
                <b>${t.title}</b>
                <span>ابحث عن: "${t.videoQuery}"</span>
            </div>
            <a class="video-btn" target="_blank" rel="noopener"
               href="https://www.youtube.com/results?search_query=${encodeURIComponent(t.videoQuery)}">
               ▶ مشاهدة الفيديوهات
            </a>
        </div>`).join('')}`).join('');
}

function reviewView(subject) {
    return subject.units.map(u => `
        <h3 class="unit-title" style="border-color:${subject.color}">${u.title}</h3>
        ${u.topics.map(t => `
        <div class="review-card">
            <h4>🔁 ${t.title}</h4>
            <ul>${t.review.map(r => `<li>${r}</li>`).join('')}</ul>
        </div>`).join('')}`).join('');
}

function examsView(subject) {
    const tris = subject.triExams || [];
    const extras = subject.exams || [];
    const filters = [];
    [1, 2, 3].forEach(n => {
        const ex = tris.find(t => t.tri === n);
        if (ex) filters.push({ key: 'tri' + n, label: `🗓 حُولي ف${n}`, ex });
    });
    if (extras.length) filters.push({ key: 'extra', label: '📋 نماذج إضافية' });

    if (!filters.length) {
        return `<div class="empty-state">لا توجد نماذج في هذه المادة حالياً — راجع الدروس والقواعد أولاً.</div>`;
    }
    if (!state.examFilter || !filters.some(f => f.key === state.examFilter)) {
        state.examFilter = filters[0].key;
    }

    let list;
    if (state.examFilter === 'extra') list = extras;
    else {
        const f = filters.find(x => x.key === state.examFilter);
        list = f && f.ex ? [f.ex] : [];
    }

    const intro = `
    <div class="exam-filters">
        <span class="exam-filters-label">تصفية:</span>
        ${filters.map(f => `<button class="exam-filter-btn ${state.examFilter === f.key ? 'active' : ''}" data-filter="${f.key}">${f.label}</button>`).join('')}
    </div>`;

    return intro + list.map(ex => `
        <div class="exam-card">
            <div class="exam-head">
                <h3>📋 ${ex.title}</h3>
                <div class="exam-meta">
                    <span>⏱ ${ex.meta.duration}</span>
                    <span>⚖️ معامل ${ex.meta.coef}</span>
                    <span>💯 ${ex.meta.total}</span>
                </div>
            </div>
            ${ex.parts.map(p => `
                <div class="exam-part">
                    <h4>${p.title}</h4>
                    ${p.tasks.map(tk => `
                        <div class="task">
                            <pre class="task-text">${tk.text}</pre>
                            <button class="solution-toggle">👁 إظهار الحل النموذجي</button>
                            <div class="solution">${tk.solution}</div>
                        </div>`).join('')}
                </div>`).join('')}
        </div>`).join('');
}

// ---------- محرك الاختبار ----------
function renderQuiz(subject) {
    state.subject = subject;
    const questions = shuffle(subject.quiz.slice());
    state.quiz = { questions, idx: 0, score: 0, answered: false, finished: false };
    drawQuiz();
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function drawQuiz() {
    const subject = state.subject;
    const qz = state.quiz;
    const el = document.getElementById('tabContent') || app;

    if (!qz || qz.finished) { drawQuizResult(); return; }

    const q = qz.questions[qz.idx];
    const pct = Math.round((qz.idx / qz.questions.length) * 100);
    const content = `
    <div class="quiz-wrap">
        <div class="quiz-top">
            <button class="back-btn" onclick="navigate('#/subject/${subject.id}/lessons')">← خروج</button>
            <div class="quiz-progress"><div class="quiz-progress-bar" style="width:${pct}%"></div></div>
            <span class="quiz-counter">${qz.idx + 1} / ${qz.questions.length}</span>
        </div>
        <div class="quiz-card">
            <h3 class="quiz-question">${q.q}</h3>
            <div class="quiz-options">
                ${q.options.map((o, i) => `<button class="quiz-option" data-i="${i}" onclick="answer(${i})">${String.fromCharCode(65 + i)}. ${o}</button>`).join('')}
            </div>
            <div class="quiz-feedback" id="quizFeedback"></div>
        </div>
        <button class="next-btn hidden" id="nextBtn" onclick="nextQuestion()">
            ${qz.idx + 1 === qz.questions.length ? '🏁 إنهاء الاختبار' : 'السؤال التالي ←'}
        </button>
    </div>`;

    // نعرض في تبويب quiz داخل صفحة المادة أو مباشرة
    if (location.hash.indexOf('/quiz') !== -1) {
        if (!document.getElementById('tabContent')) {
            app.innerHTML = `
            <header class="subject-hero" style="--c:${subject.color}">
                <button class="back-btn" onclick="navigate('#/subject/${subject.id}/lessons')">→ رجوع</button>
                <div class="subject-hero-inner">
                    <span class="big-icon">${subject.icon}</span>
                    <div><h1>${subject.name} — اختبار Quiz</h1><p>اختبر معلوماتك فوراً مع التصحيح الفوري.</p></div>
                </div>
            </header>
            <section class="section tab-content" id="tabContent">${content}</section>`;
            return;
        }
        document.getElementById('tabContent').innerHTML = content;
        // تحديث التبويبات
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    } else {
        el.innerHTML = content;
    }
}

function answer(i) {
    const qz = state.quiz;
    if (qz.answered) return;
    qz.answered = true;
    const q = qz.questions[qz.idx];
    const correct = i === q.a;
    if (correct) qz.score++;
    document.querySelectorAll('.quiz-option').forEach((b, bi) => {
        b.classList.add('disabled');
        if (bi === q.a) b.classList.add('correct');
        else if (bi === i) b.classList.add('wrong');
    });
    const fb = document.getElementById('quizFeedback');
    fb.innerHTML = `
        <div class="feedback ${correct ? 'ok' : 'ko'}">
            <b>${correct ? '✅ إجابة صحيحة!' : '❌ إجابة خاطئة.'}</b>
            <p>${q.ex || ''}</p>
        </div>`;
    document.getElementById('nextBtn').classList.remove('hidden');
}

function nextQuestion() {
    const qz = state.quiz;
    qz.idx++;
    qz.answered = false;
    if (qz.idx >= qz.questions.length) {
        qz.finished = true;
        setScore(state.subject.id, qz.score, qz.questions.length);
        drawQuizResult();
    } else {
        drawQuiz();
    }
}

function drawQuizResult() {
    const subject = state.subject;
    const qz = state.quiz;
    if (!qz) { navigate('#/subject/' + subject.id + '/lessons'); return; }
    const pct = Math.round((qz.score / qz.questions.length) * 100);
    let note, emoji;
    if (pct >= 80) { note = 'ممتاز! أنت من التلاميذ المتفوقين 🌟'; emoji = '🏆'; }
    else if (pct >= 60) { note = 'جيّد، واصل المراجعة! 👏'; emoji = '👍'; }
    else if (pct >= 40) { note = 'مقبول، راجع الدروس ثم أعد المحاولة 💪'; emoji = '📖'; }
    else { note = 'لا بأس، أعد قراءة الملخصات ثم جرّب من جديد ✨'; emoji = '🔄'; }
    const content = `
    <div class="quiz-result">
        <div class="result-emoji">${emoji}</div>
        <h2>${note}</h2>
        <div class="result-score">${qz.score} / ${qz.questions.length}</div>
        <div class="result-pct">${pct}%</div>
        <div class="result-actions">
            <button class="btn primary" onclick="navigate('#/subject/${subject.id}/quiz')">🔄 إعادة الاختبار</button>
            <button class="btn" onclick="navigate('#/subject/${subject.id}/lessons')">📚 مراجعة الدروس</button>
            <button class="btn" onclick="navigate('#/subject/${subject.id}/exams')">📋 النماذج والحلول</button>
            <button class="btn" onclick="navigate('#/')">🏠 الرئيسية</button>
        </div>
    </div>`;
    if (!document.getElementById('tabContent')) {
        app.innerHTML = `
        <header class="subject-hero" style="--c:${subject.color}">
            <button class="back-btn" onclick="navigate('#/subject/${subject.id}/lessons')">→ رجوع</button>
            <div class="subject-hero-inner"><span class="big-icon">${subject.icon}</span>
            <div><h1>${subject.name} — نتيجة الاختبار</h1></div></div>
        </header>
        <section class="section tab-content" id="tabContent">${content}</section>`;
    } else {
        document.getElementById('tabContent').innerHTML = content;
    }
}

// ---------- البحث ----------
function renderSearch(q) {
    const query = q.trim();
    if (!query) { navigate('#/'); return; }
    const results = [];
    SUBJECTS.forEach(s => {
        s.units.forEach(u => {
            u.topics.forEach(t => {
                const hay = (t.title + ' ' + t.summary + ' ' + t.rules.join(' ')).toLowerCase();
                if (hay.indexOf(query.toLowerCase()) !== -1) {
                    results.push({ subject: s, unit: u, topic: t });
                }
            });
        });
    });
    app.innerHTML = `
    <section class="section">
        <button class="back-btn" onclick="navigate('#/')">→ الرئيسية</button>
        <h2 class="section-title">🔎 نتائج البحث عن: "${escapeHtml(query)}"</h2>
        <p class="search-count">${results.length} نتيجة</p>
        ${results.length ? results.map(r => `
            <div class="search-result" onclick="navigate('#/subject/${r.subject.id}/lessons')">
                <div class="sr-head">
                    <span class="sr-icon" style="background:${r.subject.color}">${r.subject.icon}</span>
                    <div>
                        <b>${r.topic.title}</b>
                        <span>${r.unit.title} · ${r.subject.name}</span>
                    </div>
                </div>
                <p class="sr-excerpt">${stripHtml(r.topic.summary).slice(0, 140)}…</p>
            </div>`).join('')
        : `<div class="empty-state">لا توجد نتائج. جرّب كلمات مثل: المعادلات، الوراثة، الثورة، conjugaison…</div>`}
    </section>`;
}

function stripHtml(html) {
    const d = document.createElement('div');
    d.innerHTML = html;
    return d.textContent || '';
}
function escapeHtml(s) {
    return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ---------- القائمة الجانبية ----------
function toggleDrawer() {
    document.getElementById('drawer').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('show');
}
function closeDrawer() {
    const d = document.getElementById('drawer');
    const o = document.getElementById('overlay');
    if (d) d.classList.remove('open');
    if (o) o.classList.remove('show');
}

// ---------- تثبيت التطبيق ----------
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    const b = document.getElementById('installBtn');
    if (b) b.classList.remove('hidden');
});
async function installApp() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    document.getElementById('installBtn').classList.add('hidden');
}

// ---------- التشغيل ----------
document.addEventListener('DOMContentLoaded', () => {
    // ربط الأزرار
    document.querySelectorAll('[data-nav]').forEach(el => {
        el.addEventListener('click', () => { navigate(el.getAttribute('data-nav')); closeDrawer(); });
    });
    document.querySelectorAll('[data-drawer]').forEach(el => {
        el.addEventListener('click', toggleDrawer);
    });
    document.querySelectorAll('[data-close-drawer]').forEach(el => {
        el.addEventListener('click', closeDrawer);
    });
    const ib = document.getElementById('installBtn');
    if (ib) ib.addEventListener('click', installApp);
    // تسجيل عامل الخدمة
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(() => {});
    }
    route();
});

// جعل الدوال متاحة globally (للـ onclick)
window.navigate = navigate;
window.goTab = goTab;
window.setExamFilter = setExamFilter;
window.answer = answer;
window.nextQuestion = nextQuestion;
window.installApp = installApp;
window.toggleDrawer = toggleDrawer;
window.closeDrawer = closeDrawer;
