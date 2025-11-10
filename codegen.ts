import "dotenv/config";
import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  // This assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ["src/**/*.{ts,tsx}"],
  // Don't exit with non-zero status when there are no documents
  ignoreNoDocuments: true,
  generates: {
    // Use a path that works the best for the structure of your application
    "./src/types/__generated__/graphql.ts": {
      schema: [
        {
          ["http://localhost:4000/graphql"]: {
            headers: {
              client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
            },
          },
        },
      ],
      plugins: ["typescript", "typescript-operations"],
      config: {
        avoidOptionals: {
          // Use `null` for nullable fields instead of optionals
          field: true,
          // Allow nullable input fields to remain unspecified
          inputValue: false,
        },
        defaultScalarType: "any",
        // Apollo Client always includes `__typename` fields
        nonOptionalTypename: true,
        // Apollo Client doesn't add the `__typename` field to root types so
        // don't generate a type for the `__typename` for root operation types.
        skipTypeNameForRoot: true,
      },
    },
    "./src/__generated__/local-resolvers.ts": {
      schema: ["./src/local-schema.graphql"],
      plugins: ["typescript", "@apollo/client-graphql-codegen/local-state"],
      config: {
        // Ensures you return a `__typename` for any `@client` fields that
        // return object or array types
        nonOptionalTypename: true,
        // Required if your local schema extends existing schema types
        baseTypesPath: "./src/__generated__/graphql",
        // If you provide a `context` function to customize the context value,
        // provide the path or type here
        contextType: "./src/context#MyContextType",
      },
    },
  },
};

export default config;
