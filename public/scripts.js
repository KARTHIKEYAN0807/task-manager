document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const courseId = document.getElementById('courseId').value;
    const taskName = document.getElementById('taskName').value;
    const dueDate = document.getElementById('dueDate').value;
    const details = document.getElementById('details').value;
  
    try {
      const response = await fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId, taskName, dueDate, details }),
      });
  
      if (response.ok) {
        alert('Task added successfully!');
      } else {
        alert('Failed to add task.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding task.');
    }
  });
  
  document.getElementById('fetchTasksForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const courseId = document.getElementById('fetchCourseId').value;
  
    try {
      const response = await fetch(`/courses/${courseId}/tasks`);
      const tasks = await response.json();
  
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';
  
      if (tasks.length === 0) {
        taskList.innerHTML = '<p class="text-muted">No tasks found for this course.</p>';
      } else {
        tasks.forEach(task => {
          const taskDiv = document.createElement('div');
          taskDiv.className = 'task-item';
          taskDiv.innerHTML = `
            <h3>${task.taskName}</h3>
            <p><strong>Due Date:</strong> ${task.dueDate}</p>
            <p><strong>Details:</strong> ${task.details}</p>
          `;
          taskList.appendChild(taskDiv);
        });
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('taskList').innerHTML = '<p class="text-danger">Error fetching tasks.</p>';
    }
  });
  