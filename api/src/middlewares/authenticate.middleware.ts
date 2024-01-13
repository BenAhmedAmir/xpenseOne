import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

export const authenticate = async (req: Request, res: Response, next: Function) => {

    const { authorization } = req.headers;
    if(!authorization || !authorization.startsWith('Bearer')) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    const arrTokenSplit = authorization.split(' ');
    if(arrTokenSplit.length !== 2) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    const token = arrTokenSplit[1];


    try {
        const auth = admin.auth()
        const decodedIdToken = await auth.verifyIdToken(token, true);
        console.log(decodedIdToken.uid);
        res.locals = { ...res.locals, uid: decodedIdToken.uid, email: decodedIdToken.email, admin: decodedIdToken.admin }
         req.userId = decodedIdToken.uid;
        return next();
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized'});
    }
}
