import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'task' })
export class Task {
    @Field(() => ID)
    id: string;
    @Field()
    title: string;
    @Field()
    description: string;
    @Field()
    limitDate: string;
    @Field(() => Boolean, { nullable: true })
    finished!: boolean;
}