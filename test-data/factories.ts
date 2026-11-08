import { faker } from '@faker-js/faker';
import { CompanyData, COMPANY_SIZES } from '../pages/company-page';

export function buildContact() {
    return {
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        phone: `50${faker.string.numeric(7)}`,
    };
}

export function buildCompany(overrides: Partial<CompanyData> = {}): CompanyData {
    return {
        name: `${faker.company.name()} QA`,
        size: faker.helpers.arrayElement(COMPANY_SIZES),
        address: faker.location.streetAddress({ useFullAddress: true }),
        taxId: faker.string.numeric(15),
        role: faker.person.jobTitle(),
        message: 'Test request from automated QA run, please ignore.',
        ...overrides,
    };
}
