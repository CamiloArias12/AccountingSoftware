import { QueryRunner, Repository } from 'typeorm';
import { Beneficiary } from './beneficiary.entity';
import { UpdateBeneficiaryDto } from './dto/updateBeneficiary.dto';
import { BeneficiaryInput } from './dto/createBeneficiary.dto';
export declare class BeneficiaryService {
    private readonly beneficiaryRepository;
    constructor(beneficiaryRepository: Repository<Beneficiary>);
    create(dto: BeneficiaryInput, queryRunner: QueryRunner | null): Promise<Beneficiary>;
    findAll(): Promise<Beneficiary[]>;
    findOne(idDocument: number): Promise<Beneficiary>;
    update(idDocument: number, updateDto: UpdateBeneficiaryDto): Promise<Beneficiary>;
    remove(id: number): Promise<void>;
}
