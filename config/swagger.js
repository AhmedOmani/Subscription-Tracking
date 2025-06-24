import {PORT} from "./env.js";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Subscription Tracker API",
            version: "1.0.0",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`
            }
        ]
    },
    apis: ["./routes/*.js"],
}

const swaggerSpec = swaggerJSDoc(options);
export default {swaggerSpec , swaggerUi};