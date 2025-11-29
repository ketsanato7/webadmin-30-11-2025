import * as z from "zod";


  const baseSchema = {
    id: z.string(),
    borrower_id: z.string() .min(1, { message: "Required passport_no" }),
    loan_id: z.string() .min(1, { message: "Required married_couple_id" }),
status: z.string() .min(1, { message: "Required married_couple_id" }),

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
