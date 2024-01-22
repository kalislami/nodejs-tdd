## Login User API

Endpoint : POST /api/user/login

Request Body :

```json
{
  "username" : "kamal",
  "password" : "rahasia"
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
  "errors" : "Username or password wrong"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors" : "Unauthorized"
}
```
