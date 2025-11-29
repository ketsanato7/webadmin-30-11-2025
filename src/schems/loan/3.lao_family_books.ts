import * as z from "zod";

  const baseSchema = {
    id: z.string(),
    book_no: z.string() .min(1, { message: "Required married_couple_id" }),
    book_name: z.string() .min(1, { message: "Required married_couple_id" }),
date_of_issue: z.string() .min(1, { message: "Required married_couple_id" }),
village_id: z.string() .min(1, { message: "Required married_couple_id" }),
personal_info_id: z.string() .min(1, { message: "Required " }),

status:  z.string(),
  };

const schema = z.object(baseSchema);

const schema_update = schema.extend({
  _id: z.string().min(1, { message: "ລະຫັດປະເທດ" }),
});

const schema_delete = z.object({
  _id: z.string().min(1, { message: "ລະຫັດປະເທດ" }),
});

type schema = z.infer<typeof schema>;
type schema_update = z.infer<typeof schema_update>;
type schema_delete = z.infer<typeof schema_delete>;

export { schema, schema_update, schema_delete };
