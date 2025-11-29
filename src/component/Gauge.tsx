// GaugeMoney.jsx
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

export default function GaugeMoney({
  value = 0,
  max = 100,
  size = 200,
  color = "#52b202",
  label = "",
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <Gauge
        width={size}
        height={size}
        value={value}
        valueMax={max}
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: size * 0.2, // Auto scale text
            fontWeight: "bold",
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: color,
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
      />

      {/* Optional Label */}
      {label && (
        <div style={{ marginTop: 8, fontSize: 16, fontWeight: "600" }}>
          {label}
        </div>
      )}
    </div>
  );
}
