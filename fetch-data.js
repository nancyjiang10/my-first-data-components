// Node's built-in file system and path modules — lets us write files to disk
import fs from "fs";
import path from "node:path";

// The NYC Open Data API endpoint for restaurant inspections
const apiUrl = "https://data.cityofnewyork.us/resource/43nn-pn8j.json";

// Query parameters sent to the API using the Socrata Query Language (SoQL)
const params = new URLSearchParams({
  $limit: 50000, // max number of rows to return
  $where: "grade IN('A', 'B', 'C') AND inspection_date >= '2025-01-01'", // only graded inspections from 2025 onward
  $select: "camis,dba,boro,cuisine_description,inspection_date,grade,score", // only fetch the columns we need
  $order: "camis ASC, inspection_date DESC", // sort by restaurant ID, newest inspection first
});

// Combine the base URL and query string into one complete request URL
const url = `${apiUrl}?${params.toString()}`;

console.log(`Fetching data from NYC Open Data...`);

// Ensure the data directory exists so we can write the output file without a separate mkdir command
const dataDir = path.join("src", "lib", "data");
fs.mkdirSync(dataDir, { recursive: true });

// fetch() makes an HTTP GET request to the API and returns a Promise
fetch(url)
  // Parse the response body as JSON — also returns a Promise
  .then((response) => response.json())
  .then((data) => {
    console.log(`Fetched ${data.length} records from the API.`);

    // A Set lets us track which restaurant IDs (camis) we've already seen,
    // so we can keep only the most recent inspection per restaurant
    const seen = new Set();
    const restaurants = data.filter((r) => {
      // If we've seen this camis before, skip it
      if (seen.has(r.camis)) return false;
      // Otherwise, mark it as seen and keep it
      seen.add(r.camis);
      return true;
    });

    // Sort by inspection_date descending so the newest inspections appear first
    restaurants.sort(
      (a, b) => new Date(b.inspection_date) - new Date(a.inspection_date),
    );

    console.log(`Filtered to ${restaurants.length} unique restaurants.`);

    // Write the cleaned data to a JSON file so our app can use it
    // JSON.stringify with null, 2 formats the output with 2-space indentation
    const outputPath = path.join(dataDir, "restaurants.json");
    fs.writeFileSync(outputPath, JSON.stringify(restaurants, null, 2));
    console.log("Saved to src/lib/data/restaurants.json");
  })
  // If anything goes wrong (network error, bad JSON, etc.), log it
  .catch((error) => {
    console.error("Error fetching data:", error);
  });