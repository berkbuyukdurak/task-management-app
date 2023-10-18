import {Injectable, NotFoundException} from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;

        let tasks: Task[] = this.getAllTasks();

        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }

        if (search) {
            tasks = tasks.filter((task) => {
                return task.title.includes(search) || task.description.includes(search);
            });
        }

        return tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);

        return task;
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find((task) => task.id === id);

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    deleteTaskById(id: string): void {
        const index = this.tasks.findIndex(task => {
           return task.id === id;
        });
        this.tasks.splice(index, 1);
    }

    updateTaskStatusById(id: string, status: TaskStatus): Task {
        const index = this.tasks.findIndex(task => {
            return task.id === id;
        });

        this.tasks[index].status = status;

        return this.tasks[index];
    }
}
