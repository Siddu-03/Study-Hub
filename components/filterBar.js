// FilterBar component: renders type and level filters
export function renderFilterBar(type, level, search, onTypeChange, onLevelChange, onSearchChange) {
  const filterBar = document.getElementById('filterBar');
  filterBar.innerHTML = `
    <div class="flex flex-wrap gap-2 items-center">
      <select id="typeFilter" class="px-3 py-2 border rounded">
        <option value="">All Types</option>
        <option value="Article">Article</option>
        <option value="Video">Video</option>
      </select>
      <select id="levelFilter" class="px-3 py-2 border rounded">
        <option value="">All Levels</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
      <input id="searchInput" type="text" placeholder="Search..." value="${search || ''}" class="px-3 py-2 border rounded w-48" />
    </div>
  `;
  filterBar.querySelector('#typeFilter').value = type;
  filterBar.querySelector('#levelFilter').value = level;
  filterBar.querySelector('#typeFilter').onchange = e => onTypeChange(e.target.value);
  filterBar.querySelector('#levelFilter').onchange = e => onLevelChange(e.target.value);
  filterBar.querySelector('#searchInput').oninput = e => onSearchChange(e.target.value);
} 