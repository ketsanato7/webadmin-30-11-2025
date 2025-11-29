import * as z from "zod";

const baseSchema = {
  id: z.string(),
  card_no: z.string().min(1, { message: "Required card_name" }),
  card_name: z.string().min(1, { message: "Required married_couple_id" }),
  date_of_issue: z.string().min(1, { message: "Required married_couple_id" }),
  exp_date: z.string().min(1, { message: "Required married_couple_id" }),
  status: z.string(),
   personal_info_id: z.string().min(1, { message: "Required " }),

};

const schema = z.object(baseSchema);

const schema_update = schema.extend({
  _id: z.string().min(1, { message: "ລະຫັດຂໍ້ມູນ" }),
});

const schema_delete = z.object({
  _id: z.string().min(1, { message: "ລະຫັດຂໍ້ມູນ" }),
}); 

type schema = z.infer<typeof schema>;
type schema_update = z.infer<typeof schema_update>;
type schema_delete = z.infer<typeof schema_delete>;

export { schema, schema_update, schema_delete };
