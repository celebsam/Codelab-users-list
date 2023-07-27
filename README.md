# Users List App

The User List app is a simple React application that fetches users' data from
the [RandomUser.me](https://randomuser.me) API and allows users to filter the
data based on age range, nationality, gender, and name search. The app uses
Tailwind CSS for styling and provides a simple and intuitive user interface to interact with the data.

## Features

- Fetches users' data from [RandomUser.me](https://randomuser.me) API.
- Filter users by age range, nationality, gender, and name.
- Responsive layout with automatic column adjustment for different screen sizes.
- Simple and intuitive user interface.

## Technologies Used

- React: A popular JavaScript library for building user interfaces.
- Axios: A Promise-based HTTP client for making API requests.
- Tailwind CSS: A utility-first CSS framework for quickly styling the application.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/celebsam/user-list-app.git
cd user-list-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The app should now be running on `http://localhost:3000`, and you can access it in your web browser.

## Usage

1. Upon loading the app, the list of users will be displayed on the screen.

2. You can use the filter options to narrow down the user list:

   - **Age Range:** Select age range to filter users by age.
   - **Nationality:** Select a specific nationality to filter users belonging to that nationality.
   - **Gender:** Select "Male" or "Female" to filter users of that gender.
   - **Search by Name:** Enter a name to search for users whose first or last name matches the search term.

3. As you apply the filters or change the search term, the user list will update in real-time, showing the matching users.

## Contributing

Contributions to the User List app are welcome! If you have any bug fixes, improvements, or new features to add, please follow these steps:

1. Fork the repository.

2. Create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes and commit them:

```bash
git commit -m "Add your commit message here"
```

4. Push the changes to your forked repository:

```bash
git push origin feature/your-feature-name
```

5. Create a pull request on the original repository.


## Acknowledgments

- Thanks to the [RandomUser.me](https://randomuser.me) API for providing random user data.
- The app was created as part of a learning exercise to demonstrate the use of React and Tailwind CSS in building a simple user interface.

