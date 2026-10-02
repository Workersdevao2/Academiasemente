/* ============================================
   ACADEMIA SEMENTE - Main Script
   ============================================ */

(function () {
  'use strict';

  // ---------- DOM refs ----------
  const announceBar = document.getElementById('announceBar');
  const siteHeader = document.getElementById('siteHeader');
  const hamburger = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');
  const enrollForm = document.getElementById('enrollForm');
  const contactForm = document.getElementById('contactForm');
  const yearEl = document.getElementById('year');
  const cartBtn = document.getElementById('cartBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartClose = document.getElementById('cartClose');
  const cartBody = document.getElementById('cartBody');
  const cartFooter = document.getElementById('cartFooter');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  const cartClear = document.getElementById('cartClear');
  const cartCheckout = document.getElementById('cartCheckout');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Header scroll ----------
  let lastScroll = 0;
  let ticking = false;

  function updateHeader() {
    if (!siteHeader) { ticking = false; return; }
    const scrollY = window.scrollY;
    var isEnrollPage = document.body.classList.contains('page-enroll');
    if (isEnrollPage || scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
    if (announceBar) {
      if (scrollY > 80 && scrollY > lastScroll) {
        announceBar.classList.add('hidden');
        siteHeader.style.top = '0';
      } else if (scrollY < 40) {
        announceBar.classList.remove('hidden');
        siteHeader.style.top = '';
      }
    }
    lastScroll = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // ---------- Mobile drawer ----------
  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('open')) closeDrawer();
      else openDrawer();
    });
  }
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  document.querySelectorAll('.drawer-nav a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileDrawer && mobileDrawer.classList.contains('open')) closeDrawer();
      if (cartDrawer && cartDrawer.classList.contains('open')) closeCart();
    }
  });

  // ---------- Open WhatsApp helper ----------
  function openWhatsApp(message) {
    var url = 'https://wa.me/244945574700?text=' + encodeURIComponent(message);
    var a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // ---------- Pre-select course from ?course= ----------
  (function preselectCourse() {
    var select = document.getElementById('interest');
    if (!select) return;
    var params = new URLSearchParams(window.location.search);
    var course = params.get('course');
    if (course) select.value = course;
  })();

  // ---------- Contact form → WhatsApp ----------
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameEl = document.getElementById('c-name');
      var phoneEl = document.getElementById('c-phone');
      var interestEl = document.getElementById('c-interest');
      var messageEl = document.getElementById('c-message');
      var name = nameEl ? nameEl.value.trim() : '';
      var phone = phoneEl ? phoneEl.value.trim() : '';
      var interest = interestEl ? interestEl.value : '';
      var message = messageEl ? messageEl.value.trim() : '';
      var text = 'Olá! Sou *' + name + '*.\n';
      text += 'Telefone: ' + phone + '\n';
      text += 'Assunto: ' + interest + '\n';
      if (message) text += '\nMensagem: ' + message;
      openWhatsApp(text);
    });
  }

  // ---------- Enrollment form → WhatsApp ----------
  if (enrollForm) {
    enrollForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name').value.trim();
      var phone = document.getElementById('phone').value.trim();
      var addressEl = document.getElementById('address');
      var provinceEl = document.getElementById('province');
      var municipalityEl = document.getElementById('municipality');
      var scheduleEl = document.getElementById('schedule');
      var messageEl = document.getElementById('message');
      var address = addressEl ? addressEl.value.trim() : '';
      var province = provinceEl ? provinceEl.value : '';
      var municipality = municipalityEl ? municipalityEl.value.trim() : '';
      var interest = document.getElementById('interest').value;
      var schedule = scheduleEl ? scheduleEl.value : '';
      var message = messageEl ? messageEl.value.trim() : '';
      var text = 'Olá! Gostaria de *inscrever-me* na Academia Semente.\n\n';
      text += 'Nome: *' + name + '*\n';
      text += 'Telefone: ' + phone + '\n';
      text += 'Morada: ' + address + '\n';
      text += 'Província: ' + province + '\n';
      text += 'Município: ' + municipality + '\n';
      text += 'Curso pretendido: *' + interest + '*\n';
      text += 'Horário: *' + schedule + '*\n';
      if (message) text += '\nNotas: ' + message;
      openWhatsApp(text);
    });
  }

  // ---------- CART ----------
  // currentLang must exist before any updateCartUI() call (translations may still be pending)
  var currentLang = 'pt';
  let cart = JSON.parse(localStorage.getItem('as_cart') || '[]');

  function saveCart() {
    localStorage.setItem('as_cart', JSON.stringify(cart));
  }

  function formatPrice(n) {
    return n.toLocaleString('pt-AO') + ' Kz';
  }

  function getCartQty() {
    return cart.reduce(function (s, i) { return s + i.qty; }, 0);
  }

  function getCartTotal() {
    return cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  }

  function getCartEmptyLabel() {
    try {
      if (typeof translations !== 'undefined' && translations[currentLang] && translations[currentLang].cartEmpty) {
        return translations[currentLang].cartEmpty;
      }
    } catch (e) { /* ignore */ }
    return 'O seu carrinho está vazio.';
  }

  function updateCartUI() {
    var qty = getCartQty();
    if (cartCount) {
      cartCount.textContent = qty;
      cartCount.classList.toggle('visible', qty > 0);
    }
    if (!cartBody) return;

    if (cart.length === 0) {
      cartBody.innerHTML = '<p class="cart-empty">' + getCartEmptyLabel() + '</p>';
      if (cartFooter) {
        cartFooter.hidden = true;
        cartFooter.setAttribute('hidden', '');
      }
      if (cartTotal) cartTotal.textContent = formatPrice(0);
      return;
    }

    if (cartFooter) { cartFooter.hidden = false; cartFooter.removeAttribute('hidden'); }
    if (cartTotal) cartTotal.textContent = formatPrice(getCartTotal());

    cartBody.innerHTML = cart.map(function (item) {
      var label = (currentLang === 'en' && item.nameEn) ? item.nameEn : item.name;
      return '<div class="cart-item" data-id="' + item.id + '">' +
        '<div class="cart-item-info">' +
          '<div class="cart-item-name">' + label + '</div>' +
          '<div class="cart-item-price">' + formatPrice(item.price) + '</div>' +
          '<div class="cart-item-actions">' +
            '<button type="button" class="qty-btn qty-minus" data-id="' + item.id + '" aria-label="Diminuir">−</button>' +
            '<span class="qty-value">' + item.qty + '</span>' +
            '<button type="button" class="qty-btn qty-plus" data-id="' + item.id + '" aria-label="Aumentar">+</button>' +
            '<button type="button" class="cart-item-remove" data-id="' + item.id + '" aria-label="Remover">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function addToCart(id, name, price, nameEn) {
    var existing = cart.find(function (i) { return i.id === id; });
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: id, name: name, price: Number(price), qty: 1, nameEn: nameEn || name });
    }
    saveCart();
    updateCartUI();
    openCart();
  }

  function changeQty(id, delta) {
    var item = cart.find(function (i) { return i.id === id; });
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(function (i) { return i.id !== id; });
    saveCart();
    updateCartUI();
  }

  function removeItem(id) {
    cart = cart.filter(function (i) { return i.id !== id; });
    saveCart();
    updateCartUI();
  }

  function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
  }

  function openCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.add('open');
    if (cartOverlay) cartOverlay.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cart-open');
  }

  function closeCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cart-open');
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  function checkoutWhatsApp() {
    if (cart.length === 0) return;
    var msg = 'Olá! Gostaria de encomendar os seguintes produtos:\n\n';
    cart.forEach(function (item) {
      var label = (currentLang === 'en' && item.nameEn) ? item.nameEn : item.name;
      msg += '• ' + label + ' × ' + item.qty + ' - ' + formatPrice(item.price * item.qty) + '\n';
    });
    msg += '\n*Total: ' + formatPrice(getCartTotal()) + '*';
    var url = 'https://wa.me/244945574700?text=' + encodeURIComponent(msg);
    // Mobile-friendly open (window.open is often blocked on iOS)
    var a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Delegate all cart actions from the drawer (survives re-renders, works on SVG taps)
  if (cartDrawer) {
    cartDrawer.addEventListener('click', function (e) {
      var t = e.target;
      if (!t || !t.closest) return;

      if (t.closest('#cartClear') || t.closest('.cart-clear')) {
        e.preventDefault();
        clearCart();
        return;
      }
      if (t.closest('#cartCheckout')) {
        e.preventDefault();
        checkoutWhatsApp();
        return;
      }
      var minus = t.closest('.qty-minus');
      if (minus) {
        e.preventDefault();
        changeQty(minus.getAttribute('data-id'), -1);
        return;
      }
      var plus = t.closest('.qty-plus');
      if (plus) {
        e.preventDefault();
        changeQty(plus.getAttribute('data-id'), 1);
        return;
      }
      var remove = t.closest('.cart-item-remove');
      if (remove) {
        e.preventDefault();
        removeItem(remove.getAttribute('data-id'));
        return;
      }
    });
  }

  document.querySelectorAll('.add-to-cart').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.product-card');
      if (!card) return;
      addToCart(card.dataset.id, card.dataset.name, card.dataset.price, card.dataset.nameEn);
    });
  });

  // Swipe right to close cart - ignore when starting on a button/link
  var touchStartX = 0;
  var touchCurrentX = 0;
  var isSwiping = false;
  var swipeArmed = false;

  if (cartDrawer) {
    cartDrawer.addEventListener('touchstart', function (e) {
      var el = e.target;
      if (el && el.closest && el.closest('button, a, input, select, textarea, .qty-btn, .cart-item-remove, .cart-clear, #cartCheckout, #cartClear, #cartClose')) {
        isSwiping = false;
        swipeArmed = false;
        return;
      }
      touchStartX = e.touches[0].clientX;
      touchCurrentX = touchStartX;
      isSwiping = true;
      swipeArmed = false;
    }, { passive: true });

    cartDrawer.addEventListener('touchmove', function (e) {
      if (!isSwiping) return;
      touchCurrentX = e.touches[0].clientX;
      var diff = touchCurrentX - touchStartX;
      // Only start visual swipe after a threshold so taps still register as clicks
      if (diff > 12) {
        swipeArmed = true;
        cartDrawer.style.transform = 'translateX(' + diff + 'px)';
      }
    }, { passive: true });

    cartDrawer.addEventListener('touchend', function () {
      if (!isSwiping) return;
      isSwiping = false;
      var diff = touchCurrentX - touchStartX;
      cartDrawer.style.transform = '';
      if (swipeArmed && diff > 80) closeCart();
      touchStartX = 0;
      touchCurrentX = 0;
      swipeArmed = false;
    });
  }

  updateCartUI();


  // ---------- Product image slider (polo) ----------
  function initProductSliders() {
    document.querySelectorAll('[data-slider]').forEach(function (slider) {
      var track = slider.querySelector('.slider-track');
      var dots = slider.querySelectorAll('.slider-dot');
      var prev = slider.querySelector('.slider-prev');
      var next = slider.querySelector('.slider-next');
      var index = 0;
      var count = track ? track.querySelectorAll('img').length : 0;
      if (!track || count < 2) return;

      function goTo(i) {
        index = (i + count) % count;
        track.style.transform = 'translateX(' + (-index * 50) + '%)';
        dots.forEach(function (d, di) {
          d.classList.toggle('active', di === index);
        });
      }

      if (prev) prev.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        goTo(index - 1);
      });
      if (next) next.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        goTo(index + 1);
      });
      dots.forEach(function (dot) {
        dot.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          goTo(Number(dot.getAttribute('data-slide')) || 0);
        });
      });

      // Touch swipe
      var startX = 0;
      var currentX = 0;
      var dragging = false;

      slider.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        currentX = startX;
        dragging = true;
      }, { passive: true });

      slider.addEventListener('touchmove', function (e) {
        if (!dragging) return;
        currentX = e.touches[0].clientX;
      }, { passive: true });

      slider.addEventListener('touchend', function () {
        if (!dragging) return;
        dragging = false;
        var diff = currentX - startX;
        if (diff < -40) goTo(index + 1);
        else if (diff > 40) goTo(index - 1);
      });

      // Mouse drag (desktop)
      var mouseDown = false;
      slider.addEventListener('mousedown', function (e) {
        if (e.target.closest('button')) return;
        mouseDown = true;
        startX = e.clientX;
        currentX = startX;
      });
      window.addEventListener('mousemove', function (e) {
        if (!mouseDown) return;
        currentX = e.clientX;
      });
      window.addEventListener('mouseup', function () {
        if (!mouseDown) return;
        mouseDown = false;
        var diff = currentX - startX;
        if (diff < -40) goTo(index + 1);
        else if (diff > 40) goTo(index - 1);
      });
    });
  }
  initProductSliders();

  // ---------- Language ----------
  var translations = {
    pt: {
      announce: 'Inscrições abertas',
      announceAccent: 'Teste de nível gratuito',
      tagline: 'Cultivando conhecimento',
      navHome: 'Início',
      navAbout: 'Sobre',
      navCourses: 'Cursos',
      navProducts: 'Produtos',
      navContact: 'Contacto',
      navEnroll: 'Inscrição',
      heroEyebrow: 'Formação em Inglês · Angola',
      heroTitle: 'Aprenda inglês<br>para a vida real',
      heroSubtitle: 'Metodologia exclusiva que transforma o português que você já fala em inglês fluente, em até 12 meses.',
      heroCta: 'Ver cursos',
      heroCta2: 'Falar no WhatsApp',
      scroll: 'Scroll',
      aboutEyebrow: 'A Academia',
      aboutTitle: 'Toda grande conquista<br>começa por uma semente',
      aboutP1: 'A Academia Semente nasceu da necessidade de preencher as lacunas no ensino de inglês em Angola e das dificuldades que falantes de português enfrentam ao aprender esta língua.',
      aboutP2: 'Utilizamos uma metodologia exclusiva, uma reformulação ideológica que funciona como ponte mental, para que o aluno consiga reproduzir tudo o que fala em português para inglês por meio de padrões e passe a pensar apenas em inglês.',
      aboutP3: 'Foco em empregabilidade e vida real: o mercado não quer aluno que tira 20 na prova e trava na entrevista.',
      statStudents: 'Alunos formados',
      statCenters: 'Centros em Angola',
      statMonths: 'Meses para fluência',
      statAI: 'IA de apoio',
      missionTitle: 'Missão',
      missionText: 'Formar angolanos comunicativos, empregáveis e confiantes em inglês, em até 12 meses, usando tecnologia e prática real.',
      visionTitle: 'Visão',
      visionText: 'Ser o centro de inglês de referência em Angola que forma líderes bilingues, conectando angolanos a oportunidades globais.',
      coursesEyebrow: 'Modalidades',
      coursesTitle: 'Escolha o formato<br>que se adapta a si',
      coursesDesc: 'Aulas presenciais, online ou ao domicílio. Todas com a mesma metodologia exclusiva e acompanhamento individual.',
      onlineTitle: 'Online',
      onlineTag: 'Flexível',
      presencialTitle: 'Presencial',
      presencialTag: 'Híbrido',
      domiciliarTitle: 'Domiciliar',
      domiciliarTag: 'Premium',
      perMonth: '/mês',
      popular: 'Mais escolhido',
      onlineF1: 'Aulas individualizadas',
      onlineF2: 'Estude a qualquer hora e em qualquer lugar',
      onlineF3: 'Método por etapas para evolução garantida',
      onlineF4: 'IA de apoio 24 horas',
      onlineF5: 'Feedback mensal em vídeo',
      presencialF1: 'Aulas diretas e interativas',
      presencialF2: 'Ambiente de aprendizagem focado',
      presencialF3: '3 dias presenciais + 2 online',
      presencialF4: 'Eventos reais (English Day, debates)',
      presencialF5: 'Comunidade WhatsApp só em inglês',
      domiciliarF1: 'Atenção 100% focada no aluno',
      domiciliarF2: 'Professor desloca-se até si',
      domiciliarF3: 'Horário completamente flexível',
      domiciliarF4: 'Plano de estudos personalizado',
      domiciliarF5: 'Acompanhamento intensivo',
      enrollBtn: 'Inscrever-me',
      schedulesTitle: 'Horários disponíveis',
      morning: 'Manhã',
      afternoon: 'Tarde',
      freeTest: 'Teste de nível gratuito · Sem compromisso',
      productsEyebrow: 'Loja',
      productsTitle: 'Materiais e produtos<br>oficiais',
      productsDesc: 'Leve a Academia Semente consigo. Materiais pensados para acelerar a sua evolução.',
      prod1Title: 'Caderno de Padrões',
      prod1Desc: 'Caderno exclusivo com os padrões da metodologia Semente para prática diária.',
      prod2Title: 'Polo Oficial',
      prod2Desc: 'Polo premium de manga comprida com o logotipo Academia Semente. Acabamento profissional.',
      prod3Title: 'Kit Canetas Semente',
      prod3Desc: 'Conjunto de 3 canetas premium com a marca Academia Semente.',
      prod4Title: 'Manual do Aluno',
      prod4Desc: 'Guia completo da metodologia Semente com exercícios e padrões avançados.',
      buyBtn: 'Adicionar',
      diffEyebrow: 'Porquê nós',
      diffTitle: 'O que nos torna<br>diferentes',
      diff1Title: 'Metodologia exclusiva',
      diff1Text: 'Ponte mental que permite pensar directamente em inglês a partir do português.',
      diff2Title: 'Foco em empregabilidade',
      diff2Text: 'Entrevistas, e-mails corporativos e atendimento ao cliente, inglês para o mercado.',
      diff3Title: 'Tecnologia + humano',
      diff3Text: 'IA 24h para prática + professor como coach de comunicação.',
      diff4Title: 'Ambiente sem julgamento',
      diff4Text: 'Sala onde errar é normal. Quebramos o medo de falar.',
      enrollEyebrow: 'Inscrição',
      enrollTitle: 'Inscreva-se agora',
      enrollDesc: 'Preencha o formulário completo e envie a sua inscrição directamente no WhatsApp. Confirmamos a vaga e o teste de nível gratuito.',
      contactEyebrow: 'Contacto',
      contactTitle: 'Fale connosco',
      contactDesc: 'Envie-nos uma mensagem. Respondemos rapidamente via WhatsApp. Para se inscrever num curso, use a página de inscrição.',
      locationLabel: 'Localização',
      phoneLabel: 'WhatsApp',
      emailLabel: 'Email',
      socialLabel: 'Redes sociais',
      formName: 'Nome completo',
      formNamePh: 'O seu nome',
      formPhone: 'Telefone / WhatsApp',
      formPhonePh: '+244 ...',
      formInterest: 'Assunto',
      formMessage: 'Mensagem',
      formMessagePh: 'Como podemos ajudar?',
      formSubmit: 'Enviar via WhatsApp',
      formCourse: 'Curso pretendido',
      formAddress: 'Morada',
      formAddressPh: 'Rua, bairro, número',
      formProvince: 'Província',
      formProvincePh: 'Seleccione a província',
      formMunicipality: 'Município',
      formMunicipalityPh: 'Ex.: Belas, Viana, Cacuaco',
      formSchedule: 'Horários disponíveis',
      formSchedulePh: 'Seleccione o horário',
      formNotes: 'Notas (opcional)',
      formNotesPh: 'Dúvidas ou informações adicionais',
      formEnrollSubmit: 'Inscrever-me via WhatsApp',
      formHint: 'Ao enviar, abre o WhatsApp com a sua inscrição pré-preenchida.',
      optOnline: 'Curso Online',
      optPresencial: 'Curso Presencial',
      optDomiciliar: 'Curso Domiciliar',
      optLevelTest: 'Teste de nível gratuito',
      optMorning: '08h - 10h · Manhã',
      optAfternoon: '14h - 16h · Tarde',
      optFlexible: 'Flexível / a combinar',
      optGeneral: 'Informações gerais',
      optCourses: 'Cursos',
      optProducts: 'Produtos / Materiais',
      optPartner: 'Parcerias',
      optOther: 'Outro',
      footerTag: 'Cultivando conhecimento, formando futuros.',
      rights: 'Todos os direitos reservados.',
      cartTitle: 'Carrinho',
      cartEmpty: 'O seu carrinho está vazio.',
      cartTotal: 'Total',
      cartClear: 'Limpar tudo',
      cartCheckout: 'Finalizar no WhatsApp'
    },
    en: {
      announce: 'Enrolments open',
      announceAccent: 'Free level test',
      tagline: 'Cultivating knowledge',
      navHome: 'Home',
      navAbout: 'About',
      navCourses: 'Courses',
      navProducts: 'Products',
      navContact: 'Contact',
      navEnroll: 'Enrol',
      heroEyebrow: 'English Training · Angola',
      heroTitle: 'Learn English<br>for real life',
      heroSubtitle: 'Exclusive methodology that turns the Portuguese you already speak into fluent English, in up to 12 months.',
      heroCta: 'View courses',
      heroCta2: 'Chat on WhatsApp',
      scroll: 'Scroll',
      aboutEyebrow: 'The Academy',
      aboutTitle: 'Every great achievement<br>begins with a seed',
      aboutP1: 'Academia Semente was born to fill the gaps in English teaching in Angola and the difficulties Portuguese speakers face when learning this language.',
      aboutP2: 'We use an exclusive methodology, an ideological reformulation that works as a mental bridge, so students can transfer everything they say in Portuguese into English through patterns and start thinking only in English.',
      aboutP3: 'Focus on employability and real life: the market does not want students who score 20 on tests but freeze in interviews.',
      statStudents: 'Students trained',
      statCenters: 'Centres in Angola',
      statMonths: 'Months to fluency',
      statAI: 'AI support',
      missionTitle: 'Mission',
      missionText: 'Train communicative, employable and confident Angolans in English within 12 months, using technology and real practice.',
      visionTitle: 'Vision',
      visionText: 'To be the reference English centre in Angola that forms bilingual leaders, connecting Angolans to global opportunities.',
      coursesEyebrow: 'Formats',
      coursesTitle: 'Choose the format<br>that fits you',
      coursesDesc: 'In-person, online or home classes. All with the same exclusive methodology and individual support.',
      onlineTitle: 'Online',
      onlineTag: 'Flexible',
      presencialTitle: 'In-person',
      presencialTag: 'Hybrid',
      domiciliarTitle: 'Home',
      domiciliarTag: 'Premium',
      perMonth: '/month',
      popular: 'Most popular',
      onlineF1: 'Individual classes',
      onlineF2: 'Study anytime, anywhere',
      onlineF3: 'Step-by-step method for guaranteed progress',
      onlineF4: '24-hour AI support',
      onlineF5: 'Monthly video feedback',
      presencialF1: 'Direct and interactive classes',
      presencialF2: 'Focused learning environment',
      presencialF3: '3 in-person days + 2 online',
      presencialF4: 'Real events (English Day, debates)',
      presencialF5: 'WhatsApp community in English only',
      domiciliarF1: '100% focused attention on the student',
      domiciliarF2: 'Teacher comes to you',
      domiciliarF3: 'Fully flexible schedule',
      domiciliarF4: 'Personalised study plan',
      domiciliarF5: 'Intensive follow-up',
      enrollBtn: 'Enrol now',
      schedulesTitle: 'Available schedules',
      morning: 'Morning',
      afternoon: 'Afternoon',
      freeTest: 'Free level test · No commitment',
      productsEyebrow: 'Shop',
      productsTitle: 'Official materials<br>& products',
      productsDesc: 'Take Academia Semente with you. Materials designed to accelerate your progress.',
      prod1Title: 'Patterns Notebook',
      prod1Desc: 'Exclusive notebook with Semente methodology patterns for daily practice.',
      prod2Title: 'Official Polo',
      prod2Desc: 'Premium long-sleeve polo with the Academia Semente logo. Professional finish.',
      prod3Title: 'Semente Pen Kit',
      prod3Desc: 'Set of 3 premium pens with the Academia Semente brand.',
      prod4Title: 'Student Manual',
      prod4Desc: 'Complete guide to the Semente methodology with exercises and advanced patterns.',
      buyBtn: 'Add',
      diffEyebrow: 'Why us',
      diffTitle: 'What makes us<br>different',
      diff1Title: 'Exclusive methodology',
      diff1Text: 'Mental bridge that allows thinking directly in English from Portuguese.',
      diff2Title: 'Employability focus',
      diff2Text: 'Interviews, corporate emails and customer service, English for the market.',
      diff3Title: 'Technology + human',
      diff3Text: '24h AI for practice + teacher as communication coach.',
      diff4Title: 'Judgement-free space',
      diff4Text: 'A room where mistakes are normal. We break the fear of speaking.',
      enrollEyebrow: 'Enrolment',
      enrollTitle: 'Enrol now',
      enrollDesc: 'Fill in the full form and send your enrolment directly on WhatsApp. We confirm your place and the free level test.',
      contactEyebrow: 'Contact',
      contactTitle: 'Get in touch',
      contactDesc: 'Send us a message. We reply quickly via WhatsApp. To enrol in a course, use the enrolment page.',
      locationLabel: 'Location',
      phoneLabel: 'WhatsApp',
      emailLabel: 'Email',
      socialLabel: 'Social media',
      formName: 'Full name',
      formNamePh: 'Your name',
      formPhone: 'Phone / WhatsApp',
      formPhonePh: '+244 ...',
      formInterest: 'Subject',
      formMessage: 'Message',
      formMessagePh: 'How can we help?',
      formSubmit: 'Send via WhatsApp',
      formCourse: 'Preferred course',
      formAddress: 'Address',
      formAddressPh: 'Street, neighbourhood, number',
      formProvince: 'Province',
      formProvincePh: 'Select province',
      formMunicipality: 'Municipality',
      formMunicipalityPh: 'e.g. Belas, Viana, Cacuaco',
      formSchedule: 'Available schedules',
      formSchedulePh: 'Select schedule',
      formNotes: 'Notes (optional)',
      formNotesPh: 'Questions or extra details',
      formEnrollSubmit: 'Enrol via WhatsApp',
      formHint: 'Submitting opens WhatsApp with your enrolment pre-filled.',
      optOnline: 'Online Course',
      optPresencial: 'In-person Course',
      optDomiciliar: 'Home Course',
      optLevelTest: 'Free level test',
      optMorning: '08h - 10h · Morning',
      optAfternoon: '14h - 16h · Afternoon',
      optFlexible: 'Flexible / to arrange',
      optGeneral: 'General information',
      optCourses: 'Courses',
      optProducts: 'Products / Materials',
      optPartner: 'Partnerships',
      optOther: 'Other',
      footerTag: 'Cultivating knowledge, forming futures.',
      rights: 'All rights reserved.',
      cartTitle: 'Cart',
      cartEmpty: 'Your cart is empty.',
      cartTotal: 'Total',
      cartClear: 'Clear all',
      cartCheckout: 'Checkout on WhatsApp'
    }
  };

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    var t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.placeholder = t[key];
    });
    document.querySelectorAll('select option[data-i18n]').forEach(function (opt) {
      var key = opt.getAttribute('data-i18n');
      if (t[key] !== undefined) opt.textContent = t[key];
    });
    updateCartUI();
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { setLanguage(btn.dataset.lang); });
  });

  setLanguage('pt');

})();
