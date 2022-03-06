/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: "/",
    src: "/dist",
  },
  plugins: ["@snowpack/plugin-react-refresh"],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  env: {
    API_URL: "http://localhost:3000/",
  },
  alias: {
    components: "./src/components",
    lib: "./src/lib",
    hooks: "./src/hooks"
  }
};
