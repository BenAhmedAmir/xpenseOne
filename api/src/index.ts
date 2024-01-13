/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { createExpressServer } from 'routing-controllers';
import ProfileController from './controllers/profileController';
import OrgController from './controllers/orgController';
import CurrencyController from './controllers/currencyController';
import ExpenseController from './controllers/expenseController';
import ExpenseTypeController from './controllers/expenseTypeController';
import TaxController from './controllers/taxController';
import GroupController from './controllers/groupController';
import UserController from './controllers/userController';
import { CustomErrorHandler } from './middlewares/errors.middleware';
import SheetController from './controllers/sheetController';
import { Mapper } from '@nartc/automapper';
import AutoMapProfile from './autoMapper/profile';
import * as admin from 'firebase-admin';
declare module "express" {
    interface Request {
        userId :string;
    }

}

dotenv.config();
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.DB_URL
});

declare global {
    interface IRequestWithUserInfo extends express.Request {
        user?: any
    }
}

/**
 * App Variables
 */
if (!process.env.PORT) {
    console.error('No PORT defined')
    process.exit(1);
}

/**
 *  App Configuration
 */

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = createExpressServer({
    defaultErrorHandler: false,
    routePrefix: '/api',
    cors: {
        origin: true
    },
    controllers: [ProfileController, OrgController, CurrencyController,
        ExpenseController, ExpenseTypeController, UserController, GroupController,
        TaxController, SheetController],
    middlewares: [CustomErrorHandler]
});

// For file upload
app.use(express.static('public'));

import YAML from 'yamljs';
const swaggerDocument = YAML.load('./api-docs/build/swagger.yaml');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

Mapper.addProfile(AutoMapProfile);
/**
 * Server Activation
 */
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

/**
 * Webpack HMR Activation
 */
type ModuleId = string | number;

interface WebpackHotModule {
    hot?: {
        data: any;
        accept(
            dependencies: string[],
            callback?: (updatedDependencies: ModuleId[]) => void,
        ): void;
        accept(dependency: string, callback?: () => void): void;
        accept(errHandler?: (err: Error) => void): void;
        dispose(callback: (data: any) => void): void;
    };
}

declare const module: WebpackHotModule;

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}
