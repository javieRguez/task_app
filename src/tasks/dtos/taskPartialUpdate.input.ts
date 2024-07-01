import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsString, Matches } from "class-validator";

@InputType()
export class TaskPartialUpdateInput {
    @Field({ nullable: true, description: "title of a task is a field of type ( string )." })
    @IsString({ message: "title must be a string value" })
    title?: string

    @Field({ nullable: true, description: "description of a task is a field of type ( string )." })
    @IsString({ message: "description must be a string value" })
    description?: string;

    @Field({ nullable: true, description: "limitDate of a task is a field of type ( string ) => dd/MM/yyyy." })
    @IsString()
    @Matches(/^(\d{2})\/(\d{2})\/(\d{4})$/, { message: 'limitDate must be in the format dd/MM/yyyy' })
    limitDate?: string;

    @Field(() => Boolean, { nullable: true, description: 'finished of a task is a field of type ( boolean ).' })
    @IsBoolean({ message: "finished must be a boolean value" })
    finished?: boolean;
}