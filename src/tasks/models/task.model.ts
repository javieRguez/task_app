import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'task' })
export class Task {
    @Field(() => ID, { description: 'The unique ID of the task.' })
    id: string;
    @Field({ description: 'The title of the task.' })
    title: string;
    @Field({ description: 'The description of the task.' })
    description: string;
    @Field({ description: 'The limit date of the task.' })
    limitDate: string;
    @Field(() => Boolean, { nullable: true, description: 'The status of the task.' })
    finished!: boolean;
}