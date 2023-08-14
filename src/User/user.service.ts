import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './user.entity';
import {Repository} from 'typeorm';
import { CreateUserDto } from './dto/createuser.dto'
import { UpdateUserDto } from './dto/updateuser.dto';
import { LocationService } from '../Location/location.service';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>, private locationService: LocationService
    ){}

    async createUser(user: CreateUserDto){
        const userFound = await this.userRepository.findOne({
            where: {
                numeroIdentificacion: user.numeroIdentificacion,
            },
        });

        if(userFound){
            return new HttpException('Ususario Ya Existe', HttpStatus.CONFLICT);
        }
        
        const geoNamesData = await this.locationService.getGeoNamesChildren();

        const newUser = this.userRepository.create(user)

        return this.userRepository.save(newUser);
    }

    getUsers(){
        return this.userRepository.find();
    }

    async getUser(numeroIdentificacion: number){
        const userFound = await this.userRepository.findOne({
            where: {
                numeroIdentificacion,
            },
        });

        if(!userFound){
            return new HttpException('Ususario No Existe', HttpStatus.NOT_FOUND);
        }

        return userFound;
    }

    async deleteUser(numeroIdentificacion: number){
        /*const userFound = await this.userRepository.findOne({
            where: {
                cedula,
            },
        });

        if(!userFound){
            return new HttpException('Ususario No Existe', HttpStatus.NOT_FOUND);
        }

        return this.userRepository.delete({cedula});*/

        const result = await this.userRepository.delete({numeroIdentificacion});
        if(result.affected===0){
            return new HttpException('Ususario No Existe', HttpStatus.NOT_FOUND);
        }

        return result;
    }

    async updateUser(numeroIdentificacion: number, updateUserr: UpdateUserDto){
        const userFound = await this.userRepository.findOne({
            where: {
                numeroIdentificacion,
            },
        });

        if(!userFound){
            return new HttpException('Ususario No Existe', HttpStatus.NOT_FOUND);
        }
        const updateUser = Object.assign(userFound, updateUserr)
        return this.userRepository.save(updateUser);
        //return this.userRepository.update({cedula}, user);
    }

}