## OS
In order to run OneNet locally with docker you should be in a Linux OS or run everything from WSL.

## CLONE
You can clone the OneNet Front-End repo on your machine by running:

```
git clone https://github.com/ubitech/onenet-dashboard-frontend
```

## Run with docker locally

This project represents the front-end of the OneNet Monitoring and Analytics Dashboard. Make sure you're in the right directory and your local Docker is running.

In the `docker-entrypoint.sh` script make sure that: `BACKEND_HOST=localhost`

Then, you can build the image like so:

`docker build -t onenet-dashboard-frontend-image .`

Build with non default arguments:

Default env: ""

Non default envs: "-docker", "-prod"

If using `prod`, edit `SERVER_ENDPOINT` and `KEYCLOAK_ACCOUNT_PAGE_URL` in `environment.prod.ts` accordingly.

Default port: 80

`docker build --build-arg env=<your_env> --build-arg port=<your_port> -t onenet-dashboard-frontend-image .`

If you want to change the default port, remember to also change it from the `nginx.conf.template` file.

And run the container:

`docker run -p 8888:80 onenet-dashboard-frontend-image`

If you want to run the whole OneNet system (frontend-backend-analytics), refer to the [backend](https://github.com/ubitech/onenet-dashboard-backend) and [analytics](https://github.com/ubitech/onenet-dashboard-analytics) repositories.
Make sure that in the `.env` file of the backend repository, the `KEYCLOAK_AUTH_URL_PROD` serves `localhost`.

Then from the onenet main folder:

- Inside the backend repo, build the image locally: `docker build -t onenet-dashboard-backend-image .`
- Run the following command:
  `docker-compose up --force-recreate`

## Run the development server (build the frontend from scratch)

First of all, move to the directory of the project you wish to build.

In order to build this project and run the development server you must have Angular and its prerequisites installed in your local system.

Specifically, you should have:

    - NVM version 0.37.2
    - Node.js version 14.18.1
    - NPM version 6.16.5
    - Angular version 12.2.12

++ About NVM

What is NVM: Node Version Manager (MVM) is a tool that allows the user to switch between different versions of Node.js, helping reduce overhead when reproducing production bugs in development environments. (see: https://github.com/nvm-sh/nvm#about)

++ About NPM

What is NPM: NPM is the world's largest software registry. Open source developers from every continent use npm to share and borrow packages, and many organizations use npm to manage private development as well.

NPM consists of three distinct components:

    - the website (to discover packages, set up profiles, and manage other aspects of your npm experience. For example, you can set up organizations to manage access to public or private packages)
    - the Command Line Interface (CLI, runs from a terminal, and is how most developers interact with npm)
    - the registry (a large public database of JavaScript software and the meta-information surrounding it)

(For more information see: https://docs.npmjs.com/about-npm)

+++ First, check whether you already have these installed in your system, as well as their current versions, by running the following commands:

`nvm --version`

`node --version`

`npm --version`

`ng --version`

+++ If you don't have some of the aforementioned, install them by following installation instructions:

Make sure you don't have folder `node_modules` and `package-lock.json` in you angular directory:

`rm -rf node_modules`

And the generated file package-lock.json:

`rm package-lock.json`

+++ Installation instructions

To install NVM (version 0.37.2) using curl, run the following command:

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash`

At this point, you will be prompted by the command output to restart your terminal, don't forget to do it!
If you do not wish to restart your terminal you can perform source /root/.bashrc so that any env variables
installed by the nvm can be refreshed in your .bashrc file.

You can confirm the version of NVM that is running with the following command:

`nvm --version`

Now you will use NVM to install Node.js (version 14.18.1):

`nvm install 14.18.1`

You can review all installed versions of Node with the ls command.

`nvm ls`

Then install globally Angular CLI. Its version should be newer than 10.1.17:

If the global installation latest version does not work, install it at project level:
`npm install @angular/cli@10.1.17`

To run a locally installed version of the angular-cli, you can call ng commands directly by adding the .bin folder within your local node_modules folder to your PATH.
The node_modules and .bin folders are created in the directory where npm install @angular/cli was run upon completion of the install command.

Use the following command to verify the version:

`ng --version`

Then run the following command to install all the required modules for the web application:

`npm install`

(At this point, if you get any errors, please try to delete the node_modules directory and then run `npm install` again. To delete the node_modules directory, run `rm -rf node_modules`.)

Finally, run the dev server with:

`ng serve`

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

A threefold logger service is used, therefore the logged incidents are stored on the console, in the
Local Storage and are also send to the Web API and stored there.

Note: To see all cosnsole-logged incidents, right-click on your browser and select inspect.
Make sure to check "Preserve log upon navigation" option in the settings.
Note: Since a fake-backend is used, whenever a log entry is sent to the backend, a message stating
"Log entry sent to backend log" is logged to console, in order to demonstrate that the logger works properly.
Note: A developer, or someone with access to the source code, can easily change the configuration of the
loggers as well as enable/disable them, through two json files. For more information see below.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

See also:

https://stackoverflow.com/questions/32426601/how-can-i-completely-uninstall-nodejs-npm-and-node-in-ubuntu
https://www.linode.com/docs/guides/how-to-install-use-node-version-manager-nvm/
https://www.linode.com/docs/guides/install-and-use-npm-on-linux/
https://stackoverflow.com/questions/45052520/do-i-need-both-package-lock-json-and-package-json
https://www.npmjs.com/package/@angular/cli
https://nodejs.org/en/about/
