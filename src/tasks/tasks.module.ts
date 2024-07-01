import { Module } from "@nestjs/common";
import { TaskResolver } from "./tasks.resolver";
import { TaskService } from "./tasks.service";
import { FirebaseAdminModule } from "../config/firebase.module";

@Module({
    imports: [FirebaseAdminModule],
    providers: [TaskResolver, TaskService]
})

export class TasksModule { }