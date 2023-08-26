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
        const classAccount = await this.classAccountRepository.preload({
            code: code,
            ...updateClassAccountDto,
        });
        if (!classAccount) {
            throw new NotFoundException(`ClassAccount with code ${code} not found`);
        }
        return await this.classAccountRepository.save(classAccount);
    }

    async remove(code: number): Promise<void> {
        const classAccount = await this.findOne(code);
        await this.classAccountRepository.remove(classAccount);
    }
}

