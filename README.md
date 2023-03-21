# jwt-authentication
A demo for a JWT authentication

# Project setup
```
npm install
```

# Run
```
npm run dev
```

# CURL
```
curl --location 'http://127.0.0.1:8000/create' \
--header 'Content-Type: application/json' \
--data '{"phone":9999123123,"otp":1835}'
```

```
curl --location 'http://127.0.0.1:8000/verify' \
--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6ODI4NTQ5NNjU2MzR9.ysqUePOdCYWA3vyUqHVKF915QuJN1EPPsnIEkwDl7NA'
```
