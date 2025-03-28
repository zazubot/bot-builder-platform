import { writeFileSync } from "fs";
import { generateOpenApiDocument } from "@typebot.io/trpc-openapi/generator";
import { publicRouter } from "./routers/publicRouter";

const openApiDocument = generateOpenApiDocument(publicRouter, {
  title: "Builder API",
  version: "1.0.0",
  baseUrl: "https://app.zazubot.com/api",
  docsUrl: "https://docs.zazubot.com/api-reference",
});

writeFileSync(
  "./openapi/builder.json",
  JSON.stringify(openApiDocument, null, 2),
);

process.exit();
