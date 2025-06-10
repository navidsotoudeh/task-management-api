import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Task } from './types/task.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('tasks/index')
  async getTasks(): Promise<{ tasks: Task[] }> {
    const tasks = await this.appService.getTasks();
    return { tasks };
  }

  @Get('tasks/create')
  @Render('tasks/create')
  getCreateTaskForm() {
    return {};
  }

  @Post('tasks')
  async createTask(
    @Body() taskData: Omit<Task, 'id' | 'status'>,
  ): Promise<Task> {
    return this.appService.createTask(taskData);
  }

  @Delete('tasks/:id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.appService.deleteTask(id);
  }

  @Patch('tasks/:id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: 'pending' | 'completed',
  ): Promise<Task> {
    return this.appService.updateTaskStatus(id, status);
  }
}
