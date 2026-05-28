document.getElementById('year').textContent = new Date().getFullYear();

// Cursor glow follows pointer
const glow = document.getElementById('cursorGlow');
window.addEventListener('pointermove', (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
  glow.style.opacity = '1';
});
window.addEventListener('pointerleave', () => {
  glow.style.opacity = '0';
});

// Scroll-triggered reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// 3D tilt on [data-tilt] elements
document.querySelectorAll('[data-tilt]').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const rotateY = (((e.clientX - rect.left) / rect.width) - 0.5) * 10;
    const rotateX = (((e.clientY - rect.top) / rect.height) - 0.5) * -10;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

// Staggered float animation on tech chips
const chips = document.querySelectorAll('#techCloud .chip');
const floatStyle = document.createElement('style');
floatStyle.textContent = `
  @keyframes floatChip {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
`;
document.head.appendChild(floatStyle);
chips.forEach((chip, i) => {
  chip.style.animation = `floatChip ${3.8 + (i % 5) * 0.25}s ease-in-out ${i * 0.06}s infinite`;
});
