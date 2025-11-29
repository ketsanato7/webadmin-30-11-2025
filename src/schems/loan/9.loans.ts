import * as z from "zod";

// ຟັງຊັນສ້າງຂໍ້ຄວາມຜິດພາດມາມ່ວນໆ
const required = (msg: string) => z.string().min(1, { message: msg });
const optionalString = (msg: string) =>
 z.string({ error: (issue) => issue.input === undefined ? "ຕ້ອງລະບຸ" : msg })
// 🔹 ສ້າງສະເຄມາຫຼັກ
const baseSchema1 = {
  borrower_id: required("ຕ້ອງລະບຸລະຫັດຜູ້ກູ້"),
  personal_info_id: required("ຕ້ອງລະບຸລະຫັດຂໍ້ມູນສ່ວນບຸກຄົນ"),
  firstname_LA: required("ຕ້ອງລະບຸຊື່"),
  lastname_LA: required("ຕ້ອງລະບຸນາມສະກຸນ"),
  id: required("ຕ້ອງລະບຸເລກບັດປະຈຳຕົວ"),
  loan_account_number: required("ຕ້ອງລະບຸເລກບັນຊີເງິນກູ້"),
  customer_type_id: optionalString("ຕ້ອງເລືອກປະເພດລູກຄ້າ"),
  loan_term_id: optionalString("ຕ້ອງເລືອກໄລຍະເວລາກູ້"),
    category_id: required("ຕ້ອງລະບຸຈຸດປະສົງການນຳໃຊ້ເງິນກູ້"),

  from_date: optionalString("ຕ້ອງລະບຸວັນເລີ່ມສັນຍາ"),
  to_date: optionalString("ຕ້ອງລະບຸວັນສິ້ນສຸດສັນຍາ"),
  use_of_loan: required("ຕ້ອງລະບຸຈຸດປະສົງການນຳໃຊ້ເງິນກູ້"),
  approved_balance: required("ຕ້ອງລະບຸວົງເງິນອະນຸມັດ"),
  remaining_balance: required("ຕ້ອງລະບຸເງິນຄົງເຫຼືອ"),
  allowance_losses: required("ຕ້ອງລະບຸການສຳຮອງຂາດທຶນ"),
  interest_rate: required("ຕ້ອງລະບຸອັດຕາດອກເບ້ຍ"),
  classification_id: required("ຕ້ອງລະບຸການຈັດປະເພດຫນີ້"),
  classification_date: required("ຕ້ອງລະບຸວັນທີຈັດປະເພດ"),
  borrower_type_id: optionalString("ຕ້ອງເລືອກປະເພດຜູ້ກູ້"),
  economic_sector_id: optionalString("ຕ້ອງເລືອກພາກເສດຖະກິດ"),
  economic_branch_id: optionalString("ຕ້ອງເລືອກສາຂາເສດຖະກິດ"),
  borrower_connection_id: optionalString("ຕ້ອງເລືອກຄວາມສຳພັນຜູ້ກູ້"),
  funding_source_id: optionalString("ຕ້ອງເລືອກແຫຼ່ງທຶນ"),
  funding_org: required("ຕ້ອງລະບຸຊື່ອົງການທຶນ"),
  loan_purpose_id: optionalString("ຕ້ອງເລືອກຈຸດປະສົງການກູ້"),
  loan_type_id: optionalString("ຕ້ອງເລືອກປະເພດເງິນກູ້"),
  currency_id: optionalString("ຕ້ອງເລືອກສະກຸນເງິນ"),
  number_of_days_past_due: required("ຕ້ອງລະບຸຈຳນວນມື້ຄ້າງຊຳລະ"),
  loan_term: required("ຕ້ອງລະບຸໄລຍະເວລາກູ້"),
  installment: required("ຕ້ອງລະບຸຈຳນວນງວດຜ່ອນ"),
  service_fee_rate: required("ຕ້ອງລະບຸລະຫັດຜູ້ກູ້"),
  insuranceRate: required("ຕ້ອງລະບຸລະຫັດຜູ້ກູ້"),
  taxRate: required("ຕ້ອງລະບຸລະຫັດຜູ້ກູ້"),
  insurance_fee: required("ຕ້ອງລະບຸລະຫັດຜູ້ກູ້"),
  insurance_type_id: optionalString("ຕ້ອງລະບຸລະຫັດຜູ້ກູ້"),
  interest_type_id: optionalString("ຕ້ອງລະບຸລະຫັດຜູ້ກູ້"),
payment: z.boolean(),
  // เพิ่ม field ที่ superRefine ต้องใช้
  Account_name_for_loan_transfer: required("ຕ້ອງລະບຸຈຳນວນງວດຜ່ອນ")
,  Account_no_for_loan_transfer:required("ຕ້ອງລະບຸຈຳນວນງວດຜ່ອນ"),
  transaction_type_id: optionalString("ຕ້ອງລະບຸລະຫັດຜູ້ກູ້"),


};


const schema = z.object(baseSchema1).refine((data, ctx) => {
  if (data.payment === true) {
    if (!data.Account_name_for_loan_transfer) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "ຕ້ອງລະບຸຊື່ບັນຊີເມື່ອ payment = true",
        path: ["Account_name_for_loan_transfer"],
      });
    }

    if (!data.Account__for_loan_transfer) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "ຕ້ອງລະບຸເລກບັນຊີເມື່ອ payment = true",
        path: ["Account__for_loan_transfer"],
      });
    }
  }
});
// 🔹 Schema Update

const schema_update = schema.safeExtend({
  _id: z.string().min(1, { message: "ລະຫັດປະເທດ" }),
});

const schema_delete = z.object({
  _id: z.string().min(1, { message: "ລະຫັດປະເທດ" }),
});

type schema = z.infer<typeof schema>;
type schema_update = z.infer<typeof schema_update>;
type schema_delete = z.infer<typeof schema_delete>;

export { schema, schema_update, schema_delete };
