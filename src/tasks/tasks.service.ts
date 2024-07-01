import { Injectable, Inject } from '@nestjs/common';
import { Task } from './models/task.model';
import { Firestore, Timestamp } from 'firebase-admin/firestore';
import { TaskInput } from './dtos/task.input';
import { TaskMapper } from './mappers/taskMapper';
import { TaskPartialUpdateInput } from './dtos/taskPartialUpdate.input';
import { parse } from 'date-fns';

@Injectable()
export class TaskService {
    private _firestore: FirebaseFirestore.Firestore;

    constructor(@Inject('FIRESTORE') private readonly firestore: Firestore) {
        this._firestore = this.firestore;
    }
    async createAsync(taskData: TaskInput): Promise<void> {
        const docRef = this.firestore.collection('tasks').doc();
        const mappedData = TaskMapper.toFirestoreTask(taskData)
        await docRef.set(mappedData);
    }

    async getAllAsync(): Promise<Task[]> {
        const docRef = await this._firestore.collection('tasks').get();
        return TaskMapper.fromFirestoreTasks(docRef);
    }
    async getByIdAsync(id: string): Promise<Task> {
        const docRef = await this._firestore.collection('tasks').doc(id).get();
        if (!docRef.exists) {
            throw new Error('Task not found');
        }
        return TaskMapper.fromFirestoreTask(docRef)
    }

    async getByStatusAsync(finished: boolean): Promise<Task[]> {
        const docRef = await this._firestore.collection('tasks').where('finished', '==', finished).get();
        return TaskMapper.fromFirestoreTasks(docRef)
    }
    async updateAsync(id: string, task: Partial<TaskPartialUpdateInput>): Promise<void> {
        const docRef = await this._firestore.collection('tasks').doc(id);
        const partialTask: { [key: string]: any } = { ...task };

        if (task.limitDate) {
            const parsedDate = parse(task.limitDate, 'dd/MM/yyyy', new Date());
            if (!isNaN(parsedDate.getTime())) {
                partialTask.limitDate = Timestamp.fromDate(parsedDate)
            }
        }
        await docRef.update(partialTask);
        const updatedTask = await docRef.get();

        if (!updatedTask.exists) {
            throw new Error('Task not found');
        }
    }

    async removeAsync(id: string): Promise<void> {
        await this._firestore.collection('tasks').doc(id).delete();
    }
}