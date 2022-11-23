import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';

import type { Month, MonthlyData } from './const';
import { MonthlyDatas, months } from './const';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler
);

export const areaOption = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const getMent = (portion: number) => {
  if (portion < 0.2) return 'Bad 😭';
  if (portion < 0.5) return 'SoSo 😌';
  if (portion < 0.8) return 'Good 😄';

  return 'Great 😘';
};

const AreaChart = ({ md }: { md: MonthlyData }) => {
  const targetIndex = months.findIndex((m) => m === md.month);
  const labels = months.slice(targetIndex - 5, targetIndex + 1);

  const areaData = {
    labels,
    datasets: [
      {
        fill: true,

        data: labels.map((label) => {
          const data = MonthlyDatas.find((d) => d.month === label);
          return Math.round((data!.intake / data!.total) * 100);
        }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="mt-10">
      <p className="text-2xl font-bold">지난 달과 비교</p>
      <Line options={areaOption} data={areaData} />
    </div>
  );
};

const RoundChart1 = ({ md }: { md: MonthlyData }) => {
  const chartData = {
    datasets: [
      {
        data: [md.intake, md.total - md.intake],
        backgroundColor: ['#48EDC5', '#D9D9D9'],
        borderColor: ['#3DBCB4', '#D9D9D9'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative h-48 w-48">
        <Doughnut data={chartData} />
        <div className="absolute top-1/2 left-1/2 z-20 flex h-32 w-32 translate-x-[-50%] translate-y-[-45%] flex-col items-center justify-center rounded-[64px] bg-white">
          <p className="font-medium">
            {md.intake}/{md.total}
          </p>
          <p className="text-lg font-bold">{getMent(md.intake / md.total)}</p>
        </div>
      </div>
      <p className="font-semibold">2022년 {md.month}</p>
    </div>
  );
};

const RoundChart2 = ({ md }: { md: MonthlyData }) => {
  const chartData = {
    datasets: [
      {
        data: [md.intake, md.total - md.intake],
        backgroundColor: ['#4899ED', '#D9D9D9'],
        borderColor: ['#3D5ABC', '#D9D9D9'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative h-48 w-48">
        <Doughnut data={chartData} />
        <div className="absolute top-1/2 left-1/2 z-20 flex h-32 w-32 translate-x-[-50%] translate-y-[-45%] flex-col items-center justify-center rounded-[64px] bg-white">
          <p className="font-medium">
            {md.intake}/{md.total}
          </p>
          <p className="text-lg font-bold">{getMent(md.intake / md.total)}</p>
        </div>
      </div>
      <p className="font-semibold">2022년 {md.month}</p>
    </div>
  );
};

const Index = () => {
  const [selectedMonth, setSelectedMonth] = useState<Month>('6월');

  const mdIdx = MonthlyDatas.findIndex((d) => d.month === selectedMonth);
  const md = MonthlyDatas[mdIdx] as MonthlyData;
  const previousMd = MonthlyDatas[mdIdx - 1] as MonthlyData;

  const handleNext = () => {
    const currentMonthIdx = months.findIndex((d) => d === selectedMonth);

    setSelectedMonth(months[currentMonthIdx + 1] ?? '6월');
  };

  const handlePrevious = () => {
    const currentMonthIdx = months.findIndex((d) => d === selectedMonth);

    setSelectedMonth(months[currentMonthIdx - 1] ?? '6월');
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-slate-200">
      <div className="h-[700px] w-[440px] rounded-xl bg-white py-8 px-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <p className="font-bold">2022년 {selectedMonth}</p>
          <div className="text-3xl text-blue-500">
            <button
              onClick={handlePrevious}
              disabled={selectedMonth === '6월'}
              className={
                selectedMonth === '6월'
                  ? 'mr-5 text-gray-600'
                  : 'mr-5 text-blue-500'
              }
            >
              {'<'}
            </button>
            <button
              onClick={handleNext}
              disabled={selectedMonth === '12월'}
              className={
                selectedMonth === '12월' ? 'text-gray-600' : 'text-blue-500'
              }
            >
              {'>'}
            </button>
          </div>
        </div>
        <div>
          <p className="text-3xl font-bold">복약 리포트</p>
          <p className="text-base font-light">
            제시간에 약물을 복용한 횟수를 보여줍니다.
          </p>
        </div>
        <div className=" mt-5 flex justify-center">
          <RoundChart1 md={md} />
          <RoundChart2 md={previousMd} />
        </div>
        <AreaChart md={md} />
      </div>
    </main>
  );
};

export default Index;
