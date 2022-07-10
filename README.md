# nodejs-mongodb-cart-test

## Setup
```shell
yarn install
docker-compose up -d
docker-compose exec app yarn seed
```

## Test
```shell
yarn install
yarn test
```

## endpoint
```
GET http://localhost:3000/users
GET http://localhost:3000/products
GET http://localhost:3000/orders
GET http://localhost:3000/cart
POST http://localhost:3000/cart/checkout
POST http://localhost:3000/cart/add-product
{
  "productId": "xxx",
  "qty": 1
}
```

## Spec
### Data Type
1. user
2. product(name, price, inventory)
3. shopping cart
4. order
### Action
1. User can add products to current cart
2. User can checkout and create order for current cart