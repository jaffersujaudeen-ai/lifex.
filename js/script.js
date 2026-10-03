
(function(){
  // mobile menu
  var burger=document.getElementById('burgerBtn'), menu=document.getElementById('mobilemenu');
  burger.addEventListener('click', function(){ menu.classList.toggle('open'); });
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ menu.classList.remove('open'); }); });

  // scroll reveal
  var els = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:.15});
    els.forEach(function(el){ io.observe(el); });

    var eco = document.getElementById('ecoSvg');
    var ioEco = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ eco.classList.add('in'); ioEco.unobserve(eco); } });
    }, {threshold:.3});
    ioEco.observe(eco);
  } else {
    els.forEach(function(el){ el.classList.add('in'); });
  }

  // nav active link on scroll
  var navLinks = document.querySelectorAll('nav.links a');
  var sections = Array.prototype.map.call(navLinks, function(a){ return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  function onScroll(){
    var y = window.scrollY + 120;
    var current = null;
    sections.forEach(function(s){ if(s && s.offsetTop <= y) current = s; });
    navLinks.forEach(function(a){ a.classList.remove('active'); });
    if(current){
      var match = Array.prototype.find.call(navLinks, function(a){ return a.getAttribute('href') === '#'+current.id; });
      if(match) match.classList.add('active');
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});

  // tabs
  var tabbar = document.getElementById('tabbar');
  tabbar.addEventListener('click', function(e){
    var btn = e.target.closest('button'); if(!btn) return;
    tabbar.querySelectorAll('button').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    document.querySelectorAll('.tabpanel').forEach(function(p){ p.classList.remove('active'); });
    document.querySelector('.tabpanel[data-panel="'+btn.dataset.tab+'"]').classList.add('active');
  });

  // video play overlay
  var video = document.getElementById('crisisVideo'), overlay = document.getElementById('playOverlay');
  overlay.addEventListener('click', function(){
    video.play(); overlay.classList.add('hidden');
  });
  video.addEventListener('pause', function(){ if(video.currentTime>0 && !video.ended) overlay.classList.remove('hidden'); });
  video.addEventListener('play', function(){ overlay.classList.add('hidden'); });

  // gallery lightbox
  var lb = document.getElementById('lightbox'), lbImg = document.getElementById('lbImg');
  document.querySelectorAll('.gal-item').forEach(function(item){
    item.addEventListener('click', function(){ lbImg.src = item.dataset.full; lb.classList.add('open'); });
  });
  document.getElementById('lbClose').addEventListener('click', function(){ lb.classList.remove('open'); lbImg.src=''; });
  lb.addEventListener('click', function(e){ if(e.target===lb){ lb.classList.remove('open'); lbImg.src=''; } });
})();

