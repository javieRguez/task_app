import { Field, InputType } from "@nestjs/graphql";
import { IsString, Matches, IsBoolean } from "class-validator";

@InputType()
export class TaskInput {
    @Field()
    @IsString({ message: "title must be a string value" })
    title: string

    @Field()
    @IsString({ message: "description must be a string value" })
    description: string;

    @Field()
    @IsString()
    @Matches(/^(\d{2})\/(\d{2})\/(\d{4})$/, { message: 'limitDate must be in the format dd/MM/yyyy' })
    limitDate: string;

    @Field(() => Boolean, { nullable: true })
    @IsBoolean({ message: "finished must be a boolean value" })
    finished?: boolean;
}