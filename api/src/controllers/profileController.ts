import {
    JsonController,
    Get,
    UseBefore,
    Req,
    Body,
    Put,
    NotFoundError,
    OnUndefined
} from 'routing-controllers';
import { UpdateUserDTO, FirebaseUserDTO} from '../DTO/userDTO';
import userService from '../services/users';
import {Mapper} from "@nartc/automapper";
import {Request} from "express";
import {authenticate} from "../middlewares/authenticate.middleware";

@JsonController()
@UseBefore(authenticate)
class ProfileController {

    @Get('/profile')
    async getProfile(@Req() req: Request) {
        const userId = req.userId;
        const user = await userService.getUserById(`user:${userId}`);
        return Mapper.map(user, FirebaseUserDTO)
    }

    @Put('/profile')
    @OnUndefined(204)
    async updateProfile(@Body() profile: UpdateUserDTO, @Req() req: Request) {
        const userId = req.userId;
        if(!await userService.exist(`user:${userId}`)) {
            throw new NotFoundError('User Not Found!');
        }
        console.log(`user:${userId}`)
         await userService.updateUserProfile(`user:${userId}`, profile);
    }
}

export default ProfileController;