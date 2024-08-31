import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts';
import { selectInfoByMonth } from '../../../redux/water/selectors.js';
import getWaterDataForLast7Days from 'helpers/getWaterDataForLast7Days';
import CustomTooltip from 'components/trackerPage/CustomTooltip/CustomTooltip';

const WeekDiagram = () => {
  const { days: waterData, date: month } = useSelector(selectInfoByMonth);
  const transformedData = getWaterDataForLast7Days(waterData, month);
  const [chartSize, setChartSize] = useState({
    width: 303,
    height: 256,
    r: 7,
    strokeWidth: 2,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 375) {
        const flexWind = Math.min(window.innerWidth - 32, 374);
        const newHeight = flexWind * 0.85;
        const newWidth = flexWind * 0.85;
        setChartSize({
          width: newWidth,
          height: newHeight,
          r: 8,
          strokeWidth: 2,
        });
      } else if (window.innerWidth < 767) {
        setChartSize({
          width: 303,
          height: 303,
          r: 8,
          strokeWidth: 2,
        });
      } else if (window.innerWidth < 768) {
        setChartSize({
          width: 272,
          height: 305,
          r: 8,
          strokeWidth: 2,
        });
      } else if (window.innerWidth < 1440) {
        setChartSize({
          width: 608,
          height: 305,
          r: 12,
          strokeWidth: 3,
        });
      } else {
        setChartSize({
          width: 588,
          height: 273,
          r: 12,
          strokeWidth: 3,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toLitersOrPercent = value => {
    if (value === 0) {
      return '0%';
    }
    return `${(value / 1000).toFixed(1)} L`;
  };

  return (
    <div>
      <AreaChart
        width={chartSize.width}
        height={chartSize.height}
        data={transformedData}
        margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0"
              stopColor="var( --hover-green-color)"
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor="var( --hover-green-color)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="name"
          tick={{
            fontSize: 15,
            fill: 'var(--primary-dark-grey-color)',
            dy: 20,
          }}
          axisLine={{ stroke: 'none' }}
          tickLine={{ stroke: 'none' }}
        />
        <YAxis
          tickFormatter={toLitersOrPercent}
          tickCount={6}
          tick={{
            fontSize: 15,
            fill: 'var(--primary-dark-grey-color)',
            dx: -20,
          }}
          axisLine={{ stroke: 'none' }}
          tickLine={{ stroke: 'none' }}
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: 'none' }}
          offset={-50}
        />

        <Area
          dataKey="uv"
          stroke="var( --hover-green-color)"
          strokeWidth="2"
          fillOpacity={1}
          fill="url(#colorUv)"
          // dot={<CustomDot data={transformedData} />}
          dot={{
            fill: 'var( --primary-white-color)',
            r: chartSize.r,
            strokeWidth: chartSize.strokeWidth,
            stroke: 'var( --hover-green-color)',
          }}
          activeDot={{
            fill: 'var( --primary-white-color)',
            r: chartSize.r,
            strokeWidth: chartSize.strokeWidth,
            stroke: 'var( --hover-green-color)',
          }}
        />
      </AreaChart>
    </div>
  );
};

export default WeekDiagram;
