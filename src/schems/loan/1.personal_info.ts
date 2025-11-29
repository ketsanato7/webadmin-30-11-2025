
import * as z from "zod";


// ຟັງຊັນສ້າງຂໍ້ຄວາມຜິດພາດມາມ່ວນໆ
const required = (msg: string) => z.string().min(1, { message: msg });
const optionalString = (msg: string) =>
 z.string({ error: (issue) => issue.input === undefined ? "ຕ້ອງລະບຸ" : msg })

const baseSchema2 = {
  borrower_id: required("ກະລຸນາປ່ອນລະຫັດຜູ້ກູ້"),
  personal_info_id: required("ກະລຸນາເລືອກລະຫັດບຸກຄົນ"),
  firstname_LA: required("ກະລຸນາປ້ອນຊື່ພາສາລາວ"),
  lastname_LA: required("ກະລຸນາປ້ອນນາມສະກຸນພາສາລາວ"),
  firstname_EN: required("ກະລຸນາປ້ອນຊື່ພາສາອັງກິດ"),
  lastname_EN: required("ກະລຸນາປ້ອນນາມສະກຸນພາສາອັງກິດ"),
  dateofbirth: required("ກະລຸນາເລືອກວັນເກີດ"),
  gender_id: optionalString("ກະລຸນາເລືອກເພດ"),
  nationality_id: optionalString("ກະລຸນາເລືອກສັນຊາດ"),
  marital_status_id: optionalString("ກະລຸນາເລືອກສະຖານະການແຕ່ງງານ"),
  career_id: optionalString("ກະລຸນາເລືອກອາຊີບ"),
  village_id: optionalString("ກະລຸນາເລືອກບ້ານທີ່ຢູ່"),
  home_address: required("ກະລຸນາປ້ອນທີ່ຢູ່ອາໄສ"),
  contact_info: required("ກະລຸນາປ້ອນຂໍ້ມູນຕິດຕໍ່"),
  mobile_no: required("ກະລຸນາປ້ອນເບີໂທມືຖື"),
  telephone_no: required("ກະລຸນາປ້ອນເບີໂທລະສັບ"),
country_id:optionalString("ກະລຸນາເລືອກປະເທດ"),
  // ຂໍ້ມູນເອກະສານຕ່າງໆ (optional)
  card_id: z.string().optional(),
  card_no: z.string().optional(),
  card_name: z.string().optional(),
  card_date_of_issue: z.string().optional(),
  card_exp_date: z.string().optional(),

  spouse_id: z.string().optional(),
  spouse_name_1st_EN: z.string().optional(),
  spouse_surname_EN: z.string().optional(),
  spouse_name_LA: z.string().optional(),
  spouse_surname_LA: z.string().optional(),
  spouse_mobile_no: z.string().optional(),

  book_id: z.string().optional(),
  book_no: z.string().optional(),
  book_name: z.string().optional(),
  book_date_of_issue: z.string().optional(),
  book_village_id: z.string().nullish(),

  passport_id: z.string().optional(),
  passport_no: z.string().optional(),
  passport_name: z.string().optional(),
  passport_exp_date: z.string().optional(),
};


const schema = z.object(baseSchema2)

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
