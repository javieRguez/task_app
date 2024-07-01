import { DocumentData, Timestamp } from "firebase-admin/firestore";
import { format, parse } from "date-fns";
import { TaskInput } from "../dtos/task.input";
import { Task } from "../models/task.model";

export class TaskMapper {
    static toFirestoreTask(data: TaskInput): any {
        return {
            ...data,
            limitDate: Timestamp.fromDate(parse(data.limitDate, 'dd/MM/yyyy', new Date())),
            finished: data.finished ?? false
        }
    }
    static fromFirestoreTask(doc: DocumentData): Task {
        const data = doc.data();
        data.id = doc.id;
        if (data.limitDate) {
            data.limitDate = format(data.limitDate.toDate(), 'dd/MM/yyyy').toString();
        }
        return data as Task;
    }
    static fromFirestoreTasks(docRef: DocumentData): Task[] {
        return docRef.docs.map(TaskMapper.fromFirestoreTask);
    }
}