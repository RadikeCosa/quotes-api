# Quotes API 🚀

A simple API for retrieving quotes.

## Description

This project provides an API built with TypeScript for accessing a collection of quotes.

## ✨ Features

- **Retrieve Quotes:** Get random quotes or quotes by specific criteria.
- **TypeScript:** Built with TypeScript for type safety and maintainability.
- **Vercel Deployment:** Hosted on Vercel for easy deployment and scalability.

## 🛠️ Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Steps

1.  Clone the repository:

    ```bash
    git clone https://github.com/RadikeCosa/quotes-api.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd quotes-api
    ```

3.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

4.  Create a `.env` file in the root directory and configure the environment variables.

    ```
    MONGODB_URI=<your_mongodb_uri>
    ```

5.  Build the project:

    ```bash
    npm run build
    # or
    yarn build
    ```

6.  Start the server:

    ```bash
    npm start
    # or
    yarn start
    ```

## 📜 API Documentation

The API documentation is available through Swagger UI. After starting the server, you can access it at:

[https://quotes-api-hvf9.onrender.com/api-docs/](https://quotes-api-hvf9.onrender.com/api-docs/)

### Endpoints

- `GET /quotes`: Retrieves a list of quotes.
- `GET /quotes/{id}`: Retrieves a specific quote by ID.
- `POST /quotes`: Creates a new quote.
- `PUT /quotes/{id}`: Updates an existing quote.
- `DELETE /quotes/{id}`: Deletes a quote.

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Submit a pull request.

## 🧑‍💻 Contributors

- RamiroCosa

## 🔗 Links

- **Homepage:** [https://quotes-api-hvf9.onrender.com/api-docs/](https://quotes-api-hvf9.onrender.com/api-docs/)
