import { type SchemaTypeDefinition } from "sanity";
import { projectType } from "./projectType";
import { homepageType } from "./homepageType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, homepageType],
};
