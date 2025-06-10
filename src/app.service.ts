import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async createTask(taskData: Omit<Task, 'id' | 'status'>): Promise<Task> {
    const task = this.taskRepository.create({
      ...taskData,
      status: 'pending',
    });
    return this.taskRepository.save(task);
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async updateTaskStatus(
    id: string,
    status: 'pending' | 'completed',
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error('Task not found');
    }
    task.status = status;
    return this.taskRepository.save(task);
  }
}
