import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    setupNodeEvents(on, config) {},
    supportFile: 'cypress/support/e2e.ts',
  },
});
