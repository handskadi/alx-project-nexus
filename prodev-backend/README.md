# MK E-Shop API (Django + DRF)

Backend for **MK E-Shop** — a production-style e-commerce API with products, categories, JWT auth, CORS, and Swagger docs.

**Project by:** Mohamed KADI (ALX – ProDev Backend)  
**Tech:** Django, Django REST Framework, SimpleJWT, django-filter, drf-spectacular

---

## ✨ Features

- **Products & Categories** CRUD
- **Search / Filter / Sort / Paginate** products
- **JWT authentication** (access/refresh)
- **Swagger / ReDoc** interactive docs
- **CORS** enabled for local Next.js frontend
- **Seeder**: demo categories + 120 sample products

---

## 🚀 Quick Start

```bash
# 1) Activate your venv (example)
source .venv/bin/activate

# 2) Install dependencies
pip install -r requirements.txt
# (or)
pip install django djangorestframework djangorestframework-simplejwt django-filter drf-spectacular django-cors-headers

# 3) Run migrations
python manage.py migrate

# 4) Create admin (optional)
python manage.py createsuperuser

# 5) Seed demo data
python manage.py seed_demo --wipe --count 120

# 6) Start the server
python manage.py runserver
```

---

## 🔗 Endpoints

### Docs

- **Swagger UI:** `GET /api/docs/`
- **ReDoc:** `GET /api/redoc/`
- **OpenAPI JSON:** `GET /api/schema/`

---

### Auth (JWT)

- **Obtain token:** `POST /api/auth/token/`
- **Refresh token:** `POST /api/auth/token/refresh/`

**Request**

```json
POST /api/auth/token/
{
  "username": "admin",
  "password": "yourpassword"
}
```

**Response**

```json
{
  "access": "<JWT_ACCESS>",
  "refresh": "<JWT_REFRESH>"
}
```

**Use the token in requests:**

```http
Authorization: Bearer <JWT_ACCESS>
```

> Note: In this starter, product/category endpoints are public (`AllowAny`). To restrict writes, switch to `IsAuthenticatedOrReadOnly` in the viewsets.

---

### Categories

- `GET /api/categories/` — list
- `POST /api/categories/` — create
- `GET /api/categories/{id}/` — retrieve
- `PUT /api/categories/{id}/` — update
- `DELETE /api/categories/{id}/` — delete

**Example**

```bash
curl http://127.0.0.1:8000/api/categories/
```

**Create**

```bash
curl -X POST http://127.0.0.1:8000/api/categories/   -H "Content-Type: application/json"   -d '{"name":"Electronics","description":"Devices & gadgets"}'
```

---

### Products

- `GET /api/products/` — list
- `POST /api/products/` — create
- `GET /api/products/{id}/` — retrieve
- `PUT /api/products/{id}/` — update
- `DELETE /api/products/{id}/` — delete

**Fields**

```json
{
  "id": 1,
  "name": "Sample Product 1",
  "description": "Demo product",
  "price": "129.99",
  "stock": 42,
  "image": "https://placehold.co/600x450/png?text=Product",
  "category": 3,
  "category_name": "Home",
  "created_at": "2025-08-10T12:34:56Z"
}
```

---

## 🔍 Query Parameters (Products)

- **Search:** `?search=shoe` (matches `name`, `description`)
- **Filter by category (id):** `?category=1`
- **Filter by category name:** `?category__name=Electronics`
- **Ordering:**
  - `?ordering=price` (ascending)
  - `?ordering=-price` (descending)
  - supports `created_at`, `name`
- **Pagination:** `?page=2` (page size is **12** by default)

**Examples**

```bash
/api/products/?search=Sample
/api/products/?category=2&ordering=-price
/api/products/?category__name=Home&ordering=price
/api/products/?page=3
```

**Pagination shape**

```json
{
  "count": 120,
  "next": "http://127.0.0.1:8000/api/products/?page=2",
  "previous": null,
  "results": [
    /* array of products */
  ]
}
```

---

## 🌱 Seeding

Create 4 categories (**Electronics**, **Fashion**, **Home**, **Sports**) and N products (default 120):

```bash
python manage.py seed_demo --wipe --count 120
```

Remove all demo products (keep categories):

```bash
python manage.py clear_demo
```

---

## 🧩 CORS (Frontend Integration)

CORS is enabled for local Next.js dev:

```python
# config/settings.py
CORS_ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]
```

Your frontend can call:

```http
GET http://127.0.0.1:8000/api/products/?page=1&ordering=-price
```

---

## 🗂 Project Structure

```
config/
  settings.py      # DRF, JWT, CORS, Swagger config
  urls.py          # routers + docs + auth
catalog/
  models.py        # Category, Product
  serializers.py   # CategorySerializer, ProductSerializer
  views.py         # ViewSets with search/filter/order/pagination
  admin.py         # Admin registration
  management/
    commands/
      seed_demo.py # seed demo data
      clear_demo.py
```

---

## 🛡️ Permissions (Optional Hardening)

Currently endpoints are open (`AllowAny`). To require auth for writes:

```python
# catalog/views.py
from rest_framework import permissions

permission_classes = [permissions.IsAuthenticatedOrReadOnly]
```

---

## 🧪 Quick cURL Tests

**List products (sorted by price desc)**

```bash
curl "http://127.0.0.1:8000/api/products/?ordering=-price"
```

**Create a category**

```bash
curl -X POST http://127.0.0.1:8000/api/categories/   -H "Content-Type: application/json"   -d '{"name":"Sports","description":"Sporting goods"}'
```

**Obtain JWT**

```bash
curl -X POST http://127.0.0.1:8000/api/auth/token/   -H "Content-Type: application/json"   -d '{"username":"admin","password":"yourpass"}'
```

---

## 🛠 Troubleshooting

- **You must set `settings.ALLOWED_HOSTS` if `DEBUG` is False**  
  Set `DEBUG = True` during development, or add your host to `ALLOWED_HOSTS`.

- **SECRET_KEY must not be empty**  
  Ensure `SECRET_KEY` is set in `config/settings.py`.

- **CORS errors in the browser**  
  Add your frontend origin (port) to `CORS_ALLOWED_ORIGINS`.

- **No data showing**  
  Run the seeder:
  ```bash
  python manage.py seed_demo --wipe --count 120
  ```

---

## 📄 License

MIT (or your preferred license)

---

## 📣 Credits

Built by **Mohamed KADI** for **ALX ProDev Backend (Project Nexus)**.  
Pairs perfectly with the **MK E-Shop** Next.js frontend.
