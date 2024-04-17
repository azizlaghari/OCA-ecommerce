## What to Follow

### `Project Clone & Install`

1. Clone this Repository by running this command on `Command Prompt` <br />
   `git clone https://github.com/azizlaghari/OCA-ecommerce.git`

2. After Successfully cloning this repo you need to install all libraries with this command <br />
   `npm install --legacy-peer-deps`

### `Structure`

- assets
- components
   - banner
   - header
   - footer
   - loader
   - modals
   - file-camel-case.js
- config
   -- App.js
   -- constants.js
   -- PrivateRoutes.js
   -- Routes.js
   -- theme.js
- layout
  -- Layout.js
  -- MainMenu.js
  -- MenuDrawer.js
  -- MobileLayout.js
  -- VerticalLayout.js
- pages
   - App
    - Folder Name
        - index.tsx
        - data.tsx
   - Auth
       - Folder Name
           -index.tsx   
- store
  -- interface
  -- service
  -- slice
    - reduxtoolkitslices.tsx
- styles
   - components
      -- file-camel-case.css
   - pages
      -- file-camel-case.css
   - _antd.css
   - _general.css
   - _layout.css
   - style.css
   
### `Api-Fetching`

- Use axios as a dependency for fetching data for an API

### `Styling`

- Use CSS for styling and Antd [https://ant.design].

### `State Management`

- Redux toolkit for State Management

### `Naming`

- Use of PascalCase for constructor functions naming
- Use of camelCase for variable naming
- Use of camel-case for file naming
- Prefix component with page or component name
- Reducer Naming (name-camelcase-Reducer.ts)
- Action Naming (name-camelcase-Action.ts)


### `Forms`

- Use antd-Forms for forms [https://ant.design/components/form]

### `Don't`

- No use of class based component
- Don't just add any dependency

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
