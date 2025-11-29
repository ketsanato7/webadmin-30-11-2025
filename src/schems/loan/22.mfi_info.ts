import * as z from "zod";

const schema = z.object({
  id: z.string().min(1, { message: "Required id" }),
  approved_date: z.string().min(1, { message: "Required id" }),
  name_LA: z.string().min(1, { message: "Required id" }),
  name_EN: z.string().min(1, { message: "Required id" }),
  village_id: z.string().min(1, { message: "Required id" }),
  address: z.string().min(1, { message: "Required id" }),
  house_unit: z.string().min(1, { message: "Required id" }),
  enterprise_id: z.string().min(1, { message: "Required id" }),
  house_no: z.string().min(1, { message: "Required id" }),
  license_no: z.string().min(1, { message: "Required id" }),
  branches: z.string().min(1, { message: "Required id" }),
  service_units: z.string().min(1, { message: "Required id" }),
  employees: z.string().min(1, { message: "Required id" }),
  employees_female: z.string().min(1, { message: "Required id" }),
  employees_HQ: z.string().min(1, { message: "Required id" }),
  employees_female_HQ: z.string().min(1, { message: "Required id" }),
  tel: z.string().min(1, { message: "Required id" }),
  mobile: z.string().min(1, { message: "Required id" }),

  fax: z.string().min(1, { message: "Required id" }),
  email: z
    .string().min(1, { message: "Required id" }),
  whatsapp: z.string().min(1, { message: "Required id" }),
  website: z.string().min(1, { message: "Required id" }),
  other_infos: z.string().min(1, { message: "Required id" }),
  latitude: z.string().min(1, { message: "Required id" }),
  longitude: z.string().min(1, { message: "Required id" }),
  status: z.string().min(1, { message: "Required id" }),
});
type schema = z.infer<typeof schema>;
export { schema };

