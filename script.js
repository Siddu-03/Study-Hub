// script.js - CyberStack dynamic loader

const DATA_URL = 'data.json';

async function fetchData() {
  const res = await fetch(DATA_URL);
  return res.json();
}

// --- Domains Page ---
async function renderDomains() {
  const data = await fetchData();
  const grid = document.getElementById('domainsGrid');
  if (!grid) return;
  // Count total resources
  let total = 0;
  data.subjects.forEach(s => total += (s.topics?.length || 0));
  grid.innerHTML = `
    <div class="card flex flex-col items-center">
      <div class="text-2xl font-semibold mb-2">${data.domain}</div>
      <div class="text-gray-500 mb-4">${total} Resources</div>
      <a href="subjects.html" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Explore Subjects</a>
    </div>
  `;
}

// --- Subjects Page ---
async function renderSubjects() {
  const data = await fetchData();
  const list = document.getElementById('subjectsList');
  const searchInput = document.getElementById('searchInput');
  if (!list) return;
  let subjects = data.subjects;
  function updateList() {
    const q = (searchInput?.value || '').toLowerCase();
    list.innerHTML = '';
    subjects.filter(s => s.name.toLowerCase().includes(q)).forEach(subject => {
      const count = subject.topics?.length || 0;
      list.innerHTML += `
        <div class="card flex flex-col justify-between">
          <div>
            <div class="text-lg font-semibold mb-1">${subject.name}</div>
            <div class="text-gray-500 mb-3">${count} Resources</div>
          </div>
          <a href="topics.html?subject=${encodeURIComponent(subject.name)}" class="mt-auto px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">View Topics</a>
        </div>
      `;
    });
  }
  if (searchInput) searchInput.addEventListener('input', updateList);
  updateList();
}

// --- Topics Page ---
async function renderTopics() {
  const data = await fetchData();
  const params = new URLSearchParams(window.location.search);
  const subjectName = params.get('subject');
  const list = document.getElementById('topicsList');
  const searchInput = document.getElementById('searchInput');
  const typeFilter = document.getElementById('typeFilter');
  const levelFilter = document.getElementById('levelFilter');
  if (!list || !subjectName) return;
  const subject = data.subjects.find(s => s.name === subjectName);
  if (!subject) {
    list.innerHTML = '<div class="text-red-500">Subject not found.</div>';
    return;
  }
  let topics = subject.topics || [];
  function iconForType(type) {
    if (type === 'PDF') return '📄';
    if (type === 'Article') return '📰';
    if (type === 'Video') return '🎥';
    return '';
  }
  function iconForLevel(level) {
    if (level === 'Beginner') return '🟢';
    if (level === 'Intermediate') return '🟡';
    if (level === 'Advanced') return '🔴';
    return '';
  }
  function updateList() {
    const q = (searchInput?.value || '').toLowerCase();
    const type = typeFilter?.value || '';
    const level = levelFilter?.value || '';
    list.innerHTML = '';
    topics.filter(t =>
      (!q || t.title.toLowerCase().includes(q)) &&
      (!type || t.type === type) &&
      (!level || t.level === level)
    ).forEach(topic => {
      list.innerHTML += `
        <div class="card flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div class="font-semibold text-lg flex items-center gap-2">${iconForType(topic.type)} ${topic.title}</div>
            <div class="text-gray-500 text-sm flex items-center gap-2 mt-1">
              <span>${iconForLevel(topic.level)} ${topic.level}</span>
              <span>·</span>
              <span>${topic.type}</span>
            </div>
          </div>
          <a href="${topic.link}" target="_blank" rel="noopener" class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">View Resource</a>
        </div>
      `;
    });
    if (list.innerHTML === '') {
      list.innerHTML = '<div class="text-gray-400">No topics found.</div>';
    }
  }
  if (searchInput) searchInput.addEventListener('input', updateList);
  if (typeFilter) typeFilter.addEventListener('change', updateList);
  if (levelFilter) levelFilter.addEventListener('change', updateList);
  updateList();
}

// --- Page Router ---
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('domainsGrid')) renderDomains();
  if (document.getElementById('subjectsList')) renderSubjects();
  if (document.getElementById('topicsList')) renderTopics();
}); 