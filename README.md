# Xpense

## Xpense project

Xpense project

- Expense management PaaS
- To be used by company of all sizes
- API oriented

## Notes and References

Structure des dossiers

```txt
/
  /api
    Backend API
    ExpressJS
    Started with: https://auth0.com/blog/use-typescript-to-create-a-secure-api-with-nodejs-and-express-getting-started/

  /app
    Frontend
    NextJS

  /db/design
    DB design definition files
    DB upgrade script

  /db/design/designs
    CouchDB design files. Used to deploy document views and server side updates

  /db/data
    Sample data

  /docs
    Technical docs & notes

```

## CouchDB

### Useful links
Local web access: http://localhost:5984/_utils/
To get all users: http://localhost:5984/$(db)/_security

### Getting local dev environment ready

1. Start `couchdb` local instance


```sh
docker run -v $PWD/data:/opt/couchdb/data -e COUCHDB_USER=admin2020 -e COUCHDB_PASSWORD=password2020 -p 5984:5984 --name my-couchdb -d couchdb
```

