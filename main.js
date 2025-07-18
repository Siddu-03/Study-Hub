// main.js - Handles dynamic loading for all domains
import { renderSidebar } from './components/sidebar.js';
import { renderFilterBar } from './components/filterBar.js';
import { renderSubtopicList } from './components/subtopicList.js';

// Utility to get slug from URL
function getSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get('slug');
}

// Utility to get domain config from domains.json
async function getDomainConfig() {
  const path = window.location.pathname;
  if (path.includes('domain.html')) {
    const slug = getSlug();
    const res = await fetch('..//data/domains.json');
    const domains = await res.json();
    const domain = domains.find(d => d.slug === slug);
    if (domain) {
      return {
        dataFile: `../data/${domain.dataFile}`,
        domain: domain.name
      };
    }
    return null;
  } else if (path.includes('cybersecurity')) {
    return { dataFile: '../data/cybersecurity.json', domain: 'Cybersecurity' };
  } else if (path.includes('ai-ml')) {
    return { dataFile: '../data/ai_ml.json', domain: 'AI & ML' };
  }
  return null;
}

async function fetchData(url) {
  const res = await fetch(url);
  return res.json();
}

async function init() {
  const config = await getDomainConfig();
  if (!config) return;
  const data = await fetchData(config.dataFile);
  let currentSubject = data.subjects[0]?.name || '';
  let typeFilter = '';
  let levelFilter = '';

  // Set domain title if present
  const domainTitle = document.getElementById('domainTitle');
  if (domainTitle) domainTitle.textContent = config.domain;

  function update() {
    const subject = data.subjects.find(s => s.name === currentSubject);
    let topics = subject ? subject.topics : [];
    if (typeFilter) topics = topics.filter(t => t.type === typeFilter);
    if (levelFilter) topics = topics.filter(t => t.level === levelFilter);
    renderSidebar(data.subjects, currentSubject, (name) => {
      currentSubject = name;
      update();
    });
    renderFilterBar(typeFilter, levelFilter, (type) => {
      typeFilter = type;
      update();
    }, (level) => {
      levelFilter = level;
      update();
    });
    renderSubtopicList(topics);
  }

  update();
}

document.addEventListener('DOMContentLoaded', init); 