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
exports.EmployeeResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const employee_entity_1 = require("./employee.entity");
const employee_service_1 = require("./employee.service");
const user_service_1 = require("../user/user.service");
const createEmployee_dto_1 = require("./dto/createEmployee.dto");
const createuser_dto_1 = require("../user/dto/input/createuser.dto");
let EmployeeResolver = class EmployeeResolver {
    constructor(employeeService, userService) {
        this.employeeService = employeeService;
        this.userService = userService;
    }
    async createEmployee(inputEmployee, inputUser) {
        let user = await this.userService.createUser(inputUser, null);
        return await this.employeeService.create(inputEmployee, user);
    }
    async createEmployeeUserExist(inputEmployee, identificationUser) {
        let user = await this.userService.findOne(identificationUser);
        if (user) {
            return await this.employeeService.create(inputEmployee, user);
        }
    }
    async allEmployees() {
        return await this.employeeService.findAll();
    }
};
exports.EmployeeResolver = EmployeeResolver;
__decorate([
    (0, graphql_1.Mutation)(() => employee_entity_1.Employee),
    __param(0, (0, graphql_1.Args)('inputEmployee')),
    __param(1, (0, graphql_1.Args)('inputUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createEmployee_dto_1.CreateEmployee, createuser_dto_1.UserInput]),
    __metadata("design:returntype", Promise)
], EmployeeResolver.prototype, "createEmployee", null);
__decorate([
    (0, graphql_1.Mutation)(() => employee_entity_1.Employee),
    __param(0, (0, graphql_1.Args)('inputEmployee')),
    __param(1, (0, graphql_1.Args)('idUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createEmployee_dto_1.CreateEmployee, Number]),
    __metadata("design:returntype", Promise)
], EmployeeResolver.prototype, "createEmployeeUserExist", null);
__decorate([
    (0, graphql_1.Query)(() => [employee_entity_1.Employee]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeResolver.prototype, "allEmployees", null);
exports.EmployeeResolver = EmployeeResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService,
        user_service_1.UserService])
], EmployeeResolver);
//# sourceMappingURL=employee.resolver.js.map