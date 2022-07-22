import { EnterpriseCustomer, IndividualCustomer } from './customer';

const createIndividualCustomer = (
  firstName: string,
  lastName: string,
  cpf: string,
): IndividualCustomer => {
  return new IndividualCustomer(firstName, lastName, cpf);
};

const createEnterpriseCustomer = (
  name: string,
  cnpj: string,
): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj);
};

describe('IndividualCustomer', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have firstName, lastName and cpf', () => {
    const [firstName, lastName, cpf] = ['Nome', 'Sobrenome', '11.11'];
    const sut = createIndividualCustomer(firstName, lastName, cpf);

    expect(sut).toHaveProperty('firstName', firstName);
    expect(sut).toHaveProperty('lastName', lastName);
    expect(sut).toHaveProperty('cpf', cpf);
  });

  it('should have methods to get name and idn', () => {
    const [firstName, lastName, cpf] = ['Nome', 'Sobrenome', '11.11'];
    const sut = createIndividualCustomer(firstName, lastName, cpf);

    expect(sut.getName()).toBe(`${firstName} ${lastName}`);
    expect(sut.getIDN()).toBe(cpf);
  });
});

describe('EnterpriseCustomer', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have name and cnpj', () => {
    const [name, cnpj] = ['Nome', '111.11'];
    const sut = createEnterpriseCustomer(name, cnpj);

    expect(sut).toHaveProperty('name', name);
    expect(sut).toHaveProperty('cnpj', cnpj);
  });

  it('should have methods to get name and idn', () => {
    const [name, cnpj] = ['Nome', '111.11'];
    const sut = createEnterpriseCustomer(name, cnpj);

    expect(sut.getName()).toBe(name);
    expect(sut.getIDN()).toBe(cnpj);
  });
});
