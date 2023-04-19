import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UserLogin} from "./dto/user-login";
import {Response} from "express";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }


    @Post('/login')
    async login(@Body() params: UserLogin, @Res() res: Response) {
        const data = await this.userService.login(params);

        return res.status(200).json({
            id: data.id,
            name: data.name,
            register: data.register
        });
    }

}
