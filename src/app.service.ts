import { Injectable } from '@nestjs/common';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

@Injectable()
export class AppService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  createTask(taskData: Omit<Task, 'id' | 'status'>): Task {
    const task: Task = {
      id: Date.now().toString(),
      status: 'pending',
      ...taskData,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: 'pending' | 'completed'): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.status = status;
      return task;
    }
    throw new Error('Task not found');
  }
}
