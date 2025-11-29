import { z } from "zod";

  const schema = z.object({
    _id: z.string(),
        id: z.string(),
    account_no: z.string(),
    account_name: z.string(),
    accounting_type_id: z.string(),
    accounting_group_id: z.string(),
    accounting_level_id: z.string(),
    status: z.string(),


  });
export default schema