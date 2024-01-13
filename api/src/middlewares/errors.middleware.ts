import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';
import { ValidationError } from 'class-validator';
import {Request, Response, NextFunction} from 'express';
import {UnauthorizedError} from "express-jwt";

interface ValidationObject {
    [key: string]: { value: string, constraints: string[] } | ValidationObject
}

@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, req: Request, res: Response, next: NextFunction) {
        let responseObject = {} as any;
        const { errors } = error;

        // if its an array of ValidationError
        if (Array.isArray(errors) && errors.every((element) => element instanceof ValidationError)) {
            res.status(400);
            responseObject.message = "BadRequestError";
            // responseObject.errors = error;
            responseObject.errors = this.validationErrorToObject(errors);
        } else {
            // set http status
            if ((error instanceof HttpError) && error.httpCode){
                res.status(error.httpCode);
            } else if (error instanceof UnauthorizedError){
                res.status(401);
            } else if(error.statusCode && error.statusCode===403) {
                res.status(403);
            } else {
                res.status(500);
            }

            if (error instanceof Error) {
                const developmentMode: boolean = process.env.NODE_ENV === "development";

                // set response error fields
                if (error.name && (developmentMode || error.message)) { // show name only if in development mode and if error message exist too
                    responseObject.name = error.name;
                }
                if (error.message) {
                    responseObject.message = error.message;
                }
                if (error.stack && developmentMode) {
                    responseObject.stack = error.stack;
                }
            } else if (typeof error === "string") {
                responseObject.message = error;
            }
        }
        res.json(responseObject);
    }
    validationErrorToObject(ve: ValidationError[]): ValidationObject {
        return ve.reduce((p, c:ValidationError) : ValidationObject => {
            if(!c.children || !c.children.length) {
                p[c.property] = {
                    value: c.value,
                    constraints: Object.keys(c.constraints!)
                        .map(key=>{
                            return this.capitalize(c.constraints![key])+".\u00a0";
                        })
                }
            } else {
                p[c.property] = this.validationErrorToObject(c.children);
            }
            return p;
        }, {} as ValidationObject);
    }

    capitalize(name: string) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
}