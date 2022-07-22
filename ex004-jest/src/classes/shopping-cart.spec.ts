import { Discount } from './discount';
import { CartItem } from './interfaces/cart-item';
import { ShoppingCart } from './shopping-cart';

const createSut = () => {
  const discountMock = createDiscountMock();
  const sut = new ShoppingCart(discountMock);
  return { sut, discountMock };
};

const createDiscountMock = (): Discount => {
  class DiscountMock extends Discount {}
  return new DiscountMock();
};

const createCartItemMock = (name: string, price: number): CartItem => {
  class CartItemMock implements CartItem {
    constructor(public name: string, public price: number) {}
  }
  return new CartItemMock(name, price);
};

const [name, price] = ['product', 10.9];
const createSutWithTwoProducts = (): ShoppingCart => {
  const { sut } = createSut();
  const product1 = createCartItemMock(name, price);
  const product2 = createCartItemMock(name, price);

  sut.addItem(product1);
  sut.addItem(product2);

  return sut;
};

describe('Shopping Cart', () => {
  afterEach(() => jest.clearAllMocks());

  it('should be empty when no product is added', () => {
    const { sut } = createSut();
    expect(sut.isEmpty()).toBe(true);
  });

  it('should have 2 cart items', () => {
    const sut = createSutWithTwoProducts();
    expect(sut.items.length).toBe(2);
  });

  it('should have 1 cart item', () => {
    const sut = createSutWithTwoProducts();

    sut.removeItem(1);

    expect(sut.items.length).toBe(1);
  });

  it('should be empty after be cleared', () => {
    const sut = createSutWithTwoProducts();

    sut.clear();

    expect(sut.isEmpty()).toBe(true);
  });

  it('should not be empty when some product is added', () => {
    const sut = createSutWithTwoProducts();
    expect(sut.isEmpty()).toBe(false);
  });

  it('should return sum of cart items price', () => {
    const sut = createSutWithTwoProducts();
    expect(sut.total()).toBe(price * 2);
  });

  it('should call method discount.calculate once when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSut();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');

    sut.totalWithDiscount();

    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call method discount.calculate once with total price when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSut();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');

    sut.totalWithDiscount();

    expect(discountMockSpy).toHaveBeenCalledWith(sut.total());
  });
});
