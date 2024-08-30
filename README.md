# Todo List Application

###### **Current version: v1.0.0**

[![GitHub version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)](https://badge.fury.io/gh/bumuthu%2Ftodo-list-app)


## Overview
This project facilitates the management of your tasks with to-do lists. In this project, the following tech stack is used.

- Lerna: `8.1.6`
- NPM: `10.8.2`
- Node: `20.10.0`
- React: `17.0.2`


## Installation
This project is a mono repo project based on `npm` and `lerna` mono repo management tool. With that, you can get started easily by running the following commands from the root directory of the repo. This will build artifacts of each packages including `common` package which is required for other two packages. 

        npm install
        npm run build


## Usage
Then you can run the application by running the following command. This will run both UI and backend on `3000` and `3050` ports respectively.

         npm run start


Then, it will automatically open up the UI on `http:localhost:3000` in your browser. Here we go!



![Home page](images/home-page.png)
![Create Task](images/create-task.png)


Enjoy managing your to-do list now! 


## Changelog

### [1.0.0] - 2024-07-20
#### Added
- Initial release of the project.
- Basic functionality implemented.

## Version History

| Version | Release Date | Notes                        |
|---------|--------------|------------------------------|
| 1.0.0   | 2024-07-20   | Initial release              |
