// SubtopicList component: renders the list of subtopics/resources
export function renderSubtopicList(subtopics) {
  const subtopicList = document.getElementById('subtopicList');
  if (!subtopics.length) {
    subtopicList.innerHTML = '<div class="text-gray-400">No resources found.</div>';
    return;
  }
  subtopicList.innerHTML = subtopics.map(topic => `
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
  `).join('');
}

function iconForType(type) {
  if (type === 'Article') return '📄';
  if (type === 'Video') return '🎥';
  return '';
}

function iconForLevel(level) {
  switch(level) {
    case 'Beginner': return '🟢';
    case 'Intermediate': return '🟡';
    case 'Advanced': return '🔴';
    default: return '';
  }
} 