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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('tasks/index')
  async getTasks() {
    const tasks = await this.appService.getTasks();
    return { tasks };
  }

  @Get('tasks/create')
  @Render('tasks/create')
  getCreateTaskForm() {
    return {};
  }

  @Post('tasks')
  async createTask(@Body() taskData: any) {
    return this.appService.createTask(taskData);
  }

  @Delete('tasks/:id')
  async deleteTask(@Param('id') id: string) {
    return this.appService.deleteTask(id);
  }

  @Patch('tasks/:id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.appService.updateTaskStatus(id, status);
  }
}
