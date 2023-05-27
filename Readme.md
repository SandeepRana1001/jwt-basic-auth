# BASICS OF JWT Authentication

This app is created by me i.e [**Sandeep Rana**](https://www.linkedin.com/in/its-sandeeprana/).

This app provides a basic understanding of JWT and could be extended for many other application. One can even use this app as the **starter pack**.

#### Before running the application , make sure to create a .env file in the project root directory.

## Follow the below code to edit the .env file

```sh
MONGO_URI = 'YOUR_MONGO_URI'
SECRET_KEY = 'YOUR_SECRET_KEY'
PORT = 8000

```

**Note:** You can edit the PORT number as it is **not mandatory** to be 8000 only 

### To Run the application :

```sh
npm install 
npm start
```

## POSTMAN COLLECTION

Download and upload the postman collection from **Collection Folder**

### METHODS

#### POST METHOD - For Registering User

```sh
http://localhost:8000/api/user/register/
```

**Sample Data**

```sh
{
    "name":"Sandeep Rana",
    "email":"user@email.com",
    "password":"123456"
}
```

**Response Body**

```sh
{
    "state": true,
    "response": "User Registered successfully",
    "user": {
        "_id": "647260aaf602b8d6ecdd797b",
        "name": "Sandeep Rana",
        "email": "user@email.com"
    }
}
```

#### POST METHOD - For Logging User In

```sh
http://localhost:8000/api/user/login/
```

**Sample Data**

```sh
{
    "email":"user@email.com",
    "password":"123456"
}
```

**Response Body**

```sh
{
    "state": true,
    "response": "User Logged In successfully",
    "user": 
    {
        "_id": "647260aaf602b8d6ecdd797b",
        "name": "Sandeep Rana",
        "email": "user@email.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDcyNjBhYWY2MDJiOGQ2ZWNkZDc5N2IiLCJpYXQiOjE2ODUyMTc0ODAsImV4cCI6MTY4NTIyMTA4MH0.UwRXqYOCGha7-fuBxTScdLKehUjYAsdxzMZ8Jdsa7es",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDcyNjBhYWY2MDJiOGQ2ZWNkZDc5N2IiLCJpYXQiOjE2ODUyMTc0ODAsImV4cCI6MTY4NTMwMzg4MH0.EpBhhGa8UrAWy5fNGRLoniZoxo3ObWD8ySlOPGk1g-U"
    }
}
```

#### The token generated is valid for 1 hour and refresh token will expire in 1 day.

#### GET METHOD - Get all logged in users

```sh
http://localhost:8000/api/user/
```

**Note:** This route will only work if you provide the authorization and refresh token in **headers**.

Below is the format for both Authorization and refresh token

```sh
x-refresh-token : Refresh eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDcyMzc0MjkxMGU0NjQ1NzA5ZTQ1Y2MiLCJpYXQiOjE2ODUyMTQ5MDMsImV4cCI6MTY4NTMwMTMwM30.ONunKfJJEyaTqRwkcNMeuUpTZuDi7KCTR990WUe7iHq
authorization   : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDcyMzc0MjkxMGU0NjQ1NzA5ZTQ1Y2MiLCJpYXQiOjE2ODUyMTQ5MDMsImV4cCI6MTY4NTIxODUwM30.hz2CdzA4gDiLoKkf5mMSSUhsKNAAWq_thZnsXZJHATU  
```

The app will regenerate token even after the token is expired but the condition is that the refresh token should still be valid.

**Sample Data**

Since it is a get request , no body is required. Just headers.

**Response Body**

```sh
{
    "state": true,
    "response": "All Users were fetched successfully",
    "users": [
        {
            "_id": "647260aaf602b8d6ecdd797b",
            "name": "Sandeep Rana",
            "email": "user@email.com",
            "__v": 0
        }
    ],
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDcyNjBhYWY2MDJiOGQ2ZWNkZDc5N2IiLCJpYXQiOjE2ODUyMTc0ODAsImV4cCI6MTY4NTIyMTA4MH0.UwRXqYOCGha7-fuBxTScdLKehUjYAsdxzMZ8Jdsa7es",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDcyNjBhYWY2MDJiOGQ2ZWNkZDc5N2IiLCJpYXQiOjE2ODUyMTc0ODAsImV4cCI6MTY4NTMwMzg4MH0.EpBhhGa8UrAWy5fNGRLoniZoxo3ObWD8ySlOPGk1g-U"
}
```
