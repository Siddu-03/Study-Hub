// Sidebar component: renders subject list and handles switching
export function renderSidebar(subjects, currentSubject, onSubjectChange) {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `<h2 class="text-xl font-bold mb-4">Subjects</h2>` +
    subjects.map(subject => `
      <button class="block w-full text-left px-3 py-2 rounded mb-2 ${subject.name === currentSubject ? 'bg-blue-100 font-semibold' : 'hover:bg-gray-100'}" data-subject="${subject.name}">
        ${subject.name}
      </button>
    `).join('');
  sidebar.querySelectorAll('button[data-subject]').forEach(btn => {
    btn.onclick = () => onSubjectChange(btn.getAttribute('data-subject'));
  });
} 