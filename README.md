
# Proelium Analytics Private Limited

#####  _Node.js Development Internship Assignment_

Name : Vishal Sambhaji Borse
Contact : +917666045526
Gmail : borsev662@gmail.com

  

##  TechStack Used

- Node.js
- Express.js
- MongoDB

  
#  Installation

####  Database

1] Open your MongoDB shell

2] Now open ternimal and run following command to start mongod server
```sh
mongod
```
####  Dependencies

3] Run following Command in the ternimal to install all required dependecies

```sh
npm install
```

4] Create .env file and copy contents of .env.sample and paste into .env file

5] Fill required data in .env file.

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

# APIs
####  For User

**1} To add yourself as a User**
- POST request:
Request Body = { firstName, middleName, lastName, userEmail, userPassword, confirmUserPassword, userDepartment }
```sh
localhost:3000/user/add
```
**2} To login us a user**
POST request:
Request Body = {  userEmail, userPassword }
```sh
localhost:3000/user/login
```
_Before Accessing all below APIs make sure that you have logged In and get token_
_While making request, in the headers_
_Add_   **key : Authorization and value : Bearer<space><token>**

**3} To view self data**
GET request:
```sh
localhost:3000/user/view
```

**4} To update your data**
PUT request:
In the request body put data to be updated
Request Body = { firstName, middleName, lastName, userDepartment  }
```sh
localhost:3000/user/update
```

**5} To get data of all Users**
GET request:
```sh
localhost:300/user/viewAllUsers
```

**6} To update data of other user**
PUT request:
In the request body put data to be updated
Request Body = { firstName, middleName, lastName, userDepartment }
```sh
localhost:3000/user/updateUser/<email_of_person_whose_data_is_to_update>
```

####  For Admin

**1} To add yourself as a Admin**
POST request:
Request Body = { firstName, middleName, lastName, adminEmail, adminPassword, confirmAdminPassword, adminDepartment }
```sh
localhost:3000/admin/add
```
**2} To login us a Admin**
POST request:
Request Body = {  adminEmail, adminPassword }
```sh
localhost:3000/admin/login
```
_Before Accessing all below APIs make sure that you have logged In and get token_
_While making request, in the headers_
_Add_   **key : Authorization and value : Bearer<space><token>**

**3} To view self data**
GET request:
```sh
localhost:3000/admin/view
```

**4} To update your data**
PUT request:
In the request body put data to be updated
Request Body = { firstName, middleName, lastName, adminDepartment  }
```sh
localhost:3000/admin/update
```
**5} To add new user**
POST request:
In the request body put data of new user
Request Body = { firstName, middleName, lastName,userEmail, userPassword, confirmUserPassword, userDepartment, }
```sh
localhost:3000/admin/addUser
```
**6} To add new admin**
POST request:
In the request body put data of new admin
Request Body = { firstName, middleName, lastName, adminEmail, adminPassword, confirmAdminPassword, adminDepartment }
```sh
localhost:3000/admin/addAdmin
```

**7} To view data of all users/admins/both**
GET request:
```sh
localhost:3000/admin/viewAll?role=<admin-for admins,user-for users, all-for both>
```
**8} To update data of any user**
PUT request:
In the request body put data to be updated
Request Body = { firstName, middleName, lastName, userDepartment }
```sh
localhost:3000/admin/updateUser/<email_of_person_whose_data_is_to_update>
```
**9} To update data of other admin**
PUT request:
In the request body put data to be updated
Request Body = { firstName, middleName, lastName, adminDepartment }
```sh
localhost:3000/admin/updateUser/<email_of_person_whose_data_is_to_update>
```


