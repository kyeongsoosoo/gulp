export const months = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
] as const;

export type Month = typeof months[number];

export type MonthlyData = {
  month: Month;
  total: number;
  intake: number;
};

export const MonthlyDatas: MonthlyData[] = [
  {
    month: '1월',
    total: 48,
    intake: 24,
  },
  {
    month: '2월',
    total: 60,
    intake: 14,
  },
  {
    month: '3월',
    total: 72,
    intake: 67,
  },
  {
    month: '4월',
    total: 59,
    intake: 50,
  },
  {
    month: '5월',
    total: 48,
    intake: 34,
  },
  {
    month: '5월',
    total: 40,
    intake: 33,
  },
  {
    month: '6월',
    total: 70,
    intake: 60,
  },
  {
    month: '7월',
    total: 80,
    intake: 50,
  },
  {
    month: '8월',
    total: 69,
    intake: 45,
  },
  {
    month: '9월',
    total: 88,
    intake: 34,
  },
  {
    month: '10월',
    total: 40,
    intake: 39,
  },
  {
    month: '11월',
    total: 57,
    intake: 50,
  },
  {
    month: '12월',
    total: 30,
    intake: 20,
  },
];
