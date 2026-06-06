/* ==========================================================================
   Data Definition & Mock Models
   ========================================================================== */

const skills = [
  { name: "React / React Native", category: "frontend", level: 90 },
  { name: "TypeScript", category: "frontend", level: 85 },
  { name: "Next.js", category: "frontend", level: 80 },
  { name: "HTML5 & Vanilla CSS", category: "frontend", level: 95 },
  { name: "JavaScript (ES6+)", category: "frontend", level: 92 },
  { name: "Node.js & Express", category: "backend", level: 85 },
  { name: "PostgreSQL & SQL", category: "backend", level: 80 },
  { name: "MongoDB & Mongoose", category: "backend", level: 78 },
  { name: "Python / Django / Flask", category: "backend", level: 75 },
  { name: "Figma (UI/UX Design)", category: "design", level: 88 },
  { name: "Git & Version Control", category: "design", level: 90 },
  { name: "Docker & CI/CD Pipelines", category: "design", level: 70 }
];

const projects = [
  {
    id: "project-1",
    name: "AI-Powered Analytics Dashboard",
    category: "web",
    tags: ["React", "Next.js", "Python", "D3.js"],
    desc: "A premium business intelligence dashboard featuring real-time data streaming, forecasting models, and glassmorphic UI elements.",
    detailedDesc: "This project is a high-performance metrics dashboard integrated with predictive machine learning algorithms. Built to display complex datasets cleanly, it incorporates WebSockets for real-time visualization, responsive SVG charting libraries, and high-fidelity custom layout animations.",
    image: "assets/project-dashboard.png",
    client: "Intellect Corp",
    role: "Lead UI Developer",
    duration: "6 Months",
    liveLink: "https://example.com/analytics",
    repoLink: "https://github.com/example/analytics"
  },
  {
    id: "project-2",
    name: "FinTech Mobile Banking Application",
    category: "mobile",
    tags: ["React Native", "TypeScript", "Node.js", "Express"],
    desc: "A secure and sleek banking app featuring seamless account transfers, biometrics, and dynamic spend forecasting diagrams.",
    detailedDesc: "Designed with modern typography and strict security standards, this application bridges banking capabilities with smart analytics. It utilizes native iOS and Android components, custom styling variables, state management systems, and biometrics validation.",
    image: "assets/project-mobile.png",
    client: "Apex Wealth",
    role: "Mobile App Engineer",
    duration: "4 Months",
    liveLink: "https://example.com/banking",
    repoLink: "https://github.com/example/banking"
  },
  {
    id: "project-3",
    name: "Minimalist E-Commerce Platform",
    category: "web",
    tags: ["HTML5", "Vanilla JS", "Node.js", "PostgreSQL"],
    desc: "A high-conversion creative e-commerce experience displaying rich product catalog flows and customized animations.",
    detailedDesc: "A complete client-side optimized e-commerce landing page built to load in under 500ms. It features customizable themes, filtering algorithms, client cart session caches, and responsive checkout fields.",
    image: "assets/project-landing.png",
    client: "Minimal Studio",
    role: "Full-Stack Developer",
    duration: "3 Months",
    liveLink: "https://example.com/shop",
    repoLink: "https://github.com/example/shop"
  }
];

/* ==========================================================================
   Custom Cursor Logic
   ========================================================================== */

const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

function addCursorHover() {
  const clickables = document.querySelectorAll('a, button, input, textarea, .clickable, .skills-tab-btn, .filter-btn, .timeline-card');
  clickables.forEach(elem => {
    elem.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    elem.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

/* ==========================================================================
   Background Canvas Particles Logic
   ========================================================================== */

const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');

let particles = [];
let mouse = { x: null, y: null, radius: 150 };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.baseSpeedX = (Math.random() - 0.5) * 0.8;
    this.baseSpeedY = (Math.random() - 0.5) * 0.8;
    this.speedX = this.baseSpeedX;
    this.speedY = this.baseSpeedY;
    this.density = (Math.random() * 30) + 1;
  }
  
  update() {
    // Dynamic theme calculations
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    this.color = isDark ? 'rgba(6, 182, 212, 0.4)' : 'rgba(79, 70, 229, 0.3)';
    this.lineColor = isDark ? 'rgba(79, 70, 229, 0.08)' : 'rgba(6, 182, 212, 0.08)';

    if (mouse.x !== null && mouse.y !== null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let maxDistance = mouse.radius;
      let force = (maxDistance - distance) / maxDistance;
      
      if (distance < mouse.radius) {
        let directionX = forceDirectionX * force * this.density * 0.4;
        let directionY = forceDirectionY * force * this.density * 0.4;
        this.x -= directionX;
        this.y -= directionY;
      } else {
        this.x += this.speedX;
        this.y += this.speedY;
      }
    } else {
      this.x += this.speedX;
      this.y += this.speedY;
    }
    
    if (this.x < 0 || this.x > canvas.width) {
      this.speedX = -this.speedX;
    }
    if (this.y < 0 || this.y > canvas.height) {
      this.speedY = -this.speedY;
    }
  }
  
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  let numberOfParticles = Math.floor((canvas.width * canvas.height) / 9000);
  numberOfParticles = Math.min(numberOfParticles, 120);
  for (let i = 0; i < numberOfParticles; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    
    for (let j = i; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        let alpha = ((100 - distance) / 100) * 0.15;
        ctx.strokeStyle = particles[i].lineColor.replace('0.08', alpha.toString());
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
window.addEventListener('resize', initParticles);

/* ==========================================================================
   Typewriter Animation Logic
   ========================================================================== */

const typewriterText = document.getElementById('typewriter-text');
   const roles= [
    "ECE Student",
    "AI & IoT Developer",
    "Prompt Engineer",
    "Embedded Systems Engineer"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typewriterText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    typewriterText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 120;
  }
  
  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typeSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500;
  }
  
  setTimeout(type, typeSpeed);
}

/* ==========================================================================
   Theme Toggling Logic
   ========================================================================== */

const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('portfolio-theme', newTheme);
});

/* ==========================================================================
   Navigation Hamburger & Sticky Header Logic
   ========================================================================== */

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const header = document.getElementById('header');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/* ==========================================================================
   Intersection Observer (Scroll Reveal & Nav Highlight)
   ========================================================================== */

const sections = document.querySelectorAll('section');
const navObserverOptions = {
  root: null,
  threshold: 0.3,
  rootMargin: '-50px 0px -50px 0px'
};

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const activeId = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, navObserverOptions);

sections.forEach(section => navObserver.observe(section));

const revealObserverOptions = {
  root: null,
  threshold: 0.05,
  rootMargin: '0px 0px -20px 0px'
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      // Skill Circle Ring Animation Trigger
      if (entry.target.classList.contains('skill-card')) {
        const ring = entry.target.querySelector('.skill-ring-circle-val');
        if (ring) {
          const level = parseInt(ring.getAttribute('data-level'), 10);
          ring.style.strokeDashoffset = `${226 * (1 - level / 100)}`;
        }
      }
      observer.unobserve(entry.target);
    }
  });
}, revealObserverOptions);

function observeReveals() {
  const reveals = document.querySelectorAll('.reveal:not(.active), .reveal-left:not(.active), .reveal-right:not(.active)');
  reveals.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   Dynamic Technical Skills Rendering
   ========================================================================== */

const skillsGrid = document.getElementById('skills-grid');
const skillsSearch = document.getElementById('skills-search');
const skillsTabBtns = document.querySelectorAll('.skills-tab-btn');

let currentSkillFilter = 'all';
let currentSkillQuery = '';

function renderSkills() {
  skillsGrid.innerHTML = '';
  
  const filteredSkills = skills.filter(skill => {
    const matchesCategory = currentSkillFilter === 'all' || skill.category === currentSkillFilter;
    const matchesSearch = skill.name.toLowerCase().includes(currentSkillQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredSkills.length === 0) {
    skillsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem 1rem;">
        No skills found matching search criteria.
      </div>`;
    return;
  }

  filteredSkills.forEach(skill => {
    const card = document.createElement('div');
    card.className = 'skill-card glass-card reveal';
    card.innerHTML = `
      <div class="skill-ring-wrapper">
        <svg class="skill-ring-svg" viewBox="0 0 80 80">
          <circle class="skill-ring-circle-bg" cx="40" cy="40" r="36"></circle>
          <circle class="skill-ring-circle-val" cx="40" cy="40" r="36" style="stroke-dashoffset: 226;" data-level="${skill.level}"></circle>
        </svg>
        <div class="skill-ring-text">${skill.level}%</div>
      </div>
      <div class="skill-name">${skill.name}</div>
    `;
    skillsGrid.appendChild(card);
  });

  observeReveals();
  addCursorHover();
}

skillsSearch.addEventListener('input', (e) => {
  currentSkillQuery = e.target.value;
  renderSkills();
});

skillsTabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    skillsTabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSkillFilter = btn.getAttribute('data-filter');
    renderSkills();
  });
});

/* ==========================================================================
   Dynamic Featured Projects Rendering
   ========================================================================== */

const projectsGrid = document.getElementById('projects-grid');
const projectsFilterBtns = document.querySelectorAll('.filter-btn');

let currentProjectFilter = 'all';

function renderProjects() {
  projectsGrid.innerHTML = '';
  
  const filteredProjects = projects.filter(project => {
    return currentProjectFilter === 'all' || project.category === currentProjectFilter;
  });

  filteredProjects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card glass-card reveal';
    card.innerHTML = `
      <div class="project-img-wrapper">
        <img src="${project.image}" alt="${project.name}" class="project-img">
        <div class="project-overlay">
          <button class="project-overlay-btn" data-project-id="${project.id}">
            View Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </button>
        </div>
      </div>
      <div class="project-info">
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        <h3 class="project-name">${project.name}</h3>
        <p class="project-desc">${project.desc}</p>
        <a href="javascript:void(0)" class="project-link" data-project-id="${project.id}">
          Explore Project
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    `;

    card.querySelector('.project-overlay-btn').addEventListener('click', () => {
      openProjectModal(project.id);
    });
    card.querySelector('.project-link').addEventListener('click', (e) => {
      e.preventDefault();
      openProjectModal(project.id);
    });

    projectsGrid.appendChild(card);
  });

  observeReveals();
  addCursorHover();
}

projectsFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    projectsFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentProjectFilter = btn.getAttribute('data-filter');
    renderProjects();
  });
});

/* ==========================================================================
   Project Detail Modal Control
   ========================================================================== */

const projectModal = document.getElementById('project-modal');
const projectModalClose = document.getElementById('project-modal-close');
const projectModalContent = document.getElementById('project-modal-content');

function openProjectModal(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;
  
  projectModalContent.innerHTML = `
    <img src="${project.image}" alt="${project.name}" class="project-modal-img">
    <h3 class="project-modal-title">${project.name}</h3>
    <div class="project-modal-tags">
      ${project.tags.map(tag => `<span class="project-modal-tag">${tag}</span>`).join('')}
    </div>
    <p class="project-modal-desc">${project.detailedDesc}</p>
    <div class="project-modal-meta">
      <div>
        <div class="project-meta-label">Client</div>
        <div class="project-meta-value">${project.client}</div>
      </div>
      <div>
        <div class="project-meta-label">Role</div>
        <div class="project-meta-value">${project.role}</div>
      </div>
      <div>
        <div class="project-meta-label">Duration</div>
        <div class="project-meta-value">${project.duration}</div>
      </div>
      <div>
        <div class="project-meta-label">Category</div>
        <div class="project-meta-value">${project.category.toUpperCase()}</div>
      </div>
    </div>
    <div class="project-modal-links">
      <a href="${project.liveLink}" target="_blank" class="btn btn-primary">
        Live Demo
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </a>
      <a href="${project.repoLink}" target="_blank" class="btn btn-secondary">
        View Code
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      </a>
    </div>
  `;
  
  projectModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  addCursorHover();
}

function closeProjectModal() {
  projectModal.classList.remove('active');
  document.body.style.overflow = '';
}

projectModalClose.addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', (e) => {
  if (e.target === projectModal) {
    closeProjectModal();
  }
});

/* ==========================================================================
   Contact Form Submissions & Admin Inbox Dashboard
   ========================================================================== */

const contactForm = document.getElementById('contact-form');
const inboxModal = document.getElementById('inbox-modal');
const inboxModalClose = document.getElementById('inbox-modal-close');
const openInboxBtn = document.getElementById('open-inbox-btn');

const inboxAuthSection = document.getElementById('inbox-auth-section');
const inboxPasswordInput = document.getElementById('inbox-password-input');
const inboxAuthSubmit = document.getElementById('inbox-auth-submit');
const inboxAuthError = document.getElementById('inbox-auth-error');

const inboxDashboardSection = document.getElementById('inbox-dashboard-section');
const inboxMessagesContainer = document.getElementById('inbox-messages-container');
const inboxExportBtn = document.getElementById('inbox-export-btn');
const inboxLockBtn = document.getElementById('inbox-lock-btn');

let messages = JSON.parse(localStorage.getItem('inbox-messages')) || [];

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const subject = document.getElementById('contact-subject').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  
  let isValid = true;
  if (name.length < 2) isValid = false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) isValid = false;
  if (subject.length < 3) isValid = false;
  if (message.length < 10) isValid = false;
  
  if (!isValid) {
    alert('Please fill out all fields with valid information. Name: min 2 chars, Subject: min 3 chars, Message: min 10 chars.');
    return;
  }
  
  const newMessage = {
    id: `msg-${Date.now()}`,
    name,
    email,
    subject,
    message,
    timestamp: new Date().toLocaleString(),
    unread: true
  };
  
  messages.unshift(newMessage);
  localStorage.setItem('inbox-messages', JSON.stringify(messages));
  
  alert('Thank you! Your message has been sent successfully (stored locally).');
  contactForm.reset();
  
  // Reset input floating label states
  const inputs = contactForm.querySelectorAll('.form-input');
  inputs.forEach(input => {
    input.blur();
  });
});

let isAuthorized = false;

openInboxBtn.addEventListener('click', () => {
  inboxModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (isAuthorized) {
    showDashboard();
  } else {
    showAuth();
  }
});

function closeInboxModal() {
  inboxModal.classList.remove('active');
  document.body.style.overflow = '';
}

inboxModalClose.addEventListener('click', closeInboxModal);
inboxModal.addEventListener('click', (e) => {
  if (e.target === inboxModal) {
    closeInboxModal();
  }
});

function showAuth() {
  inboxAuthSection.style.display = 'block';
  inboxDashboardSection.style.display = 'none';
  inboxPasswordInput.value = '';
  inboxAuthError.style.display = 'none';
  inboxPasswordInput.focus();
}

function showDashboard() {
  inboxAuthSection.style.display = 'none';
  inboxDashboardSection.style.display = 'block';
  renderInboxMessages();
}

inboxAuthSubmit.addEventListener('click', () => {
  const pin = inboxPasswordInput.value.trim();
  if (pin === '1234') {
    isAuthorized = true;
    showDashboard();
  } else {
    inboxAuthError.style.display = 'block';
  }
});

inboxPasswordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    inboxAuthSubmit.click();
  }
});

inboxLockBtn.addEventListener('click', () => {
  isAuthorized = false;
  showAuth();
});

inboxExportBtn.addEventListener('click', () => {
  if (messages.length === 0) {
    alert('Inbox is empty. Nothing to export.');
    return;
  }
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(messages, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "portfolio_inbox_messages.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
});

function renderInboxMessages() {
  inboxMessagesContainer.innerHTML = '';
  
  if (messages.length === 0) {
    inboxMessagesContainer.innerHTML = `
      <div class="empty-inbox">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"></path>
        </svg>
        <p>No messages received yet.</p>
      </div>
    `;
    return;
  }
  
  const list = document.createElement('div');
  list.className = 'inbox-list';
  
  messages.forEach(msg => {
    const card = document.createElement('div');
    card.className = `inbox-card ${msg.unread ? 'unread' : ''}`;
    card.innerHTML = `
      <div class="inbox-header">
        <div class="inbox-name">${escapeHTML(msg.name)}</div>
        <div class="inbox-meta">
          <div>${msg.timestamp}</div>
          <a href="mailto:${msg.email}" style="color: var(--accent-2); font-size: 0.8rem;">${escapeHTML(msg.email)}</a>
        </div>
      </div>
      <div class="inbox-subject">Subj: ${escapeHTML(msg.subject)}</div>
      <div class="inbox-msg">${escapeHTML(msg.message)}</div>
      <div class="inbox-actions">
        <button class="inbox-btn inbox-btn-read" data-action="toggle-read">
          ${msg.unread ? 'Mark Read' : 'Mark Unread'}
        </button>
        <button class="inbox-btn inbox-btn-delete" data-action="delete">
          Delete
        </button>
      </div>
    `;
    
    card.querySelector('[data-action="toggle-read"]').addEventListener('click', () => {
      msg.unread = !msg.unread;
      localStorage.setItem('inbox-messages', JSON.stringify(messages));
      renderInboxMessages();
    });
    
    card.querySelector('[data-action="delete"]').addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this message?')) {
        messages = messages.filter(m => m.id !== msg.id);
        localStorage.setItem('inbox-messages', JSON.stringify(messages));
        renderInboxMessages();
      }
    });
    
    list.appendChild(card);
  });
  
  inboxMessagesContainer.appendChild(list);
  addCursorHover();
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/* ==========================================================================
   Initialization
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Setup data rendering
  renderSkills();
  renderProjects();
  
  // Start scroll reveal observers
  observeReveals();
  
  // Start typewriter effect
  setTimeout(type, 1000);
  
  // Setup click cursor hover listeners
  addCursorHover();
});
