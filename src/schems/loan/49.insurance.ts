
import * as z from "zod";

const required = (msg = "Required id") => z.string().min(1, { message: msg });

const baseSchema = {
  id:required(),
  insurance_name: required(),
  insurance_rate:required(),
  insurance_fee:required(),
  approved_balance_min:required(),
  approved_balance_max:required(),
  insurance_detail:required(),
  period:required(),
  tax:required(),
insurance_type_id:required()
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
