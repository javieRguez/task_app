import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"
import { Task } from "./models/task.model";
import { TaskService } from "./tasks.service";
import { TaskInput } from "./dtos/task.input";
import { TaskPartialUpdateInput } from "./dtos/taskPartialUpdate.input";

@Resolver(() => Task)
export class TaskResolver {
    constructor(private readonly taskService: TaskService) { }

    @Mutation(() => Boolean)
    async createTaskAsync(
        @Args('taskData', { type: () => TaskInput }) taskData: TaskInput,
    ): Promise<Boolean> {
        return await this.taskService.createAsync(taskData).then(() => true).catch(() => false);
    }
    @Query(() => [Task])
    async getAllTasksAsync(): Promise<Task[]> {
        return this.taskService.getAllAsync();
    }
    @Query(() => Task)
    async getTaskByIdAsync(@Args('id', { type: () => String }) id: string): Promise<Task> {
        return this.taskService.getByIdAsync(id);
    }
    @Query(() => [Task])
    async getTasksByStatusAsync(@Args('finished', { type: () => Boolean }) finished: boolean): Promise<Task[]> {
        return this.taskService.getByStatusAsync(finished);
    }
    @Mutation(() => Boolean)
    async updateTaskAsync(@Args('id', { type: () => String }) id: string, @Args('taskData', { type: () => TaskPartialUpdateInput }) taskData: TaskInput): Promise<Boolean> {
        return this.taskService.updateAsync(id, taskData).then(() => true).catch(() => false);
    }
    @Mutation(() => Boolean)
    async removeTaskAsync(@Args('id', { type: () => String }) id: string): Promise<Boolean> {
        return this.taskService.removeAsync(id).then(() => true).catch(() => false);
    }
}