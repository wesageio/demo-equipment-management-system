import { Injectable, NotFoundException } from '@nestjs/common';

import { filterForQuery } from '../utils/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from './schemas/employees.entity';
import { Repository, getMongoRepository } from 'typeorm';
import { ObjectID } from 'bson';
import { Properties } from '../properties/schemas/properties.entity';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employees)
        private readonly employeesRepository: Repository<Employees>,
        @InjectRepository(Properties)
        private readonly propertiesRepository: Repository<Properties>,
    ) { }

    async insertEmployee(body, userId) {
        const newEmployee = this.employeesRepository.create({
            firstName: body.firstName,
            surname: body.surname,
            dateOfBirth: body.dateOfBirth,
            email: body.email,
            gender: body.gender,
            organization: body.organization,
            property: body.property,
            workingStatus: body.workingStatus,
            authorId: userId,
        });
        const result = await this.employeesRepository.save(newEmployee);
        if (body.property) {
            const properties = await this.propertiesRepository.findByIds(body.property);
            properties.map(async (item) => {
                await await this.propertiesRepository.update(item, {
                    employee: result.id.toString()
                });
            });
        }
        return result;
    }

    async getEmployees(filter: string, limit: string, page: string, orderBy: string, orderDir: string, userId: string) {
        const parsedFilter = JSON.parse(filter);
        // parsedFilter.authorId = userId;
        const filterData = filterForQuery(parsedFilter);
        const maxNumber = parseInt(limit);
        const skipNumber = (parseInt(page) - 1) * parseInt(limit);
        const sortData = {
            [orderBy]: orderDir,
        };

        const data = await this.employeesRepository.find({
            where: filterData,
            order: sortData,
            skip: skipNumber,
            take: maxNumber,
        });

        return {
            data,
            count: data.length,
        };
    }

    async getManyEmployess(ids: any) {
        const data = await this.employeesRepository.findByIds(ids)
        return {
            data,
            count: data.length,
        };
    }

    // async getOneAccounts(filter: any) {
    //     return await this.employeesModel
    //         .find({ _id: filter })
    //         .populate('sockId')
    //         .populate('serverId')
    //         .exec();
    // }

    async getEmployee(employeeId: string, userId: string) {
        const employee = await this.findEmployee(employeeId, userId);
        return {
            employee,
        };
    }

    async isExistReferenceInEmployee(fieldId: string, field: string) {
        const employee = await this.employeesRepository.find({ [field]: fieldId });
        return employee;
    }

    async isExistMultiplsReferenceInEmployee(ids: any, field: any) {
        const repository = getMongoRepository(Employees);
        const data = await repository.find({ [field]: { $in: ids } });
        return data;
    }

    async updateEmployee(id, body): Promise<any> {
        Object.keys(body).forEach((item) => {
            if (body[item] === null) {
                delete body[item];
                Object.assign(body, { $unset: { [item]: 1 } });
            }
        });
        if (body.property) {
            const employee = await this.employeesRepository.findOne(id);
            if (body.property.length !== 0) {
                if (employee.property && employee.property.length !== 0) {
                    const difference = employee.property.filter(x => body.property.indexOf(x) === -1);
                    difference.forEach(async (item) => {
                        await this.propertiesRepository.update(item, {
                            employee: null
                        });
                    });
                }
                const properties = await this.propertiesRepository.findByIds(body.property);
                properties.forEach(async (item) => {
                    await this.propertiesRepository.update(item, {
                        employee: id.toString()
                    });
                });
            } else {
                employee.property.forEach(async (el) => {
                    await this.propertiesRepository.update(el, {
                        employee: null
                    });
                })
            }
        }
        return await this.employeesRepository.update(
            { id: new ObjectID(id) },
            body,
        );
    }

    async deleteEmployee(employeeId: string) {
        await this.propertiesRepository.update({ employee: employeeId }, { employee: null });
        return await this.employeesRepository.delete(employeeId);
    }

    async deleteEmployees(employeesIds): Promise<any> {
        const { ids } = employeesIds;
        ids.forEach(async (item) => {
            await this.propertiesRepository.update({ employee: item }, { employee: null });
        })
        return await this.employeesRepository.delete(ids);
    }

    async findEmployee(id: string, userId: string): Promise<Employees> {
        let employee;
        try {
            employee = await this.employeesRepository.findOne(id, { where: { authorId: userId } });
        } catch (error) {
            throw new NotFoundException('Could not find employee.');
        }
        if (!employee) {
            throw new NotFoundException('Could not find employee.');
        }
        return employee;
    }
}
