import { BarChart } from '@mui/x-charts/BarChart';

export default function IndexAnimationChart_GroupBasicBars() {
  return (
    <BarChart
      xAxis={[{ data: ['Team A', 'Team B', 'Team C'] }]}
      series={[
        { label: 'ຈຳນວນສັນຍາ', data: [40, 32, 28] },
        { label: 'ຍອດປ່ອຍກູ້ (ລ້ານ)', data: [120, 150, 110] },
        { label: 'ລູກຄ້າໃໝ່', data: [12, 18, 9] },
      ]}
      height={300}
    />
  );
}
