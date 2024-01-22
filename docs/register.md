## Register User API

Endpoint :  POST /api/user

Request Body :

```json
{
  "username" : "kamal",
  "password" : "rahasia",
  "name" : "Kamaludien"
}
```

Response Body Success :

```json
{
  "data" : {
    "username" : "kamal",
    "name" : "Kamaludien"
  }
}
```

Response Body Error :

```json
{
  "errors" : ["some error messages"]
}
```