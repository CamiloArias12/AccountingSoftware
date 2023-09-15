import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClassAccountDto } from './dto/createClassAccount.dto';
import { UpdateClassAccountDto } from './dto/updateClassAccount.dto';
import { ClassAccount } from './class-account.entity';
import { TypeAccountService } from '../type-account.service';
import { TypeAccount } from '../type-account.entity';

@Injectable()
export class ClassAccountService {
    constructor(
        @InjectRepository(ClassAccount)
        private readonly classAccountRepository: Repository<ClassAccount>,
	private readonly typeAccountService:TypeAccountService
    ) { }

    async create(createClassAccountDto: CreateClassAccountDto): Promise<ClassAccount> {

        const typeAccount:TypeAccount=await this.typeAccountService.create(createClassAccountDto)
	if(typeAccount){
	    const classAccount = new ClassAccount();
	    classAccount.typeAccount=typeAccount
	    return await this.classAccountRepository.save(classAccount);
	}
    }

    async findAll(): Promise<ClassAccount[]> {
        return await this.classAccountRepository.find();
    }

    async findOne(code: number): Promise<ClassAccount> {
        const classAccount = await this.classAccountRepository.findOne({
            where: {
                code,
            },
        });
        if (!classAccount) {
            throw new NotFoundException(`ClassAccount with code ${code} not found`);
        }
        return classAccount;
    }

    async update(code: number, updateClassAccountDto: UpdateClassAccountDto): Promise<ClassAccount> {
        // Busca un ClassAccount existente basado en el código proporcionado.
        const existingClassAccount = await this.classAccountRepository.findOne({
            where: { code },
        });

        if (!existingClassAccount || !existingClassAccount.typeAccount) {
            throw new NotFoundException(`ClassAccount or its TypeAccount with code ${code} not found`);
        }

        // Si se ha proporcionado un nuevo código en el DTO, actualizar ClassAccount con ese código.
        if (updateClassAccountDto.code && existingClassAccount.code !== updateClassAccountDto.code) {
            existingClassAccount.code = updateClassAccountDto.code;
            await this.classAccountRepository.save(existingClassAccount);
        }

        // Actualiza el TypeAccount asociado con los valores del DTO.
        await this.typeAccountService.update(existingClassAccount.typeAccount.code, {
            code: updateClassAccountDto.code,   // Esto podría ser opcional si no deseas cambiar el código del TypeAccount
            name: updateClassAccountDto.name,
            nature: updateClassAccountDto.nature,
        });

        return existingClassAccount;
    }

    async remove(code: number): Promise<void> {
        const classAccount = await this.findOne(code);

        if (!classAccount) {
            throw new NotFoundException(`ClassAccount with code ${code} not found`);
        }

        // Primero eliminamos el ClassAccount.
        await this.classAccountRepository.remove(classAccount);

        // Luego, eliminamos el TypeAccount asociado.
        if (classAccount.typeAccount) {
            await this.typeAccountService.remove(classAccount.typeAccount.code);
        }
    }

}

