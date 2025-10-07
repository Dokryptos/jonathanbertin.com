import { type SchemaTypeDefinition } from "sanity";
import { commissionedType } from "./commissionedType";
import { newsType } from "./newsType";
import { personalType } from "./personnalType";
import { homepageType } from "./homepageType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [personalType, homepageType, commissionedType, newsType],
};
