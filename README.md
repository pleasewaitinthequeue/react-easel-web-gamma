# EASEL for Web

## Index
1. **[/project (you are here)](./README.md)**
2. [/project/src](./src/README.md)
4. [/project/src/assets](./src/assets/README.md)
5. [/project/src/components](./src/components/README.md)
6. [/project/src/data](./src/data/README.md)
7. [/project/src/login](./src/login/README.md)
8. [/project/src/router](./src/router/README.md)
9. [/project/src/signup](./src/signup/README.md)

## EASEL Description
Educational Application Supporting Experiential Learning (EASEL) is a web application with a mobile application counter part that allows Instructors to facilitate the experiential learning cycle by providing Just In Time content.  An ongoing project, the aim is to facilitate collection of audio / video as well as geospatial notifications that scaffold these types of activities.

## EASEL Code Layout
Almost all custom code required for this application is nested beneat the ```/src``` folder.  **Assets** includes any media that must be included with the production build, while **Components** includes components required to render the web application. **Login**, **Router**, and **Signup** contain workflows for authentication and authenticated routing. Data contains the initial test JavaScript Object Notation (JSON) file **Courses.json**, as well as **Theme.json** which contains theme data that is referenced by many components in the application. **Style.css** contains some instructions, though most CSS will be found inside the Components themselves, in a const variable called ```styles```.

## Setup Procedure (Windows)
1. Install [NodeJS](https://nodejs.org/en/)
2. Install [Git CLI](https://git-scm.com/downloads)
2. Confirm that NodeJS is installed by opening a command prompt and typing ``` node --version ```
3. Install Create React App Script ``` npm install --global create-react-app ```
4. Clone github repository by typing ``` git clone https://github.iu.edu/jomalair/react-web-easel-gamma.git ```
5. Move your command line into the directory by typing ``` cd directoryname ``` until your command line is focused on the same directory as the cloned repository.
5. Install dependencies by looking at the [package.json](./package.json) file by typing ``` npm install package1 package2 .... ``` including all packages listed in the dependencies section.
6. Try starting the development server by typing ``` npm start ```
