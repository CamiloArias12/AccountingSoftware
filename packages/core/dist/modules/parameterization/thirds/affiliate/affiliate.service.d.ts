import { DataSource, Repository } from 'typeorm';
import { Affiliate } from './affiliate.entity';
import { CreateAfiliateDto } from './dto/createAfiliate.dto';
import { UpdateAfiliateDto } from './dto/updateAfiliate.dto';
import { UserService } from '../user/user.service';
import { UserInput } from '../user/dto/input/createuser.dto';
import { BeneficiaryInput } from './beneficiary/dto/createBeneficiary.dto';
import { BeneficiaryService } from './beneficiary/beneficiary.service';
export declare class AffiliateService {
    private readonly affiliateRepository;
    private readonly userService;
    private readonly beneficiaryService;
    private readonly dataSource;
    constructor(affiliateRepository: Repository<Affiliate>, userService: UserService, beneficiaryService: BeneficiaryService, dataSource: DataSource);
    create(affiliateInput: CreateAfiliateDto, userInput: UserInput, beneficiaryInput: BeneficiaryInput[], beneficiariesPercentage: number[]): Promise<Affiliate>;
    findAll(): Promise<Affiliate[]>;
    findOne(identification: number): Promise<Affiliate>;
    update(numberAccount: number, updateDto: UpdateAfiliateDto): Promise<Affiliate>;
}
