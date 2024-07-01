import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"
import { Task } from "./models/task.model";
import { TaskService } from "./tasks.service";
import { TaskInput } from "./dtos/task.input";
import { TaskPartialUpdateInput } from "./dtos/taskPartialUpdate.input";

@Resolver(() => Task)
export class TaskResolver {
    constructor(private readonly taskService: TaskService) { }

    @Mutation(() => Boolean, {
        description: 'Creates a new task with the provided title, description, limitDate and finished.'
    })
    async createTaskAsync(
        @Args('taskData', { type: () => TaskInput, description: 'Is a input type of the task.' }) taskData: TaskInput,
    ): Promise<Boolean> {
        return await this.taskService.createAsync(taskData).then(() => true).catch(() => false);
    }
    @Query(() => [Task], {
        description: 'Gets all tasks.'
    })
    async getAllTasksAsync(): Promise<Task[]> {
        return this.taskService.getAllAsync();
    }
    @Query(() => Task, {
        description: 'Gets a task by the provided ID.'
    })
    async getTaskByIdAsync(@Args('id', { type: () => String, description: 'The unique identifier of the task.' }) id: string): Promise<Task> {
        return this.taskService.getByIdAsync(id);
    }
    @Query(() => [Task], {
        description: 'Get all tasks that match the status.'
    })
    async getTasksByStatusAsync(@Args('finished', { type: () => Boolean, description: 'boolean indicating the status of the task.' }) finished: boolean): Promise<Task[]> {
        return this.taskService.getByStatusAsync(finished);
    }
    @Mutation(() => Boolean, {
        description: 'Updates the provided attributes of the task.'
    })
    async updateTaskAsync(
        @Args('id', { type: () => String, description: 'The unique identifier of the task.' }) id: string,
        @Args('taskData', { type: () => TaskPartialUpdateInput, description: 'Is a input type of the task.' }) taskData: TaskInput): Promise<Boolean> {
        return this.taskService.updateAsync(id, taskData).then(() => true).catch(() => false);
    }
    @Mutation(() => Boolean, {
        description: 'Remove a task by the provided ID.'
    })
    async removeTaskAsync(@Args('id', { type: () => String, description: 'The unique identifier of the task.' }) id: string): Promise<Boolean> {
        return this.taskService.removeAsync(id).then(() => true).catch(() => false);
    }
}