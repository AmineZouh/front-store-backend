# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

### Restful routes
# Product

show all products route : '/products' [GET]
show a specific product based on the id route : '/products/:id' [GET]
create a specific product route : '/products' [POST]
show the top five most popular products route : '/products/topfivepopular' [GET]
show products of a specific category : '/products/:category' [GET]

# User

show all users route : '/users' [GET]
show a specific user by id route : 'users/:id' [GET]
create new user route : '/users' [POST]

# Order

show the current active user's order : '/orders/active/:user_id' [GET]
show the list of completed user's orders : '/orders/completed/:user_id' [GET]

#### Database tables 

# products table 

products(id serial primary key, name varchar(100), category varchar(100), price integer, number_sells integer);

# users table

users(id serial primary key, first_name varchar(100), last_name varchar(100), password varchar(100))

# orders table 

orders(id serial primary key, user_id integer [ foreign key references users(id)], date varchar(100), status varchar(100));

