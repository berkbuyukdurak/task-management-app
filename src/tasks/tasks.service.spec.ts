import { Test } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import {NotFoundException} from "@nestjs/common";

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn()
});

const mockUser = {
    username: 'John',
    id: 'someId',
    password: 'somePassword',
    tasks: []
};

describe('TaskService', () => {
    let tasksService: TasksService;
    let tasksRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                {provide: TasksRepository, useFactory: mockTasksRepository}
            ],
        }).compile();

        tasksService = module.get(TasksService);
        tasksRepository = module.get(TasksRepository);
    });

    describe('getTasks',  () => {
        it('calls TasksRepository.getTasks and returns the results', async () => {
            tasksRepository.getTasks.mockResolvedValue('someValue');
            const result = await tasksService.getTasks(null, mockUser);
            expect(result).toEqual('someValue');
        })
    });

    describe('getTaskById', () => {
       it('calls TasksRepository.findOne and returns the result', async () => {
           const mockTask = {
             title: 'Title',
             description: 'Description',
             id: 'someId',
             status: TaskStatus.OPEN
           };
           tasksRepository.findOne.mockResolvedValue(mockTask);
           const result = await tasksService.getTaskById('someId', mockUser);
           expect(result).toEqual(mockTask);
       });

        it('calls TasksRepository.findOne and handles an error', async () => {
            tasksRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(new NotFoundException());
        });
    });
});