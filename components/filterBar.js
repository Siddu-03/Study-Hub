// FilterBar component: renders type and level filters
export function renderFilterBar(type, level, onTypeChange, onLevelChange) {
  const filterBar = document.getElementById('filterBar');
  filterBar.innerHTML = `
    <div class="flex flex-wrap gap-2 items-center">
      <select id="typeFilter" class="px-3 py-2 border rounded">
        <option value="">All Types</option>
        <option value="PDF">PDF</option>
        <option value="Video">Video</option>
      </select>
      <select id="levelFilter" class="px-3 py-2 border rounded">
        <option value="">All Levels</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
      </select>
    </div>
  `;
  filterBar.querySelector('#typeFilter').value = type;
  filterBar.querySelector('#levelFilter').value = level;
  filterBar.querySelector('#typeFilter').onchange = e => onTypeChange(e.target.value);
  filterBar.querySelector('#levelFilter').onchange = e => onLevelChange(e.target.value);
} 