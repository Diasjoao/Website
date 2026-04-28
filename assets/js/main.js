/* Data Engineer Academy — Main JS */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Hamburger nav ──────────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  /* ── Active nav link ────────────────────────────── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === 'index.html' && href === '/') || href.includes(path.replace('.html','')) && href !== '/') {
      a.classList.add('active');
    }
  });

  /* ── Accordion ──────────────────────────────────── */
  document.querySelectorAll('.module-accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isOpen = header.classList.contains('open');
      // close all
      document.querySelectorAll('.module-accordion-header.open').forEach(h => {
        h.classList.remove('open');
        h.nextElementSibling.classList.remove('open');
      });
      if (!isOpen) {
        header.classList.add('open');
        body.classList.add('open');
      }
    });
  });

  /* ── Scroll-top button ──────────────────────────── */
  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('show', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── Smooth fade-up on scroll ────────────────────── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .module-card, .testimonial-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    observer.observe(el);
  });

  /* ── Tab group ──────────────────────────────────── */
  document.querySelectorAll('.tab-group').forEach(group => {
    group.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.target;
        const parent = group.closest('[data-tabs]') || document.querySelector('[data-tabs]');
        if (parent) {
          parent.querySelectorAll('[data-tab]').forEach(p => {
            p.style.display = p.dataset.tab === target ? 'block' : 'none';
          });
        }
      });
    });
  });

  /* ── Copy code blocks ───────────────────────────── */
  document.querySelectorAll('.code-block').forEach(block => {
    const btn = document.createElement('button');
    btn.textContent = 'copiar';
    btn.style.cssText = 'position:absolute;top:10px;right:10px;background:rgba(99,102,241,.3);color:#F1F5F9;border:none;padding:4px 10px;border-radius:6px;font-size:.75rem;cursor:pointer;';
    block.style.position = 'relative';
    block.appendChild(btn);
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(block.innerText.replace('copiar','').trim()).then(() => {
        btn.textContent = 'copiado!';
        setTimeout(() => btn.textContent = 'copiar', 1800);
      });
    });
  });

  /* ── Auto-open first accordion on curriculum page ── */
  const firstHeader = document.querySelector('.module-accordion-header');
  if (firstHeader && window.location.pathname.includes('curso')) {
    firstHeader.classList.add('open');
    firstHeader.nextElementSibling.classList.add('open');
  }

  /* ── Progress bar (simulated for demo) ──────────── */
  document.querySelectorAll('.progress-bar-fill[data-pct]').forEach(bar => {
    bar.style.width = bar.dataset.pct + '%';
  });

});
