# HexOcean Cookbook

The HexOcean Cookbook is a web application that allows users to submit information about dishes they want to add to the cookbook. The application is built using React and uses the useState hook for managing form state. It also utilizes the Moment.js library for handling and formatting time data.

## Features

- Users can enter the name of the dish, preparation time, and select the type of dish from a dropdown menu.
- The form dynamically updates based on the selected dish type. Additional fields are displayed for specific types of dishes, such as the number of slices and diameter for pizzas, spiciness scale for soups, and number of slices of bread for sandwiches.
- Form validation is performed to ensure that all required fields are filled in based on the selected dish type.
- When the form is submitted, the data is sent as a JSON object to an API endpoint (`https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/`) using a POST request. The response from the API is logged to the console.
- If the submission is successful, a success message is displayed and the form is reset. Otherwise, an error message is displayed.
- Users have the option to add more dishes after a successful submission by clicking the "Add more!" button, which refreshes the page.

## Usage

To use the HexOcean Cookbook, follow these steps:

1. Clone the repository and navigate to the project directory.
2. Install the necessary dependencies by running `npm install`.
3. Start the development server with `npm start`.
4. Access the application in your web browser at `http://localhost:3000`.
5. Fill in the form with the appropriate details for the dish you want to add.
6. Click the "Submit" button to submit the form.
7. If the submission is successful, a success message will be displayed, and you can choose to add more dishes or refresh the page.
8. If there are any errors or the submission fails, an error message will be displayed.

Please note that this code relies on an API endpoint (`https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/`) for submitting the form data. Ensure that the API endpoint is accessible and properly configured before using this code.