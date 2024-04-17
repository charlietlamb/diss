export const developerData = new Map<string, { text: string; score: number }>([
  [
    "form/client/simple",
    {
      text: "Creating this component was relatively simple. As this is a client component I used React and the 'useState' hook to store form variables. I then used Supabase to send the data to the backend which is a Postgres database managed by Supabase. Sending user notifications with banners and toasts is also easy in this component.",
      score: 10,
    },
  ],
  [
    "form/client/average",
    {
      text: "Similarly to the simple form, this component was relatively easy to create using React. I created more fields using similar logic to the simple form. I also added an image upload to increase complexity, to do this I again used the 'useState' hook to store a preview image as well as file data.",
      score: 10,
    },
  ],
  [
    "form/client/complex",
    {
      text: "Creating forms on the client was relatively simple using React. This component includes 3 file uploads, to implement the minimum file upload size I added a check to make sure the files added were of the correct size and rejected the files if they did not meet this minimum capacity. I used 3 different hooks to store the data for each file.",
      score: 10,
    },
  ],
  [
    "form/server/simple",
    {
      text: "Creating this server-side form was straightforward. I used Next.js API routes to handle the form submission and used middleware to parse the form data. The data was then sent to the Postgres database using a simple Supabase query.",
      score: 10,
    },
  ],
  [
    "form/server/average",
    {
      text: "This server-side form was a bit more complex. In addition to handling form data, I also had to handle file uploads. I stored the files in a temporary directory before moving them to their final location. The form data and file paths were then sent to the Postgres database using Supabase.",
      score: 10,
    },
  ],
  [
    "form/server/complex",
    {
      text: "This was the most complex server-side form. It involved handling multiple file uploads, validating the data, and sending multiple queries to the Postgres database using Supabase. Despite the complexity, using middleware and modularizing the code made it manageable.",
      score: 10,
    },
  ],
  [
    "charts/client/simple",
    {
      text: "Creating this simple client-side chart was straightforward. I used Recharts with React to create a basic bar chart with data fetched from an API.",
      score: 10,
    },
  ],
  [
    "charts/client/average",
    {
      text: "This client-side chart was a bit more complex. I added interactivity, such as tooltips and zooming, and used the 'useState' and 'useEffect' hooks in React to fetch the data from an API.",
      score: 10,
    },
  ],
  [
    "charts/client/complex",
    {
      text: "This complex client-side chart was more difficult, I fetched a large dataset from an API and took the average of these values. Despite the complexity, using a charting library and React hooks made it manageable.",
      score: 10,
    },
  ],
  [
    "charts/server/simple",
    {
      text: "Creating charts of the server was much more difficult as I struggled to find a chart library that rendered on the server. Because of this I had to create my own server side chart component. The image was then sent to the client for display using Next.js API routes.",
      score: 10,
    },
  ],
  [
    "charts/server/average",
    {
      text: "This server-side chart was a bit more complex. In addition to generating the chart image, I also had to fetch more complex data from an API.",
      score: 10,
    },
  ],
  [
    "charts/server/complex",
    {
      text: "This complex server-side chart involved fetching a large dataset from an API and taking the average of these values. Despite the complexity, using my custom chart and modularizing the code made it manageable.",
      score: 10,
    },
  ],
  [
    "data/client/simple",
    {
      text: "I used dj.js to create this component, rendering a small number of nodes as it was only a simple variation. The data was fetched from an API",
      score: 10,
    },
  ],
  [
    "data/client/average",
    {
      text: "This client-side data display was a bit more complex. I added more layers, samples and bumps while decreasing the time in which the data changed. The data was fetched from an API.",
      score: 10,
    },
  ],
  [
    "data/client/complex",
    {
      text: "This complex client-side data display involved frequent data changes with dynamic data updates. Despite the complexity, using React hooks made it manageable. A large amount of data was fetched from an API, with an average taken.",
      score: 10,
    },
  ],
  [
    "data/server/simple",
    {
      text: "Creating this simple server-side data display involved fetching the data from an API and then using d3.js to render it on the screen.",
      score: 10,
    },
  ],
  [
    "data/server/average",
    {
      text: "This server-side data display was a bit more complex. In addition to fetching the data from the API, I added more layers, samples and bumps while decreasing the time in which the data changed.",
      score: 10,
    },
  ],
  [
    "data/server/complex",
    {
      text: "This complex server-side data display involved frequent data changes with dynamic data updates. Despite the complexity, using d3.js made it manageable. A large amount of data was fetched from an API, with an average taken.",
      score: 10,
    },
  ],
]);
