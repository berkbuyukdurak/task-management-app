/**
 * A DTO is an object that defines how the data will be sent over the network.
 * More About DTO
 * - Common concept in software development that is not specific to NestJS
 * - Result in more bulletproof code, as it can be used as a TypeScript type.
 * - Do not have any behavior except for storage, retrieval, serialization and deserialization of its own data.
 * - Result in increased performance (although negligible in small applications)
 * - Can be useful for data validation
 * - A DTO is NOT a model definition. It defines the shape of data for a specific case, for example - creating a task.
 * - Can be defined using an interface or a class.
 *
 * Classes vs Interfaces for DTOs
 * - Data Transfer Objects (DTOs) can be defined as classes or interfaces.
 * - The recommended approach is to use classes, also clearly documented in the NestJS documentation.
 * - The reason is that interfaces are a part of TypeScript and therefore are not preserved post-compilation.
 * - Classes allow us to do more, and since they are a part of JavaScript, they will be preserved post-compilation.
 * - NestJS cannot refer to interfaces in run-time, but can refer to classes.
 *
 * Important Note!
 * - Data Transfer Objects are NOT mandatory.
 * - You can still develop applications without using DTOs.
 * - However, the value they add makes it worthwhile to use them when applicable.
 * - Applying to DTO patterns as soon as possible will make it easy for you to maintain and refactor your code.
 */
export class CreateTaskDto {
    title: string;
    description: string;
}