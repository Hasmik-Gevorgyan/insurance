export const headerOfTypes = [
  {
    header: 'Անուն',
    key: 'name',
  },
  {
    header: 'Եկամտաբերություն (%)',
    key: 'profitability',
  },
  // {
  //     header: "",
  //     key: "activeName"
  // },
];

export const headerOfTransactions = [
  {
    header: 'Անուն',
    key: 'name',
  },
  {
    header: 'Ամսաթիվ',
    key: 'date',
  },
  {
    header: 'Շահութաբերություն',
    key: 'profit',
  },
  {
    header: 'Արժեք',
    key: 'value',
  },
  {
    header: '',
    key: 'group',
  },
];

export type kindOfSwitches = 'Գործարքներ' | 'Ակտիվներ';
export const switches: kindOfSwitches[] = ['Գործարքներ', 'Ակտիվներ'];

export const pieOptions = {
  title: 'Ակտիվներ',
  resizable: true,
  height: '300px',
};

export const lineChartOptions = {
  axes: {
    bottom: {
      mapsTo: 'date',
      scaleType: 'time',
    },
    left: {
      mapsTo: 'value',
      scaleType: 'linear',
    },
  },
  curve: 'curveMonotoneX',
  height: '300px',
};
