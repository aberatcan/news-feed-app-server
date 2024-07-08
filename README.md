A web application that provides users with personalized news feed. Built with Node.js and React, it allows users to register, log in, and customize their news feed preferences.

## Features

- User registration and authentication
- Search for articles by keywords, date, category, and source
- Customize news feed by selecting preferred sources, categories, and authors

## Technologies Used

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, Axios, React Router
- Authentication: JWT (JSON Web Tokens)
- APIs: NewsAPI, The Guardian, New York Times, BBC News

## Installation

### Prerequisites

- Node.js
- MongoDB
- 
### Backend Setup

1. Navigate to `new-feed-app-server` directory:
   ```bash
   cd news-feed-app-server
   
2. Install dependency:
    ```bash
   npm install
   
3. Create a `.env` file and add the following environment variables:
    ```bash
   PORT=5001 
   MONGO_URI=your_mongo_connection_string
   NEWS_API_KEY=your_newsapi_key

4. Start the backend server
    ```bash
   node index.js

### Frontend Setup

1. Navigate to `news-feed-app-client` directory:
   ```bash
   cd news-feed-app-client

2. Install dependency:
    ```bash
   npm install

3. Start the frontend application
    ```bash
   npm start

### Usage
1. Open your browser and navigate to http://localhost:3000.
2. Register a new account or log in with an existing account.
3. Customize your news feed preferences by selecting preferred sources, categories, and authors.
4. Use the search functionality to find articles based on keywords, date, category, and source.

### License
This project is licensed under the MIT License.