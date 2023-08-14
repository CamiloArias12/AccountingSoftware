import { Controller, Post, Get, Body, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createuser.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateuser.dto';

@Controller('users')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    createUser(@Body() newUser: CreateUserDto){
       return this.userService.createUser(newUser);
    }

    @Get()
    getUsers(): Promise<User[]>{
        return this.userService.getUsers();
    }

    @Get(':numeroIdentificacion')
    getUser(@Param('numeroIdentificacion', ParseIntPipe) numeroIdentificacion: number){
        return this.userService.getUser(numeroIdentificacion);
    }

    @Delete(':numeroIdentificacion')
    deleteUser(@Param('numeroIdentificacion', ParseIntPipe) numeroIdentificacion: number){
        return this.userService.deleteUser(numeroIdentificacion);
    }

    @Patch(':numeroIdentificacion')
    updateUser(@Param('numeroIdentificacion', ParseIntPipe) numeroIdentificacion: number, @Body() updateUser: UpdateUserDto){
        return this.userService.updateUser(numeroIdentificacion, updateUser);
    }


}