import dayjs from "dayjs";

/**
 * ✅ ฟังก์ชัน formatNumber – แปลงตัวเลขเป็น string ที่มี comma และทศนิยม 2 ตำแหน่ง
 */
export function Format_Number(num) {
  if (isNaN(num) || num === null || num === undefined) return "0.00";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(num));
}

/**
 * ✅ ฟังก์ชัน toNumber – แปลง string ที่มี comma ให้เป็น number
 */
export function To_Number(v) {
  if (v === undefined || v === null || v === "") return 0;
  if (typeof v === "number") return v;
  const cleaned = String(v).replace(/,/g, "");
  const num = Number(cleaned);
  return isNaN(num) ? 0 : num;
}

/**
 * ✅ ฟังก์ชันหลัก generateInstallmentSchedule
 * สร้างตารางผ่อนชำระ (installment schedule)
 */
export function Generate_Installment_Schedule({
  principal,
  rate,
  months,
  type,
  from_date,
  insuranceRate = 0,
  taxRate = 0,
  service_fee_rate = 0,
}) {
  // ตรวจสอบข้อมูลก่อน
  principal = toNumber(principal);
  rate = toNumber(rate);
  months = toNumber(months);

  if (!principal || !rate || !months) return { rows: [], summary: {} };

  const monthlyRate = rate / 100;
  let remaining = principal;
  const rows = [];
  const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

  // ✅ คำนวณค่าประกันภัยรวม
  const amountInsurance = principal * (insuranceRate / 100);
  const insuranceTax = amountInsurance * (taxRate / 100);
  const amount_pay = Math.floor(months / 12) || 1;
  const totalInsurance = (amountInsurance + insuranceTax) * amount_pay;

  // ✅ ค่าประกันภัยแต่ละงวด
  const insuranceAmountPerInstallment = (amountInsurance * amount_pay) / months;
  const insuranceTaxPerInstallment = (insuranceTax * amount_pay) / months;
  const insurancePerMonth =
    insuranceAmountPerInstallment + insuranceTaxPerInstallment;

  // ✅ ค่าบริการ
  const amountServiceFee = principal * (service_fee_rate / 100);

  // ✅ สร้าง EMI ถ้าเป็นประเภท EMI
  const emi =
    type === "68f8fae7d59e945cb67b8652"
      ? (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
      : 0;

  let totalPrincipal = 0;
  let totalInterest = 0;

  for (let i = 1; i <= months; i++) {
    const dueDate = dayjs(from_date).add(i, "month").format("YYYY-MM-DD");
    let principalPay = 0;
    let interest = 0;
    let startBalance = remaining;

    switch (type) {
      case "68f8f5c5ab85ff56b6ceca1f": // Flat
        principalPay = principal / months;
        interest = principal * monthlyRate;
        break;
      case "68f8f68411f16ffa7082e9b0": // Declining
        interest = remaining * monthlyRate;
        principalPay = principal / months;
        break;
      case "68f8fae7d59e945cb67b8652": // EMI
        interest = remaining * monthlyRate;
        principalPay = emi - interest;
        break;
      case "6905c92a6e612b1fc7a8c7d5": // Interest only
        interest = principal * monthlyRate;
        if (i === months) principalPay = principal;
        break;
      case "69050e0ae0d8cf463a6025f9": // Principal every 3 months
        interest = remaining * monthlyRate;
        if (i % 3 === 0) principalPay = (principal / months) * 3;
        break;
      case "69050e28e0d8cf463a6025fb": // Principal every 6 months
        interest = remaining * monthlyRate;
        if (i % 6 === 0) principalPay = (principal / months) * 6;
        break;
      case "6905c8db6e612b1fc7a8c7d2": // Principal every 12 months
        interest = remaining * monthlyRate;
        if (i % 12 === 0) principalPay = (principal / months) * 12;
        break;
      default:
        principalPay = principal / months;
        interest = principal * monthlyRate;
    }

    remaining -= principalPay;
    if (remaining < 0) remaining = 0;

    totalPrincipal += principalPay;
    totalInterest += interest;

    const serviceFee = i === 1 ? amountServiceFee : 0;
    const total =
      principalPay +
      interest +
      insuranceAmountPerInstallment +
      insuranceTaxPerInstallment +
      serviceFee;

    rows.push({
      id: i,
      installment: i,
      dueDate,
      start_balance: round2(startBalance),
      principal: round2(principalPay),
      interest: round2(interest),
      insuranceAmount: round2(insuranceAmountPerInstallment),
      insuranceTax: round2(insuranceTaxPerInstallment),
      insuranceTotal: round2(insurancePerMonth),
      serviceFee: round2(serviceFee),
      total: round2(total),
      remaining: round2(remaining),
    });
  }

  const summary = {
    totalPrincipal: round2(totalPrincipal),
    totalInterest: round2(totalInterest),
    totalInsurance: round2(totalInsurance),
    totalServiceFee: round2(amountServiceFee),
    totalPayment: round2(
      totalPrincipal + totalInterest + totalInsurance + amountServiceFee
    ),
  };

  // ✅ แปลงค่าทั้งหมดให้เป็น string ที่มี comma และทศนิยม 2 ตำแหน่ง
  return {
    rows: rows.map((r) => ({
      ...r,
      start_balance: formatNumber(r.start_balance),
      principal: formatNumber(r.principal),
      interest: formatNumber(r.interest),
      insuranceAmount: formatNumber(r.insuranceAmount),
      insuranceTax: formatNumber(r.insuranceTax),
      insuranceTotal: formatNumber(r.insuranceTotal),
      serviceFee: formatNumber(r.serviceFee),
      total: formatNumber(r.total),
      remaining: formatNumber(r.remaining),
    })),
    summary: {
      totalPrincipal: formatNumber(summary.totalPrincipal),
      totalInterest: formatNumber(summary.totalInterest),
      totalInsurance: formatNumber(summary.totalInsurance),
      totalServiceFee: formatNumber(summary.totalServiceFee),
      totalPayment: formatNumber(summary.totalPayment),
    },
  };
}
