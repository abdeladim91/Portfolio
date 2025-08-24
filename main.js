gsap.fromTo('#portrait', {y:100, opacity: 0}, {y:0, rotation:0, opacity: 1, duration:2});
gsap.fromTo('.margin-inline', {x:100, opacity: 0}, {x:0, rotation:0, opacity: 1, duration:2});
gsap.fromTo('.text1', {x:-100, opacity: 0}, {x:0, rotation:0, opacity: 1, duration:1, scrollTrigger: {
  trigger: '.text1',start: 'top 50%'}});
gsap.fromTo('.text2', {y:-100, opacity: 0}, {y:0, rotation:0, opacity: 1, duration:1, scrollTrigger: {

  trigger: '.text2',start: 'top 50%'}});

 // Mobile menu toggle
    const btn = document.getElementById('mobileBtn');
    const menu = document.getElementById('mobileMenu');
    btn?.addEventListener('click', () => menu.classList.toggle('hidden'));

    // Smooth scroll (optional enhancement)
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', e=>{
        const id = a.getAttribute('href');
        if(id.length > 1){
          e.preventDefault();
          document.querySelector(id)?.scrollIntoView({behavior:'smooth'});
          menu?.classList.add('hidden');
        }
      });
    });



    
     document.querySelectorAll('.contact-card').forEach(card => {
      const glow = card.querySelector('.cursor-glow');
      const core = card.querySelector('.cursor-core');

      let rect, targetX = 0, targetY = 0, x = 0, y = 0, rafId = null;
      const smooth = 0.12; // lower = more trailing, higher = snappier

      function updateRect(){ rect = card.getBoundingClientRect(); }

      function frame(){
        // Smooth follow (lerp)
        x += (targetX - x) * smooth;
        y += (targetY - y) * smooth;

        glow.style.left = x + 'px';
        glow.style.top  = y + 'px';
        core.style.left = x + 'px';
        core.style.top  = y + 'px';

        // Opacity follows cursor distance (center -> brighter)
        const cx = rect.width / 2, cy = rect.height / 2;
        const dx = x - cx, dy = y - cy;
        const dist = Math.hypot(dx, dy);
        const maxDist = Math.hypot(rect.width, rect.height) / 2;
        const t = 1 - Math.min(dist / maxDist, 1); // 0..1
        const o = 0.25 + 0.75 * (t * t);           // ease curve

        glow.style.opacity = o;
        core.style.opacity = Math.min(1, o + 0.1);

        rafId = requestAnimationFrame(frame);
      }

      card.addEventListener('mouseenter', (e) => {
        updateRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
        x = targetX; y = targetY; // start at cursor
        if (!rafId) rafId = requestAnimationFrame(frame);
      });

      card.addEventListener('mousemove', (e) => {
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
      });

      card.addEventListener('mouseleave', () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        glow.style.opacity = 0;
        core.style.opacity = 0;
      });

      window.addEventListener('resize', () => { if (rafId) updateRect(); });
    });
