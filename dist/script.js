const body = document.body;
const themeButton = document.querySelector('.theme-toggle');
const languageButton = document.querySelector('.language-toggle');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const descriptionMeta = document.querySelector('meta[name="description"]');

const ptToEn = {
  'Vitor Paz — Desenvolvedor em formação': 'Vitor Paz — Aspiring Developer',
  'Pular para o conteúdo': 'Skip to content',
  'Mudar idioma para inglês': 'Change language to English',
  'Mudar idioma para português': 'Change language to Portuguese',
  'Navegação principal': 'Main navigation',
  'Abrir menu': 'Open menu',
  'Fechar menu': 'Close menu',
  'Ativar tema claro': 'Switch to light theme',
  'Ativar tema escuro': 'Switch to dark theme',
  'Alternar tema': 'Toggle color theme',
  'EM FORMAÇÃO': 'ASPIRING DEVELOPER',
  'FLORIANÓPOLIS, BR': 'FLORIANÓPOLIS, BRAZIL',
  'Código com': 'Code with',
  'curiosidade': 'curiosity',
  'feito com intenção.': 'built with intention.',
  'Sou Vitor, desenvolvedor em formação. Estudo, experimento e transformo ideias em projetos — um commit de cada vez.': 'I’m Vitor, an aspiring developer. I study, experiment, and turn ideas into projects, one commit at a time.',
  'Explorar projetos': 'Explore projects',
  'Vamos conversar': 'Let’s talk',
  'sobre-mim.go': 'about-me.go',
  'aprendendo': 'learning',
  '// próximo passo: sempre em frente': '// next step: always forward',
  'UM PROCESSO EM PROGRESSO': 'A WORK IN PROGRESS',
  'PORTFÓLIO / 2026': 'PORTFOLIO / 2026',
  'PROJETOS SELECIONADOS': 'SELECTED PROJECTS',
  'Projetos': 'Projects',
  'Quatro projetos reais.': 'Four real projects.',
  'Código, produto e aprendizado.': 'Code, product, and learning.',
  'AUTOMAÇÃO / 01': 'AUTOMATION / 01',
  'Bot que monitora o Diário Oficial da União, identifica leis e medidas provisórias, persiste os dados e publica novidades no Telegram.': 'A bot that monitors Brazil’s Federal Official Gazette, identifies laws and provisional measures, stores the data, and posts updates to Telegram.',
  'Código': 'Code',
  'Demo': 'Live demo',
  'PROJETO WEB / 02': 'WEB PROJECT / 02',
  'SITE PUBLICADO': 'LIVE WEBSITE',
  'EMAD — Escola de Música': 'EMAD — Music School',
  'Site institucional para a Escola de Música Alexandre Dariva, com informações sobre aulas, instrumentos, valores, unidades e inscrição para aula experimental.': 'A website for Alexandre Dariva Music School, with information about lessons, instruments, tuition, locations, and trial lesson registration.',
  'Site institucional': 'Institutional website',
  'Acessar site': 'Visit website',
  'Contrato inteligente para registrar materiais e rastrear a produção e venda de varinhas em uma rede Hyperledger Fabric.': 'A smart contract to register materials and track the production and sale of wands on a Hyperledger Fabric network.',
  'DADOS / 04': 'DATA / 04',
  'EXTRAIR → TRANSFORMAR → CARREGAR': 'EXTRACT → TRANSFORM → LOAD',
  'PIPELINE DE DADOS': 'DATA PIPELINE',
  'Pipeline de dados orquestrada com Meltano e Apache Airflow, integrando arquivos CSV e bancos PostgreSQL com containers Docker.': 'A data pipeline orchestrated with Meltano and Apache Airflow, connecting CSV files and PostgreSQL databases through Docker containers.',
  '/ SOBRE': '/ ABOUT',
  'Aprender fazendo.': 'Learn by doing.',
  'Construir com cuidado.': 'Build with care.',
  'Sou Vitor Luiz Paz Roseno da Silva. Estou no começo da minha jornada em desenvolvimento e gosto de entender como as coisas funcionam — da primeira ideia aos detalhes que fazem uma interface parecer simples.': 'I’m Vitor Luiz Paz Roseno da Silva. I’m at the beginning of my development journey and enjoy understanding how things work, from the first idea to the details that make an interface feel simple.',
  'Busco uma oportunidade para aprender junto com outras pessoas, contribuir com dedicação e crescer construindo software útil. Por enquanto, meu foco é estudar, praticar e compartilhar o que faço.': 'I’m looking for an opportunity to learn alongside others, contribute with care, and grow by building useful software. For now, my focus is on studying, practicing, and sharing what I make.',
  'Se fizer sentido conversar, estou por aqui': 'If you’d like to talk, get in touch',
  'BASE': 'BASED IN',
  'BRASIL · UTC−3': 'BRAZIL · UTC−3',
  'PRESENTES NOS PROJETOS': 'USED IN MY PROJECTS',
  'Tecnologias': 'Technologies',
  'Ferramentas aplicadas': 'Tools used',
  'em projetos reais.': 'in real projects.',
  'LINGUAGENS': 'LANGUAGES',
  'EM FOCO': 'CURRENT FOCUS',
  'FERRAMENTAS': 'TOOLS',
  'CONCEITOS': 'CONCEPTS',
  'Pipeline de dados': 'Data pipelines',
  'Automação': 'Automation',
  'CONTATO': 'CONTACT',
  'ABERTO A NOVAS CONVERSAS': 'OPEN TO NEW CONVERSATIONS',
  'Tem uma ideia?': 'Have an idea?',
  'Vamos trocar.': 'Let’s talk.',
  'Enviar um e-mail': 'Send an email',
  'FLORIANÓPOLIS, BRASIL': 'FLORIANÓPOLIS, BRAZIL'
};
const enToPt = Object.fromEntries(Object.entries(ptToEn).map(([pt, en]) => [en, pt]));
let currentLanguage = 'pt-BR';

function setTheme(theme) {
  const isLight = theme === 'light';
  body.classList.toggle('light-theme', isLight);
  themeButton.setAttribute('aria-label', currentLanguage === 'en'
    ? (isLight ? 'Switch to dark theme' : 'Switch to light theme')
    : (isLight ? 'Ativar tema escuro' : 'Ativar tema claro'));
  themeButton.title = currentLanguage === 'en' ? 'Toggle color theme' : 'Alternar tema';
  themeMeta.setAttribute('content', isLight ? '#f4f4ed' : '#111310');
}

function setLanguage(language) {
  const nextLanguage = language === 'en' ? 'en' : 'pt-BR';
  const translations = nextLanguage === 'en' ? ptToEn : enToPt;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const trimmed = node.nodeValue.trim();
    if (!trimmed || !translations[trimmed]) continue;
    const leading = node.nodeValue.match(/^\s*/)?.[0] ?? '';
    const trailing = node.nodeValue.match(/\s*$/)?.[0] ?? '';
    node.nodeValue = `${leading}${translations[trimmed]}${trailing}`;
  }

  currentLanguage = nextLanguage;
  const isEnglish = currentLanguage === 'en';
  document.documentElement.lang = currentLanguage;
  document.title = isEnglish ? 'Vitor Paz — Aspiring Developer' : 'Vitor Paz — Desenvolvedor em formação';
  descriptionMeta.content = isEnglish
    ? 'Portfolio of Vitor Luiz Paz Roseno da Silva, an aspiring developer based in Florianópolis, Brazil.'
    : 'Portfólio de Vitor Luiz Paz Roseno da Silva, desenvolvedor em formação em Florianópolis, Brasil.';
  nav.setAttribute('aria-label', isEnglish ? 'Main navigation' : 'Navegação principal');
  document.querySelector('.hero-visual').setAttribute('aria-label', isEnglish ? 'Illustrative code window' : 'Janela de código ilustrativa');
  languageButton.textContent = isEnglish ? 'PT' : 'EN';
  languageButton.setAttribute('aria-label', isEnglish ? 'Change language to Portuguese' : 'Mudar idioma para inglês');
  languageButton.title = isEnglish ? 'Switch to Portuguese' : 'Mudar para português';
  languageButton.lang = isEnglish ? 'pt-BR' : 'en';
  menuButton.setAttribute('aria-label', menuButton.getAttribute('aria-expanded') === 'true'
    ? (isEnglish ? 'Close menu' : 'Fechar menu')
    : (isEnglish ? 'Open menu' : 'Abrir menu'));
  setTheme(body.classList.contains('light-theme') ? 'light' : 'dark');

  const emailLink = document.querySelector('#send-email');
  emailLink.href = isEnglish
    ? 'mailto:vitor.luiz.paz@live.com?subject=Contact%20through%20the%20portfolio'
    : 'mailto:vitor.luiz.paz@live.com?subject=Contato%20pelo%20portf%C3%B3lio';
  try { localStorage.setItem('vitor-portfolio-language', currentLanguage); } catch (_) { /* idioma segue funcional sem persistência */ }
}

let savedTheme = null;
let savedLanguage = null;
try {
  savedTheme = localStorage.getItem('vitor-portfolio-theme');
  savedLanguage = localStorage.getItem('vitor-portfolio-language');
} catch (_) { /* preferências seguem funcionais sem persistência */ }
setTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
if (savedLanguage === 'en') setLanguage('en');

themeButton.addEventListener('click', () => {
  const nextTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
  setTheme(nextTheme);
  try { localStorage.setItem('vitor-portfolio-theme', nextTheme); } catch (_) { /* tema segue funcional sem persistência */ }
});

languageButton.addEventListener('click', () => setLanguage(currentLanguage === 'en' ? 'pt-BR' : 'en'));

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen
    ? (currentLanguage === 'en' ? 'Open menu' : 'Abrir menu')
    : (currentLanguage === 'en' ? 'Close menu' : 'Fechar menu'));
  nav.classList.toggle('is-open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', currentLanguage === 'en' ? 'Open menu' : 'Abrir menu');
}));

document.querySelector('#current-year').textContent = new Date().getFullYear();

document.querySelectorAll('#send-email').forEach((emailLink) => {
  const feedback = document.querySelector('#email-feedback');
  emailLink.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('vitor.luiz.paz@live.com');
      feedback.textContent = currentLanguage === 'en'
        ? 'If your email app does not open, the address has been copied.'
        : 'Se o aplicativo de e-mail não abrir, o endereço foi copiado.';
    } catch (_) {
      feedback.textContent = `${currentLanguage === 'en' ? 'Email' : 'E-mail'}: vitor.luiz.paz@live.com`;
    }
  });
});
