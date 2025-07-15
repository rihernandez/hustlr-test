# E-commerce Backend API

## Run Locally

### Clone the Project

```bash
git clone https://ecommerce-assignment-admin@bitbucket.org/ecommerce-assignment/ecommerce.git
```

### Go to the Project Directory

```bash
cd ecommerce
```

### Install Dependencies

```bash
npm install

# OR if you encounter peer dependency issues:
npm install react-material-ui-carousel --save --legacy-peer-deps
```

---

## Node Version

This project runs on **Node.js v16.20.2**.  
Make sure you are using this version.

If you're using NVM:

```bash
nvm use 16.20.2
```

---

## MongoDB Docker Setup

You need a running MongoDB instance. You can set it up using Docker with the following command:

```bash
docker run -d \
  --name mongo-rhc \
  -p 27017:27017 \
  -e MONGO_INITDB_DATABASE=rhc921004 \
  mongo:6
```

---

## Start the Application

```bash
npm run dev
```

The backend server will start, and you can access the app in your browser at:

```
Swagger Docs available at http://localhost:4000/api/v1/api-docs
```

> The backend API listens on port `4000` 

---

## Test the Product API

Once the app is running, you can test the `POST /products` endpoint using the following example with `curl`:

```bash
curl -X 'POST' \
  'http://localhost:4000/api/v1/products' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Producto Test",
  "quantity": 10,
  "category": ["63f1a9f6a1234abcd56789ef"],
  "warranty": 1,
  "return": "7 días",
  "description": "Descripción de prueba",
  "highlights": "Destacados",
  "price": 99.99,
  "availableDistricts": [
    "district1"
  ]
}'
```

---

## Notes

- The endpoint `api/v1/products` supports:
  - `GET` – List all products
  - `GET api/v1/products/:id` – Get product by ID
  - `GET api/v1/products?category=<categoryId>` – Filter products by category
  - `POST` – Create a new product (public test version available)
