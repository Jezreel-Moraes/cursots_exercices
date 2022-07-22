import { Product } from './product';

const createSut = (name: string, price: number) => {
  return new Product(name, price);
};

describe('Product', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return undefined', () => {
    const [name, price] = ['produto', 19.95];
    const sut = createSut(name, price);

    expect(sut).toHaveProperty('name', name);
    expect(sut.price).toBeCloseTo(price);
  });
});
