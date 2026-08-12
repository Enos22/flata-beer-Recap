````markdown
# FlataBeer 🍺

FlataBeer is a playful **Vite + React CRUD application** for viewing, creating, editing, deleting, and reviewing beers.

The frontend is built with **React** and **React Router**, while `json-server` provides a lightweight REST API using a local `db.json` file.

---

## 📌 Project Objectives

By completing this project, you should be able to demonstrate the following concepts:

- Build a React application using **Vite**
- Create reusable React components
- Manage application state using React Hooks
- Use `useState` to manage local state
- Use `useEffect` to perform side effects
- Fetch data from an API
- Perform all four CRUD operations:
  - **Create**
  - **Read**
  - **Update**
  - **Delete**
- Handle asynchronous API requests using `fetch`
- Create and submit controlled forms
- Dynamically display API data
- Update the UI after API changes
- Use **React Router** for client-side routing
- Use dynamic route parameters
- Implement nested routes
- Persist data using `json-server`
- Search and filter beers
- Handle loading, empty, and error states
- Build a responsive and user-friendly interface

---

# 🚀 Core Functional Requirements

## 1. View All Beers

When the application loads, users should be able to see a navigation menu containing all beers stored in the API.

The application retrieves beers using:

```http
GET /beers
```

Example response:

```json
[
  {
    "id": "1",
    "name": "Oh So Flattening",
    "description": "A light, crisp and bitter IPA.",
    "image_url": "https://example.com/beer.jpg",
    "reviews": [
      "It's flat! Just the way I like it!!"
    ]
  }
]
```

---

## 2. View a Single Beer

Users can click a beer from the beer list and view its full details.

Beer details should include:

- Beer name
- Beer image
- Description
- Reviews
- Edit button
- Delete button

Request:

```http
GET /beers/:id
```

Example:

```http
GET /beers/1
```

Expected response:

```json
{
  "id": "1",
  "name": "Oh So Flattening",
  "description": "A light, crisp and bitter IPA brewed with English and American hops.",
  "image_url": "https://i.ibb.co/wQ4G0w1/flatiron-brew.png",
  "reviews": [
    "It's flat! Just the way I like it!!",
    "Is this the real beer, is this just fantasy?"
  ]
}
```

---

# 🔄 CRUD Requirements

The application must implement all four CRUD operations against the `/beers` resource.

---

## 🟢 CREATE — Add a Beer

Users should be able to create a new beer using a form.

Endpoint:

```http
POST /beers
```

Expected request body:

```json
{
  "name": "Tusker Lager",
  "description": "A crisp and refreshing lager.",
  "image_url": "https://example.com/tusker.jpg",
  "reviews": []
}
```

The `reviews` property should normally start as an empty array.

Example response:

```json
{
  "id": "11",
  "name": "Tusker Lager",
  "description": "A crisp and refreshing lager.",
  "image_url": "https://example.com/tusker.jpg",
  "reviews": []
}
```

### Expected Beer JSON Format

Every beer should follow this general structure:

```json
{
  "id": "1",
  "name": "Beer Name",
  "description": "Beer description",
  "image_url": "https://example.com/image.jpg",
  "reviews": []
}
```

### Beer Properties

| Field | Type | Description |
|---|---|---|
| `id` | String / Number | Unique beer identifier |
| `name` | String | Name of the beer |
| `description` | String | Description of the beer |
| `image_url` | String | URL pointing to the beer image |
| `reviews` | Array | Array containing review strings |

---

## 🔵 READ — Retrieve Beers

### Get all beers

```http
GET /beers
```

### Get one beer

```http
GET /beers/:id
```

Example:

```http
GET /beers/3
```

The selected beer should be displayed without requiring a full browser page reload.

---

## 🟠 UPDATE — Edit a Beer

Users should be able to edit an existing beer.

Endpoint:

```http
PATCH /beers/:id
```

Example:

```http
PATCH /beers/1
```

To update only a beer's description:

```json
{
  "description": "An updated and much better beer description."
}
```

A full edit may look like:

```json
{
  "name": "Updated Beer Name",
  "description": "Updated beer description.",
  "image_url": "https://example.com/new-image.jpg"
}
```

Expected response:

```json
{
  "id": "1",
  "name": "Updated Beer Name",
  "description": "Updated beer description.",
  "image_url": "https://example.com/new-image.jpg",
  "reviews": [
    "Great beer!"
  ]
}
```

The user interface should update immediately after the server successfully saves the changes.

---

## 🔴 DELETE — Remove a Beer

Users should be able to permanently remove a beer.

Endpoint:

```http
DELETE /beers/:id
```

Example:

```http
DELETE /beers/5
```

After deleting a beer:

- The beer should disappear from the navigation
- The beer should be removed from `db.json`
- The deleted beer should no longer be accessible
- The app should redirect to another valid page or beer
- The UI should update without requiring a manual refresh

---

# ⭐ Reviews

Reviews are stored inside each beer object as an array of strings.

Example:

```json
{
  "id": "1",
  "name": "Oh So Flattening",
  "description": "A light IPA.",
  "image_url": "https://example.com/beer.jpg",
  "reviews": [
    "Great beer!",
    "Very smooth.",
    "Would definitely drink again."
  ]
}
```

---

## Add a Review

Users should be able to add a review to the currently selected beer.

Because reviews are stored inside the beer object, the application updates the beer using:

```http
PATCH /beers/:id
```

Suppose the existing reviews are:

```json
[
  "Great beer!",
  "Very smooth."
]
```

If the user adds:

```text
Would drink again!
```

The PATCH request should contain:

```json
{
  "reviews": [
    "Great beer!",
    "Very smooth.",
    "Would drink again!"
  ]
}
```

The new review should immediately appear in the UI after the request succeeds.

The review should also remain after refreshing the page.

---

## Delete a Review

Users should also be able to delete individual reviews.

Suppose the current reviews are:

```json
{
  "reviews": [
    "Great beer!",
    "Not my favourite.",
    "Very smooth."
  ]
}
```

After deleting:

```text
Not my favourite.
```

The resulting array becomes:

```json
{
  "reviews": [
    "Great beer!",
    "Very smooth."
  ]
}
```

The updated reviews are then saved using:

```http
PATCH /beers/:id
```

Request body:

```json
{
  "reviews": [
    "Great beer!",
    "Very smooth."
  ]
}
```

---

# 🌐 API Endpoints

The application uses the following REST endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/beers` | Retrieve all beers |
| `GET` | `/beers/:id` | Retrieve one beer |
| `POST` | `/beers` | Create a new beer |
| `PATCH` | `/beers/:id` | Update beer information |
| `PATCH` | `/beers/:id` | Add or remove reviews |
| `DELETE` | `/beers/:id` | Delete a beer |

The default API URL is:

```text
http://localhost:3000
```

To retrieve all beers:

```text
http://localhost:3000/beers
```

---

# 🛣️ Client-Side Routing

FlataBeer uses **React Router** for client-side navigation.

The project includes routes such as:

### Home

```text
/
```

### Create Beer

```text
/beers/new
```

### View Beer

```text
/beers/:beerId
```

Example:

```text
/beers/3
```

### Edit Beer

The edit page uses a nested route:

```text
/beers/:beerId/edit
```

Example:

```text
/beers/3/edit
```

A conceptual route structure is:

```text
/
├── beers
│   ├── new
│   └── :beerId
│       └── edit
```

React Router allows users to move between these pages without performing a full browser refresh.

---

# 🔎 Search Functionality

The beer navigation includes a search input.

Users can enter part of a beer's name to filter the displayed beers.

For example:

```text
lager
```

could return:

```text
Pilsen Lager
Tusker Lager
```

Searching happens on the frontend and does not modify `db.json`.

---

# 🎨 User Interface Features

The project includes:

- Responsive layout
- Beer-themed design
- Beer navigation/sidebar
- Search input
- Beer details page
- Beer images
- Review list
- Add-review form
- Delete-review functionality
- Create beer form
- Edit beer form
- Delete beer functionality
- Navigation between beers
- Loading states
- Error handling
- Empty states
- Client-side routing

---

# 🛠️ Project Setup

## Requirements

Before running the project, ensure that you have installed:

- Node.js
- npm

Check your installations with:

```bash
node --version
npm --version
```

---

## 1. Clone the Repository

If the project is hosted on GitHub:

```bash
git clone <repository-url>
```

Then navigate into the project:

```bash
cd flata-beer
```

If you downloaded the project as a ZIP file, extract it and open the extracted folder in your terminal.

---

## 2. Install Dependencies

Run:

```bash
npm install
```

This installs all packages listed inside `package.json`.

The project uses packages such as:

- React
- React DOM
- React Router
- Vite
- json-server
- Concurrently

---

# ▶️ Running the Application

## Run Frontend and Backend Together

The recommended command is:

```bash
npm start
```

This starts both the React frontend and the json-server backend.

The frontend runs at:

```text
http://localhost:5173
```

The API runs at:

```text
http://localhost:3000
```

Open the frontend in your browser:

```text
http://localhost:5173
```

---

# Running Frontend and Backend Separately

You can also run the servers in two terminals.

## Terminal 1 — Start json-server

```bash
npm run server
```

The API will run at:

```text
http://localhost:3000
```

Test the API by visiting:

```text
http://localhost:3000/beers
```

You should see the beers stored in `db.json`.

---

## Terminal 2 — Start Vite

```bash
npm run dev
```

The frontend should run at:

```text
http://localhost:5173
```

Open that URL in your browser.

---

# 🔐 Environment Variables

The frontend API URL can be configured using:

```text
VITE_API_URL
```

Create a `.env` file in the root of the project:

```env
VITE_API_URL=http://localhost:3000
```

Vite environment variables can be accessed using:

```js
import.meta.env.VITE_API_URL
```

If a custom URL is not provided, the project can use:

```text
http://localhost:3000
```

as the default API URL.

---

# 🗃️ Database Structure

The backend uses:

```text
db.json
```

The root object must contain a `beers` array.

Example:

```json
{
  "beers": [
    {
      "id": "1",
      "name": "Oh So Flattening",
      "description": "A light, crisp and bitter IPA.",
      "image_url": "https://example.com/beer.jpg",
      "reviews": [
        "Great beer!"
      ]
    }
  ]
}
```

---

## Important Image URL Format

Image URLs must be stored as normal strings.

### Correct

```json
{
  "image_url": "https://example.com/beer.jpg"
}
```

### Incorrect

```json
{
  "image_url": "[https://example.com/beer.jpg](https://example.com/beer.jpg)"
}
```

The second format is Markdown and should not be stored inside the JSON database.

---

# 🧪 Expected CRUD Flow

A user should be able to complete the following workflow:

1. Open FlataBeer
2. See all available beers
3. Select a beer
4. View the beer details
5. View its reviews
6. Search for a beer
7. Add a new review
8. Refresh the browser and still see the review
9. Delete a review
10. Edit the beer's details
11. Refresh the browser and still see the edited information
12. Create a new beer
13. See the new beer appear in the navigation
14. Open the newly created beer
15. Delete the beer
16. See the deleted beer removed from the interface and API

Successfully completing this flow demonstrates that the CRUD functionality is working correctly.

---

# 📋 CRUD Summary

## CREATE

```http
POST /beers
```

```json
{
  "name": "New Beer",
  "description": "New beer description",
  "image_url": "https://example.com/beer.jpg",
  "reviews": []
}
```

---

## READ

```http
GET /beers
```

```http
GET /beers/:id
```

---

## UPDATE

```http
PATCH /beers/:id
```

Example:

```json
{
  "description": "Updated description"
}
```

---

## DELETE

```http
DELETE /beers/:id
```

---

# 🧪 Testing the API Manually

You can test GET requests directly from your browser.

## Get All Beers

```text
http://localhost:3000/beers
```

## Get One Beer

```text
http://localhost:3000/beers/1
```

For `POST`, `PATCH`, and `DELETE` requests, use the React application or an API testing tool.

---

# ⚠️ Common Problems

## API Requests Are Failing

Make sure json-server is running:

```bash
npm run server
```

Then visit:

```text
http://localhost:3000/beers
```

If the API is working, you should see JSON data.

---

## Frontend Loads but No Beers Appear

Confirm that `db.json` contains a valid `beers` array:

```json
{
  "beers": []
}
```

or:

```json
{
  "beers": [
    {
      "id": "1",
      "name": "Example Beer",
      "description": "Example description.",
      "image_url": "https://example.com/image.jpg",
      "reviews": []
    }
  ]
}
```

Also ensure the frontend is requesting:

```text
http://localhost:3000
```

---

## Images Are Not Displaying

Make sure the `image_url` contains a direct image URL:

```json
{
  "image_url": "https://example.com/image.jpg"
}
```

Do not use Markdown-formatted links.

---

## Port Already in Use

The project expects these ports:

| Application | Port |
|---|---|
| Vite | `5173` |
| json-server | `3000` |

Stop any other applications using these ports before restarting the project.

---

# 💻 Technologies Used

- React
- Vite
- React Router
- JavaScript
- HTML
- CSS
- Fetch API
- JSON
- json-server
- REST API
- npm

---

# 🎯 Learning Outcomes

After completing FlataBeer, you should understand how to:

- Structure a React application
- Create reusable React components
- Pass data through props
- Manage React state
- Use React Hooks
- Use `useState`
- Use `useEffect`
- Fetch data from an API
- Render API data
- Build controlled forms
- Handle form submissions
- Perform `GET` requests
- Perform `POST` requests
- Perform `PATCH` requests
- Perform `DELETE` requests
- Synchronize frontend state with backend data
- Work with nested data such as review arrays
- Implement client-side routing
- Work with dynamic route parameters
- Implement nested routes
- Build searchable interfaces
- Handle loading and error states
- Build a complete React CRUD application

---

# ✅ Final Project Requirements

A completed FlataBeer application should support:

- ✅ Create new beers
- ✅ View all beers
- ✅ View individual beer details
- ✅ Edit existing beers
- ✅ Delete beers
- ✅ Add reviews
- ✅ Delete reviews
- ✅ Persist reviews to `db.json`
- ✅ Persist beer changes to `db.json`
- ✅ Search beers
- ✅ React Router navigation
- ✅ Dynamic beer routes
- ✅ Nested edit routes
- ✅ Responsive user interface
- ✅ Loading states
- ✅ Error handling
- ✅ Vite development environment
- ✅ Local REST API using json-server

---

# 🍻 FlataBeer

Browse beers, review them, edit them, add your own, and remove the ones that probably should never have been brewed.

Happy coding! 🚀
````
