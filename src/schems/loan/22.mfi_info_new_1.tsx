import { z } from "zod";

const fields = [
  "id",
  "approved_date",
  "name_LA",
  "name_EN",
  "address",
  "house_unit",
  "house_no",
  "branches",
  "service_units",
  "employees",
  "employees_female",
  "employees_HQ",
  "employees_female_HQ",
  "tel",
  "mobile",
  "fax",
  "email",
  "whatsapp",
  "website",
  "other_infos",
  "latitude",
  "longitude",
] as const;

// ສ້າງ schema base ທີ່ມີ field ທັງໝົດແບບ optional
let schemaShape = fields.reduce(
  (acc, key) => ({ ...acc, [key]: z.string().optional() }),
  {} as Record<(typeof fields)[number], any>
);

// override validation ສຳລັບ field ທີ່ຈຳເປັນ
schemaShape.id = z.string().nonempty("ID is required");
schemaShape.email = z.string().email("Invalid email").optional();
schemaShape.website = z.string().url("Invalid URL").optional();

export const schema = z.object(schemaShape);

export type MFIInfo = z.infer<typeof schema>;

// ສ້າງ defaultValues ອັດຕະໂນມັດ
export const formDefaultValues = fields.reduce(
  (acc, key) => ({ ...acc, [key]: "" }),
  {} as Record<(typeof fields)[number], string>
) as MFIInfo;
