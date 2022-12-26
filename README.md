
#  Roxiler Systems

#####  _Backend Developer Internship Assignment_

Name : Vishal Sambhaji Borse
Contact : +917666045526
Gmail : borsev662@gmail.com

  

##  TechStack Used

- Node.js
- Express.js
- PostegreSQL

  
#  Installation

####  Database

1] In your local PostgreSQL shell, run following command to create Database

```sh
CREATE DATABASE roxiler;
```

2] Now the coonnect to created datavase

```sh
\c roxiler;
```

3] Create a table named "product_transaction" in current Database

Install the dependencies and devDependencies and start the server.

```sh
CREATE TABLE product_transaction(
	id INTEGER PRIMARY KEY,
	title TEXT,
	price FLOAT,
	description TEXT,
	category TEXT,
	image TEXT,
	sold BOOLEAN,
	dateOfSale TIMESTAMP
);
```

####  Dependencies

4] Run following Command in the ternimal to install all required dependecies

```sh
npm install
```

5] Create .env file and copy contents of .env.sample and paste into .env file

6] Fill required data in .env file.

  

####  For production

7] To start the server, run following command in the ternimal

```sh
npm start
```

####  For devlopement

8] To start the server, run following command in the ternimal

```sh
npm run dev
```

####  APIs

1} To Fetch data from URl and Insert into the database
GET request:
```sh
localhost:8081/initialize
```
2} To get total sale amount of particular month
GET request:
```sh
localhost:8081/statistics/saleAmount?month=<month_name>
```

3} To get total sold items of particular month
GET request:
```sh
localhost:8081/statistics/soldItems?month=<month_name>
```

4} To get total not sold items of particular month
GET request:
```sh
localhost:8081/statistics/notSoldItems?month=<month_name>
```

5} To get piechart of particular month
GET request:
```sh
localhost:8081/visualize/piechart?month=<month_name>
```

6} To get barchart of particular month
GET request:
```sh
localhost:8081/visualize/barchart?month=<month_name>
```

7} To get all data of particular month
GET request:
```sh
localhost:8081/all?month=<month_name>
```