/**
 * Model can be created as a class or as an interface.
 * An interface is a TypeScript concept that simply enforces the shape of an object upon compilation. Therefore, after compilation interfaces are not preserved anymore.
 * Classes are useful when you want to create multiple instances of the same shape following a blueprint. They are also useful when you want to enhance those with self-contained functionality
 * using methods.
 */

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}

export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}