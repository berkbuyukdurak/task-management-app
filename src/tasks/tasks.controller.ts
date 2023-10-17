import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Query} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        // if we have any filters defined, call tasksService.getTasksWithFilters
        // otherwise, just get all tasks
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    //https://localhost:3000/tasks/dfhsfdh
    @Get('/:id')
    getTaskById(
        @Param('id') id: string
    ): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(
       @Body() createTaskDto: CreateTaskDto
    ): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(
        @Param('id') id: string
    ): void {
        return this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatusById(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Task {
        return this.tasksService.updateTaskStatusById(id, status);
    }
}
