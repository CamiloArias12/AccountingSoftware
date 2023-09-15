"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("./employee.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
let EmployeeService = class EmployeeService {
    constructor(employeeRepository, userService) {
        this.employeeRepository = employeeRepository;
        this.userService = userService;
    }
    async create(dto, user) {
        const employee = this.employeeRepository.create(dto);
        employee.user = user;
        const result = await this.employeeRepository.save(employee);
        console.log("Result", result);
        return result;
    }
    async findAll() {
        return await this.employeeRepository.find();
    }
    async findOne(numberAccount) {
        const user = await this.userService.findOne(numberAccount);
        return user;
    }
    async findByUsername(username, password) {
        const employee = await this.employeeRepository.find({
            where: {
                username: username,
                password: password
            }
        });
        return employee[0];
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map