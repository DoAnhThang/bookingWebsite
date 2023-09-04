# Booking Website

• __Deployment__: 

Client App: https://rjs-asm02-fx19838-client.netlify.app

Admin App: https://rjs-asm02-fx19838-admin.netlify.app

• **Demo accounts**: 

`test@test.com` (password: 1111)

`admin@test.com` (password: 1111)

• **Techniques**: Mongoose, ExpressJS, ReactJS, NodeJS

• **Description**: hotel reservations and manage it all in the admin page.

• **Reason to do**: 

    - Save time, effort and flexibility.

    - Provide diverse and detailed information about hotels.

    - Automatic feature and quick confirmation when booking.

    - Provides reviews and feedback from previous customers.

    - Provide special offers and promotions to users.

• **Project process**: 

    (1) Front-end: Client & Admin

        - Create a new ReactJS project and Router for application.

        - Create a total layout including NavBar, Main Content and Footer.

        - Handling account sign up / login / logout by localStorage.
    
        - Build detail interface for each route: Home, Search and Detail pages.

        - Build advanced functions such as Date Picker, CRUD, ...

    (2) Back-end: 

        - Create a new NodeJS project and database models.

        - Create account authentication function.

        - Build controllers (REST API) to handle requests and responses back to front-end.

• **How to install and start this project (dev. version)**

(1) Open VS Code -> Open Root Folder.

(2) Open Terminal -> Run `cd backend`.

(3) Run `npm install --save concurrently`.

(4) Continue run `npm run install-all` -> `npm run start-all`.

(I have written more code in "backend/package.json", so only run terminal at backend, frontend side will be run at the same time.)
