# Node.js-Express-MongoDB CRUD sample Application

This is a simple Node.js CRUD application using MongoDB.

It is based on
[https://github.com/ijason/NodeJS-Sample-App](https://github.com/ijason/NodeJS-Sample-App) and has the following features:

+ includes Wercker configuration
+ application changes to run on Oracle Container Cloud Service

### How to run

	npm install
	node app.js

### Configuration

MongoDB: `mongodb://mongodb`

Express: `app.listen(process.env.PORT || 3000);`

Wercker environment properties:

+ DOCKER\_USERNAME = username for Docker account
+ DOCKER\_PASSWORD = password for Docker account
+ DOCKER\_TAG = tag of the docker image
+ DOCKER\_REPOSITORY = name of the new repository (includes image name)

## History

### 1.0.0

- Initial version

## License

The Universal Permissive License (UPL), Version 1.0

