import { BarChart } from '@mui/x-charts/BarChart';
import * as React from 'react';
import { animated, useSpring } from '@react-spring/web';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ReactSpringAnimationCustomization() {
  const [key, animate] = React.useReducer((v) => v + 1, 0);

  // ຂໍ້ມູນຍອດປ່ອຍກູ້ 5 ປີ
  const years = ['2020', '2021', '2022', '2023', '2024'];
  const loanData = [10, 30, 40, 150, 280]; // ປັບຕາມຂໍ້ມູນຈິງ

  return (
    <Stack>
      
      <BarChart
        key={key}
        xAxis={[{ data: years }]}
        series={[
          {
            type: 'bar',
            data: loanData,
            label: 'ຍອດປ່ອຍກູ້ 5 ປິ ຍ້ອຍຫລັງ',
          }
        ]}
        barLabel="value"
        slots={{ barLabel: AnimatedBarLabel }}
      />

     
    </Stack>
  );
}

function AnimatedBarLabel(props) {
  const {
    color,
    xOrigin,
    yOrigin,
    x,
    y,
    width,
    height,
    ...otherProps
  } = props;

  const style = useSpring({
    from: { y: yOrigin },
    to: { y: y - 4 },
    config: { tension: 100, friction: 10 },
  });

  return (
    <animated.text
      {...otherProps}
      fill={color}
      x={xOrigin + x + width / 2}
      width={width}
      height={height}
      style={style}
      textAnchor="middle"
    />
  );
}
