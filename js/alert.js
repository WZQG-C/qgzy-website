/* Small, independent enhancements. The content remains in semantic HTML. */
(() => {
  'use strict';

  const navigation = document.querySelector('#primary-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const mobileQuery = window.matchMedia('(max-width: 680px)');

  function closeMenu() {
    navigation.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', '打开导航菜单');
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? '关闭导航菜单' : '打开导航菜单');
  });

  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', event => {
    if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuToggle.focus();
    }
  });
  mobileQuery.addEventListener('change', closeMenu);

  // Keep the active navigation item aligned with the section nearest the header.
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
  let scrollQueued = false;
  function updateActiveSection() {
    let activeIndex = 0;
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= 150) activeIndex = index;
    });
    navLinks.forEach((link, index) => {
      const isActive = index === activeIndex;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scrollQueued = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollQueued) {
      scrollQueued = true;
      window.requestAnimationFrame(updateActiveSection);
    }
  }, { passive: true });
  window.addEventListener('resize', updateActiveSection);
  updateActiveSection();

  // Filter the member placeholders by direction; the join card remains available.
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const memberCards = [...document.querySelectorAll('.member-card')];
  const filterStatus = document.querySelector('#filter-status');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      filterButtons.forEach(item => {
        const isActive = item === button;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
      memberCards.forEach(card => {
        card.hidden = category !== 'all' && card.dataset.category !== category && card.dataset.category !== 'invite';
      });
      const count = memberCards.filter(card => !card.hidden && card.dataset.category !== 'invite').length;
      filterStatus.textContent = `已选择${button.textContent}，显示 ${count} 个成员资料占位与加入入口。`;
    });
  });

  // This is a fixed output demonstration, not a browser-based C++ compiler.
  const runButton = document.querySelector('#run-code');
  const codeOutput = document.querySelector('#code-output');
  runButton.addEventListener('click', () => {
    runButton.disabled = true;
    runButton.textContent = '演示中…';
    codeOutput.textContent = '❯ 正在展示这段 C++ 示例的输出…';
    window.setTimeout(() => {
      codeOutput.textContent = 'Hello, future!\n让想法，在这里发生。';
      runButton.textContent = '↻ 再次运行';
      runButton.disabled = false;
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 650);
  });

  // Native <dialog> handles focus containment and restores focus to the trigger.
  const joinDialog = document.querySelector('#join-dialog');
  const closeDialog = () => joinDialog.close();
  document.querySelectorAll('[data-join]').forEach(button => {
    button.addEventListener('click', () => {
      closeMenu();
      joinDialog.showModal();
      document.body.classList.add('dialog-open');
    });
  });
  joinDialog.querySelector('.dialog-close').addEventListener('click', closeDialog);
  joinDialog.querySelector('.dialog-explore').addEventListener('click', closeDialog);
  joinDialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  joinDialog.addEventListener('click', event => {
    const bounds = joinDialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (event.target === joinDialog && outside) closeDialog();
  });

  document.querySelector('#current-year').textContent = String(new Date().getFullYear());
})();
