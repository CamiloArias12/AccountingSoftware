import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Affiliate } from './affiliate.entity';
import { CreateAfiliateDto } from './dto/createAfiliate.dto';
import { UpdateAfiliateDto } from './dto/updateAfiliate.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';


@Injectable()
export class AffiliateService {
    constructor(
        @InjectRepository(Affiliate)
        private readonly afiliateRepository: Repository<Affiliate>,
	private readonly  userService:UserService
    ) {}

    async create(dto: CreateAfiliateDto,user:User): Promise<Affiliate> {
        const afiliate = this.afiliateRepository.create(dto);
	afiliate.user= user
        return await this.afiliateRepository.save(afiliate);
    }

    async findAll(): Promise<Affiliate[]> {
        return await this.afiliateRepository.find();
    }
/*
    async findOne(numberAccount: number): Promise<User> {
        const user:User = await this.userService.findOne(numberAccount)

        if (!user&& !user.affiliate) {
            throw new NotFoundException(`Afiliado con ID ${numberAccount} no encontrado`);
	}
        return user;
    }
*/
    async update(numberAccount: number, updateDto: UpdateAfiliateDto): Promise<Affiliate> {
        const afiliate = await this.afiliateRepository.preload({ numberAccount, ...updateDto });
        if (!afiliate) {
            throw new NotFoundException(`Afiliado con ID ${numberAccount} no encontrado`);
        }
        return await this.afiliateRepository.save(afiliate);
    }

}
