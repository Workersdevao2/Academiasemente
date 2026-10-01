/* ============================================
   ACADEMIA SEMENTE — Main Script
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
  const contactForm = document.getElementById('contactForm');
  const yearEl = document.getElementById('year');

  // ---------- Year ----------
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Header scroll behaviour ----------
  let lastScroll = 0;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;

    // Scrolled state (solid header)
    if (scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // Announce bar hide on scroll down
    if (scrollY > 80 && scrollY > lastScroll) {
      announceBar.classList.add('hidden');
      siteHeader.style.top = '0';
    } else if (scrollY < 40) {
      announceBar.classList.remove('hidden');
      siteHeader.style.top = '';
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

  if (hamburger) hamburger.addEventListener('click', () => {
    if (mobileDrawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // Close drawer on nav link click
  document.querySelectorAll('.drawer-nav a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // ---------- Contact form → WhatsApp ----------
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const interest = document.getElementById('interest').value;
      const message = document.getElementById('message').value.trim();

      let text = `Olá! Sou *${name}*.\n`;
      text += `Telefone: ${phone}\n`;
      text += `Interesse: ${interest}\n`;
      if (message) text += `\nMensagem: ${message}`;

      const encoded = encodeURIComponent(text);
      const waUrl = `https://wa.me/244945574700?text=${encoded}`;

      window.open(waUrl, '_blank', 'noopener');
    });
  }

  // ---------- Language toggle ----------
  const translations = {
    pt: {
      // Announce
      announce: 'Inscrições abertas',
      announceAccent: 'Teste de nível gratuito',
      tagline: 'Cultivando conhecimento',

      // Nav
      navHome: 'Início',
      navAbout: 'Sobre',
      navCourses: 'Cursos',
      navProducts: 'Produtos',
      navContact: 'Contacto',

      // Hero
      heroEyebrow: 'Formação em Inglês · Angola',
      heroTitle: 'Aprenda inglês<br>para a vida real',
      heroSubtitle: 'Metodologia exclusiva que transforma o português que você já fala em inglês fluente — em até 12 meses.',
      heroCta: 'Ver cursos',
      heroCta2: 'Falar no WhatsApp',
      scroll: 'Scroll',

      // About
      aboutEyebrow: 'A Academia',
      aboutTitle: 'Toda grande conquista<br>começa por uma semente',
      aboutP1: 'A Academia Semente nasceu da necessidade de preencher as lacunas no ensino de inglês em Angola e das dificuldades que falantes de português enfrentam ao aprender esta língua.',
      aboutP2: 'Utilizamos uma metodologia exclusiva — uma reformulação ideológica que funciona como ponte mental — para que o aluno consiga reproduzir tudo o que fala em português para inglês por meio de padrões e passe a pensar apenas em inglês.',
      aboutP3: 'Foco em empregabilidade e vida real: o mercado não quer aluno que tira 20 na prova e trava na entrevista.',
      statStudents: 'Alunos formados',
      statCenters: 'Centros em Angola',
      statMonths: 'Meses para fluência',
      statAI: 'IA de apoio',
      missionTitle: 'Missão',
      missionText: 'Formar angolanos comunicativos, empregáveis e confiantes em inglês, em até 12 meses, usando tecnologia e prática real.',
      visionTitle: 'Visão',
      visionText: 'Ser o centro de inglês de referência em Angola que forma líderes bilingues, conectando angolanos a oportunidades globais.',

      // Courses
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

      // Products
      productsEyebrow: 'Loja',
      productsTitle: 'Materiais e produtos<br>oficiais',
      productsDesc: 'Leve a Academia Semente consigo. Materiais pensados para acelerar a sua evolução.',
      prod1Title: 'Caderno de Padrões',
      prod1Desc: 'Caderno exclusivo com os padrões da metodologia Semente para prática diária.',
      prod2Title: 'Camiseta Oficial',
      prod2Desc: 'Camiseta premium com o logotipo Academia Semente. Algodão de alta qualidade.',
      prod3Title: 'Kit Canetas Semente',
      prod3Desc: 'Conjunto de 3 canetas premium com a marca Academia Semente.',
      prod4Title: 'Manual do Aluno',
      prod4Desc: 'Guia completo da metodologia Semente com exercícios e padrões avançados.',
      buyBtn: 'Comprar',

      // Diff
      diffEyebrow: 'Porquê nós',
      diffTitle: 'O que nos torna<br>diferentes',
      diff1Title: 'Metodologia exclusiva',
      diff1Text: 'Ponte mental que permite pensar directamente em inglês a partir do português.',
      diff2Title: 'Foco em empregabilidade',
      diff2Text: 'Entrevistas, e-mails corporativos e atendimento ao cliente — inglês para o mercado.',
      diff3Title: 'Tecnologia + humano',
      diff3Text: 'IA 24h para prática + professor como coach de comunicação.',
      diff4Title: 'Ambiente sem julgamento',
      diff4Text: 'Sala onde errar é normal. Quebramos o medo de falar.',

      // Contact
      contactEyebrow: 'Contacto',
      contactTitle: 'Comece a sua jornada',
      contactDesc: 'Envie-nos uma mensagem. Respondemos rapidamente via WhatsApp.',
      locationLabel: 'Localização',
      phoneLabel: 'WhatsApp',
      emailLabel: 'Email',
      socialLabel: 'Redes sociais',
      formName: 'Nome completo',
      formNamePh: 'O seu nome',
      formPhone: 'Telefone / WhatsApp',
      formPhonePh: '+244 ...',
      formInterest: 'Interesse',
      formMessage: 'Mensagem',
      formMessagePh: 'Como podemos ajudar?',
      formSubmit: 'Enviar via WhatsApp',
      optOnline: 'Curso Online',
      optPresencial: 'Curso Presencial',
      optDomiciliar: 'Curso Domiciliar',
      optProducts: 'Produtos / Materiais',
      optOther: 'Outro',

      // Footer
      footerTag: 'Cultivando conhecimento, formando futuros.',
      rights: 'Todos os direitos reservados.'
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

      heroEyebrow: 'English Training · Angola',
      heroTitle: 'Learn English<br>for real life',
      heroSubtitle: 'Exclusive methodology that turns the Portuguese you already speak into fluent English — in up to 12 months.',
      heroCta: 'View courses',
      heroCta2: 'Chat on WhatsApp',
      scroll: 'Scroll',

      aboutEyebrow: 'The Academy',
      aboutTitle: 'Every great achievement<br>begins with a seed',
      aboutP1: 'Academia Semente was born to fill the gaps in English teaching in Angola and the difficulties Portuguese speakers face when learning this language.',
      aboutP2: 'We use an exclusive methodology — an ideological reformulation that works as a mental bridge — so students can transfer everything they say in Portuguese into English through patterns and start thinking only in English.',
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
      prod2Title: 'Official T-shirt',
      prod2Desc: 'Premium t-shirt with the Academia Semente logo. High-quality cotton.',
      prod3Title: 'Semente Pen Kit',
      prod3Desc: 'Set of 3 premium pens with the Academia Semente brand.',
      prod4Title: 'Student Manual',
      prod4Desc: 'Complete guide to the Semente methodology with exercises and advanced patterns.',
      buyBtn: 'Buy',

      diffEyebrow: 'Why us',
      diffTitle: 'What makes us<br>different',
      diff1Title: 'Exclusive methodology',
      diff1Text: 'Mental bridge that allows thinking directly in English from Portuguese.',
      diff2Title: 'Employability focus',
      diff2Text: 'Interviews, corporate emails and customer service — English for the market.',
      diff3Title: 'Technology + human',
      diff3Text: '24h AI for practice + teacher as communication coach.',
      diff4Title: 'Judgement-free space',
      diff4Text: 'A room where mistakes are normal. We break the fear of speaking.',

      contactEyebrow: 'Contact',
      contactTitle: 'Start your journey',
      contactDesc: 'Send us a message. We reply quickly via WhatsApp.',
      locationLabel: 'Location',
      phoneLabel: 'WhatsApp',
      emailLabel: 'Email',
      socialLabel: 'Social media',
      formName: 'Full name',
      formNamePh: 'Your name',
      formPhone: 'Phone / WhatsApp',
      formPhonePh: '+244 ...',
      formInterest: 'Interest',
      formMessage: 'Message',
      formMessagePh: 'How can we help?',
      formSubmit: 'Send via WhatsApp',
      optOnline: 'Online Course',
      optPresencial: 'In-person Course',
      optDomiciliar: 'Home Course',
      optProducts: 'Products / Materials',
      optOther: 'Other',

      footerTag: 'Cultivating knowledge, forming futures.',
      rights: 'All rights reserved.'
    }
  };

  let currentLang = 'pt';

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    const t = translations[lang];

    // Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        el.innerHTML = t[key];
      }
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) {
        el.placeholder = t[key];
      }
    });

    // Select options
    document.querySelectorAll('select option[data-i18n]').forEach(opt => {
      const key = opt.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        opt.textContent = t[key];
      }
    });
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });

  // Init
  setLanguage('pt');

})();
