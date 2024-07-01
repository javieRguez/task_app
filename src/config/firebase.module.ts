import { Module, Global } from '@nestjs/common';
import *  as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
    providers: [
        {
            provide: 'FIREBASE_ADMIN',
            useFactory: (configService: ConfigService) => {
                const fbConfig = {
                    projectId: configService.get<string>('CLOUD_FIRESTORE_PROJECT_ID'),
                    clientEmail: configService.get<string>('CLOUD_FIRESTORE_CLIENT_EMAIL'),
                    privateKey: configService.get<string>('CLOUD_FIRESTORE_PRIVATE_KEY')?.replace(/\\n/g, '\n')
                };
                return admin.initializeApp({
                    credential: admin.credential.cert(fbConfig),
                });
            },
            inject: [ConfigService],
        },
        {
            provide: 'FIRESTORE',
            useFactory: (app) => {
                return app.firestore();
            },
            inject: ['FIREBASE_ADMIN']
        }
    ],
    exports: ['FIREBASE_ADMIN', 'FIRESTORE']
})

export class FirebaseAdminModule { }