## Login Oauth User API

Endpoint :  POST /api/user/login/oauth

Request Body :

```json
{
  "username" : "kamal",
  "name" : "Kamaludien",
  "oauth_id": "some-key"
}
```

Response Body Success :

```json
{
  "data" : {
    "token" : "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors" : ["some error messages"]
}
```
