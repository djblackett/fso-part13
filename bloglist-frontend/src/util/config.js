

const url = process.env.REACT_APP_BACKEND_URL || "";
const env = process.env.REACT_APP_ENV;
let baseUrl;
console.log(url);
console.log(env);

if (env === "development") {
  baseUrl = `${url}`;
} else {
  baseUrl = "/api";
}

console.log(baseUrl);

export { baseUrl };