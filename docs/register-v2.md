## Register User API (update tambahan nik)

Endpoint :  POST /api/user

Request Body :

```json
{
  "username" : "kamal",
  "password" : "rahasia",
  "name" : "Kamaludien",
  "nik" : "123487987443"
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