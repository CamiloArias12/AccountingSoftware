import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  async create(data: CreateRoleInput) {
    try {
      const role = this.roleRepository.create(data);
      await this.roleRepository.save(role);
      return true;
    } catch (e) {
      return false;
    }
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) {
    return this.roleRepository.findOne({ where: { id: id } });
  }

  async update(id: number, data: UpdateRoleInput) {
    try {
      await this.roleRepository.update({ id: id }, { ...data });
      return true;
    } catch (e) {
      return false;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
