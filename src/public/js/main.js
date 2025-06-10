// Task status toggle
document.addEventListener('DOMContentLoaded', function () {
  const taskStatusToggles = document.querySelectorAll('.task-status-toggle');

  taskStatusToggles.forEach((toggle) => {
    toggle.addEventListener('change', async function () {
      const taskId = this.dataset.taskId;
      const newStatus = this.checked ? 'completed' : 'pending';

      try {
        const response = await fetch(`/tasks/${taskId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
          const badge = document.querySelector(`#status-badge-${taskId}`);
          badge.className = `badge badge-${newStatus}`;
          badge.textContent =
            newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
        }
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    });
  });
});

// Delete task confirmation
function confirmDelete(taskId) {
  if (confirm('Are you sure you want to delete this task?')) {
    fetch(`/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          const taskElement = document.querySelector(`#task-${taskId}`);
          taskElement.remove();
        }
      })
      .catch((error) => console.error('Error deleting task:', error));
  }
}

// Form validation
const taskForm = document.querySelector('#task-form');
if (taskForm) {
  taskForm.addEventListener('submit', function (e) {
    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();

    if (!title) {
      e.preventDefault();
      alert('Please enter a task title');
    }
  });
}
