export const developerData = new Map<string, { text: string; score: number }>([
  [
    "form/client/simple",
    {
      text: "Creating this component was relatively simple. As this is a client component I can simply use the 'useState' hook to store form variables and then make use of a supabase query to send the data to the backend. Sender user notifications with sonners and toasts is also easy in this component.",
      score: 10,
    },
  ],
  [
    "form/client/average",
    {
      text: "Similarly to the simple form, this component was relatively easy to create. I created more fields using similar logic to the simple form. I also added an image upload to increase complexity, to do this I again used the 'useState' hook to store a preview image as well as file data.",
      score: 10,
    },
  ],
  [
    "form/client/complex",
    {
      text: "Creating forms on the client was releatively simple. This component includes 3 file uploads, to implement the minimum file upload size I added a check to make sure the files added very of the correct size and rejected the files if they did not meet this minimum capacity. I used 3 different hooks to store the data for each file.",
      score: 10,
    },
  ],
  [
    "form/server/simple",
    {
      text: "Creating this server-side form was straightforward. I used Express.js to handle the form submission and used middleware to parse the form data. The data was then sent to the database using a simple SQL query.",
      score: 10,
    },
  ],
  [
    "form/server/average",
    {
      text: "This server-side form was a bit more complex. In addition to handling form data, I also had to handle file uploads. I used the multer library to handle the file uploads and stored the files in a temporary directory before moving them to their final location.",
      score: 10,
    },
  ],
  [
    "form/server/complex",
    {
      text: "This was the most complex server-side form. It involved handling multiple file uploads, validating the data, and sending multiple queries to the database. Despite the complexity, using middleware and modularizing the code made it manageable.",
      score: 10,
    },
  ],
  [
    "charts/client/simple",
    {
      text: "Creating this simple client-side chart was straightforward. I used a library like Chart.js to create a basic bar chart with static data.",
      score: 10,
    },
  ],
  [
    "charts/client/average",
    {
      text: "This client-side chart was a bit more complex. I added interactivity, such as tooltips and zooming, and used the 'useState' and 'useEffect' hooks to fetch and update the data dynamically.",
      score: 10,
    },
  ],
  [
    "charts/client/complex",
    {
      text: "This complex client-side chart involved multiple data series, custom styling, and dynamic data updates. Despite the complexity, using a charting library and React hooks made it manageable.",
      score: 10,
    },
  ],
  [
    "charts/server/simple",
    {
      text: "Creating this simple server-side chart involved generating an image on the server using a library like Chart.js Node. The image was then sent to the client for display.",
      score: 10,
    },
  ],
  [
    "charts/server/average",
    {
      text: "This server-side chart was a bit more complex. In addition to generating the chart image, I also had to fetch and process data from a database.",
      score: 10,
    },
  ],
  [
    "charts/server/complex",
    {
      text: "This complex server-side chart involved multiple data series, custom styling, and dynamic data updates. Despite the complexity, using a charting library and modularizing the code made it manageable.",
      score: 10,
    },
  ],
  [
    "data/client/simple",
    {
      text: "Displaying this simple data set on the client was straightforward. I used the 'useState' hook to store the data and a simple component to display it.",
      score: 10,
    },
  ],
  [
    "data/client/average",
    {
      text: "This client-side data display was a bit more complex. I added sorting and filtering functionality, and used the 'useState' and 'useEffect' hooks to fetch and update the data dynamically.",
      score: 10,
    },
  ],
  [
    "data/client/complex",
    {
      text: "This complex client-side data display involved multiple data sets, custom styling, and dynamic data updates. Despite the complexity, using React hooks made it manageable.",
      score: 10,
    },
  ],
  [
    "data/server/simple",
    {
      text: "Creating this simple server-side data display involved fetching the data from a database and sending it to the client for display.",
      score: 10,
    },
  ],
  [
    "data/server/average",
    {
      text: "This server-side data display was a bit more complex. In addition to fetching the data, I also had to process it on the server to add sorting and filtering functionality.",
      score: 10,
    },
  ],
  [
    "data/server/complex",
    {
      text: "This complex server-side data display involved multiple data sets, custom processing, and dynamic data updates. Despite the complexity, using middleware and modularizing the code made it manageable.",
      score: 10,
    },
  ],
]);
