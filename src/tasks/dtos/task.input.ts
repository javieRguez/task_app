import { Field, InputType } from "@nestjs/graphql";
import { IsString, Matches, IsBoolean } from "class-validator";

@InputType()
export class TaskInput {
    @Field({
        description: "title of a task is a field of type ( string )."
    })
    @IsString({ message: "title must be a string value" })
    title: string

    @Field({
        description: "description of a task is a field of type ( string )."
    })
    @IsString({ message: "description must be a string value" })
    description: string;

    @Field({
        description: "limitDate of a task is a field of type ( string ) => dd/MM/yyyy."
    })
    @IsString()
    @Matches(/^(\d{2})\/(\d{2})\/(\d{4})$/, { message: 'limitDate must be in the format dd/MM/yyyy' })
    limitDate: string;

    @Field(() => Boolean, { nullable: true, description: 'finished of a task is a field of type ( boolean ).' })
    @IsBoolean({ message: "finished must be a boolean value" })
    finished?: boolean;
}