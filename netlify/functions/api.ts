import serverless from "serverless-http";
import { app } from "../../server";

// Export Netlify serverless handler wrapping Express backend
export const handler = serverless(app);
