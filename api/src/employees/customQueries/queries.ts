import { Employees } from '../schemas/employees.entity';
import { getMongoRepository } from 'typeorm';

export class Queries {
    async removeDeletedPropertiesFromEmployees(employee, propertyIds): Promise<any> {
        const repository = getMongoRepository(Employees);

        return await repository.updateMany({ _id: employee.id },
            { $pull: { property: { $in: propertyIds } } },
            { upsert: true });
    }

    async removeDeletedOrganization(employee, organizationIds): Promise<any> {
        const repository = getMongoRepository(Employees);
        return await repository.updateMany({ _id: employee.id },
            { $pull: { organization: { $in: organizationIds } } },
            { upsert: true });
    }
}
