
import * as z from "zod";

const required = (msg = "Required id") => z.string().min(1, { message: msg });

const baseSchema = {
  id:required(),
  fee_name: required(),
  fee_description:required(),
  fee_rate:required(),
  fee_amount:required(),

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
