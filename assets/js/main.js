/* ===== NAVBAR SCROLL ===== */
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
let mobileMenu = null;

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) navbar?.classList.add('scrolled');
  else navbar?.classList.remove('scrolled');
});

/* ===== MOBILE MENU ===== */
if (hamburger) {
  hamburger.addEventListener('click', () => {
    if (mobileMenu) {
      mobileMenu.remove();
      mobileMenu = null;
      return;
    }
    mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
      <a href="index.html">Home</a>
      <a href="products.html">Our Products</a>
      <a href="supply-chain.html">Supply Chain & Logistics</a>
      <a href="compliance.html">Compliance & Certifications</a>
      <a href="contact.html">Request a Quote</a>
    `;
    navbar.after(mobileMenu);
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => { mobileMenu?.remove(); mobileMenu = null; });
    });
  });
}

/* ===== SCROLL REVEAL ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

/* ===== RFQ FORM ===== */
const rfqForm = document.getElementById('rfq-form');
if (rfqForm) {
  rfqForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(rfqForm);
    const company = data.get('company') || '';
    const country = data.get('country') || '';
    const product = data.get('product') || '';
    const volume = data.get('volume') || '';
    const incoterm = data.get('incoterm') || '';
    const notes = data.get('notes') || '';

    const msg = encodeURIComponent(
      `*RFQ - Cuan Dong Export*\n\n` +
      `🏢 Company: ${company}\n` +
      `🌍 Country: ${country}\n` +
      `📦 Product: ${product}\n` +
      `⚖️ Volume: ${volume}\n` +
      `🚢 Incoterm: ${incoterm}\n` +
      `📝 Notes: ${notes}`
    );

    window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank');
  });
}

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = target * ease;
    el.textContent = prefix + (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = prefix + target + suffix;
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.counted) {
      e.target.dataset.counted = '1';
      animateCounter(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

/* ===== ACTIVE NAV ===== */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});
