# JenkinsWorld 2017

This is a seed project to quickly create a jenkins-ci new ux plugin.
It comes with storybook and the [storybook-specification](https://github.com/mthuret/storybook-addon-specifications) plugins already setup.
To make make it even easier to use it has Docker support to see the storybook server.

# Install

After cloning the repository you need to fist build the project.

```bash
mvn clean install
```

The above will as well do a `npm install`. Please make sure that you have build the project before e.g. running with Docker.

# Run

## jenkins

When you first run the plugin via `hpi:run`, you will need to follow the instructions to setup the newly created Jenkins.
However the next time you run the command it will be much faster.

```bash
mvn hpi:run
```

This will start a full jenkins around your plugin.

## storybook

To demonstrate and simulate quickly different use-cases of our components we use [storybook](https://www.npmjs.com/package/@kadira/storybook).

We further use storybook to implement unit testing and cover the acceptance criteria with them.

### Run with npm

* `npm start` used for docker image - to start a new instance on http://localhost:9009
* `npm run storybook` to start a new instance on [http://localhost:9001](http://localhost:9001)
* `npm run storybook:port 9999` to start a new instance on [http://localhost:9999](http://localhost:9999)

### Run with Docker

```
docker build -t cloudbees/speed-custom-storybook .
docker run -d -p 9009:9009 --name bluebook cloudbees/speed-custom-storybook
Point to http://0.0.0.0:9009/
```
