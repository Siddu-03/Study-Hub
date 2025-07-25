// Render the Fields grid on fields.html
function renderFields() {
  const grid = document.getElementById('fields-grid');
  if (!grid || !window.fieldsData) return;
  grid.innerHTML = '';
  window.fieldsData.forEach(field => {
    const card = document.createElement('div');
    card.className = 'field-card';
    card.innerHTML = `
      <h3>${field.name}</h3>
      <p>${field.description}</p>
    `;
    card.onclick = () => window.location.href = `${field.id}.html`;
    grid.appendChild(card);
  });
}

// Render the Domains grid for a given fieldId (e.g., 'tech')
function renderDomains(fieldId) {
  const field = (window.fieldsData || []).find(f => f.id === fieldId);
  const grid = document.getElementById('domains-grid');
  if (!field || !grid) return;
  grid.innerHTML = '';
  field.domains.forEach(domain => {
    const card = document.createElement('div');
    card.className = 'domain-card';
    card.innerHTML = `
      <h3>${domain.name}</h3>
      <p>${domain.description}</p>
    `;
    card.onclick = () => window.location.href = `../domains/${domain.id}.html`;
    grid.appendChild(card);
  });
}

// Render the Domain page (subjects, filters, search)
function renderDomainPage(domainId) {
  const domain = (window.domainsData || {})[domainId];
  if (!domain) return;
  const subjectsList = document.getElementById('subjects-list');
  const filtersDiv = document.getElementById('filters');
  const searchInput = document.getElementById('subject-search');
  let filterState = {
    type: '',
    resourceType: '',
    completion: '',
    difficulty: '',
    search: ''
  };

  function renderFilters() {
    if (!filtersDiv) return;
    filtersDiv.innerHTML = `
      <div class="filter-group">
        <label>Subject Type:</label>
        <select id="filter-type">
          <option value="">All</option>
          <option value="Core">Core</option>
          <option value="Elective">Elective</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Resource Type:</label>
        <select id="filter-resource-type">
          <option value="">All</option>
          <option value="Article">Article</option>
          <option value="Video">Video</option>
          <option value="PDF">PDF</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Completion:</label>
        <select id="filter-completion">
          <option value="">All</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Difficulty:</label>
        <select id="filter-difficulty">
          <option value="">All</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
    `;
    // Add event listeners
    filtersDiv.querySelectorAll('select').forEach(sel => {
      sel.onchange = function() {
        filterState = {
          ...filterState,
          type: document.getElementById('filter-type').value,
          resourceType: document.getElementById('filter-resource-type').value,
          completion: document.getElementById('filter-completion').value,
          difficulty: document.getElementById('filter-difficulty').value
        };
        renderSubjects();
      };
    });
  }

  function renderSubjects() {
    if (!subjectsList) return;
    let subjects = domain.subjects;
    // Search filter
    if (filterState.search) {
      subjects = subjects.filter(s => s.name.toLowerCase().includes(filterState.search.toLowerCase()));
    }
    // Subject type filter
    if (filterState.type) {
      subjects = subjects.filter(s => s.type === filterState.type);
    }
    // Difficulty filter
    if (filterState.difficulty) {
      subjects = subjects.filter(s => s.difficulty === filterState.difficulty);
    }
    subjectsList.innerHTML = '';
    subjects.forEach(subject => {
      // Resource type and completion filter
      let resources = subject.resources;
      if (filterState.resourceType) {
        resources = resources.filter(r => r.type === filterState.resourceType);
      }
      if (filterState.completion) {
        resources = resources.filter(r => r.completion === filterState.completion);
      }
      // Subject card
      const card = document.createElement('div');
      card.className = 'subject-card';
      card.innerHTML = `
        <div class="subject-header" style="cursor:pointer;">
          <h4>${subject.name}</h4>
          <p>${subject.description}</p>
        </div>
        <div class="resources-list" style="display:none;"></div>
      `;
      // Expand/collapse
      const header = card.querySelector('.subject-header');
      const resourcesList = card.querySelector('.resources-list');
      header.onclick = function() {
        if (resourcesList.style.display === 'none') {
          resourcesList.style.display = 'block';
          renderResources(resourcesList, resources);
        } else {
          resourcesList.style.display = 'none';
        }
      };
      subjectsList.appendChild(card);
    });
  }

  function renderResources(container, resources) {
    container.innerHTML = '';
    if (!resources.length) {
      container.innerHTML = '<p style="color:#888;">No resources found.</p>';
      return;
    }
    resources.forEach(resource => {
      const div = document.createElement('div');
      div.className = 'resource-item';
      div.innerHTML = `
        <a href="${resource.link}" target="_blank">${resource.title}</a>
        <span style="margin-left:1rem; font-size:0.95em; color:#4f8cff;">${resource.type}</span>
        <span style="margin-left:1rem; font-size:0.95em; color:#888;">${resource.completion || ''}</span>
      `;
      container.appendChild(div);
    });
  }

  if (searchInput) {
    searchInput.oninput = function() {
      filterState.search = searchInput.value;
      renderSubjects();
    };
  }
  renderFilters();
  renderSubjects();
} 