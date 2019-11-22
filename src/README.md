# The src Folder

## Index
1. [/project](./README.md)
2. **[/project/src (you are here)](./src/README.md)**
4. [/project/src/assets](./src/assets/README.md)
5. [/project/src/components](./src/components/README.md)
6. [/project/src/data](./src/data/README.md)
7. [/project/src/login](./src/login/README.md)
8. [/project/src/router](./src/router/README.md)
9. [/project/src/signup](./src/signup/README.md)

## What the SRC Folder Contains

### index.js
Index.js will be exposed to the user by default.  As the first thing they see, Index.js typically renders App.js.  Index.js may also contain references to a **Router** which is used to change the view for the user as they nagivate through the application.

### app.js
App.js is typically rendered by Index.js and should contain the majority of the references to the rest of the application.  This Application uses a package called **[BrowserRouter](https://www.npmjs.com/package/react-router)** to change views for the user.  Routes are defined in the App.js page.   An additional Component called **PrivateRoute** is used to provide authenticated routing, simply checking whether or not the user is authenticated, and pushing unauthenticated users back to the homepage similar to a Bouncer at an Exclusive club.

### app.test.js
App.test.js simply checks to see if the App.js component renders without crashing.  Since all components are effectively rendered through the app component it make sense to check and handle error here.  In a production version, all the errors should be handled in their respective components to provide a positive user experience.  
