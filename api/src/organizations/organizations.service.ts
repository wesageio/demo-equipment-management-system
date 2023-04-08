import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ObjectId } from 'bson';
import { InjectRepository } from '@nestjs/typeorm';

import { filterForQuery } from '../utils/utils';
import { Organizations } from './schemas/organizations.entity';
import { Employees } from '../employees/schemas/employees.entity';

@Injectable()
export class OrganizationsService {
    constructor(
        @InjectRepository(Organizations)
        private readonly organizationsRepository: Repository<Organizations>,
        @InjectRepository(Employees)
        private readonly employeesRepository: Repository<Employees>,
    ) { }

    async insertOrganization(body, userId) {
        const newOrganization = this.organizationsRepository.create({
            name: body.name,
            telephone: body.telephone,
            email: body.email,
            location: body.location,
            website: body.website,
            workers: body.workers,
            cost: body.cost,
            price: body.price,
            risk: body.risk,
            duration: body.duration,
            margin: body.margin,
            totalMargin: body.margin,
            authorId: userId,
        });
        const result = await this.organizationsRepository.save(newOrganization);
        return result;
    }

    async getOrganizations(filter: string, limit: string, page: string, orderBy: string, orderDir: string, userId: string) {
        const parsedFilter = JSON.parse(filter);
        parsedFilter.authorId = userId;
        const filterData = filterForQuery(parsedFilter);
        const maxNumber = parseInt(limit);
        const skipNumber = (parseInt(page) - 1) * parseInt(limit);
        const sortData = {
            [orderBy]: orderDir,
        };

        const data = await this.organizationsRepository.find({
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

    // async getManyOrganizations(filter: any) {
    //     const data = await this.organizationsModel
    //         .find({ _id: { $in: filter.id }})
    //         .exec();
    //     const count = await this.organizationsModel.countDocuments();
    //     return {
    //         data,
    //         count,
    //     };
    // }

    async getOrganization(organizationId: string, userId: string) {
        const organization = await this.findOrganization(organizationId, userId);
        return {
            organization,
        };
    }

    async updateOrganization(id, body): Promise<any> {
        return await this.organizationsRepository.update(
            { id: new ObjectId(id) },
            body,
        );
    }

    async deleteOrganization(organizationId: string) {
        return await this.organizationsRepository.delete(organizationId);
    }

    async deleteOrganizations(organizationIds): Promise<any> {
        return await this.organizationsRepository.delete(organizationIds);
    }

    private async findOrganization(id: string, userId: string): Promise<Organizations> {
        let organization;
        try {
            organization = await this.organizationsRepository.findOne(id, { where: { authorId: userId } });
        } catch (error) {
            throw new NotFoundException('Could not find organization.');
        }
        if (!organization) {
            throw new NotFoundException('Could not find organization.');
        }
        return organization;
    }
}
