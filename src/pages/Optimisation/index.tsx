import React, { Component } from 'react';
import '@carbon/charts/styles.css';
import Header from './Header';
import { getDateFormat, checkLastFriday } from '../../helperFunctions';
import BodyForPortfelio from './Body';
import { regression } from '../../functional/allPossibleRegressions';
import OptimizeModal from './OptimizeModal';

export type kindIntervals = 'month' | 'week';

interface IOptimisationProps {}

interface IOptimisationState {
  startDate: string;
  endDate: string;
  activeTypes: any;
  actives: any;
  tableData: any;
  interval: kindIntervals;
  regression: any;
  isOpenModal: boolean;
  headerActive: any
}

class Optimisation extends Component<IOptimisationProps, IOptimisationState> {
  constructor(props: IOptimisationProps) {
    super(props);
    this.state = {
      startDate: getDateFormat(new Date(new Date().setFullYear(new Date().getFullYear() - 1))),
      endDate: getDateFormat(new Date()),
      activeTypes: [],
      actives: [],
      tableData: [],
      interval: 'week',
      regression: {},
      isOpenModal: false,
      headerActive: [],
    };
    this.GetActivesTypes = this.GetActivesTypes.bind(this);
    this.GetActivesTransactions = this.GetActivesTransactions.bind(this);
    this.changeDates = this.changeDates.bind(this);
    this.getTableData = this.getTableData.bind(this);
  }

  componentDidMount() {
    this.GetActivesTypes();    
  }

  async GetActivesTypes() {
    try {
      await fetch('http://localhost:4000/app/insurance/activeType', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          response.json().then(data => {
            let headerActive = data.map((item: any) => {
              item.header = item.activeName.hy;
              item.key = item.activeName.en;
              item.id = item._id;
              return item;
            });

            headerActive.unshift({ key: 'profit', header: 'Շահույթ', activeName: { en: '', hy: '' } });

            this.setState(
              {
                activeTypes: data,
                headerActive
              },
              () => {
                this.GetActivesTransactions();
              },
            );
          });
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error);
    }
  }

  async GetActivesTransactions() {
    try {
      await fetch(
        `http://localhost:4000/app/insurance/active/details?skip=0&limit=10000&startDate=${this.state.startDate}&endDate=${this.state.endDate}`,
        {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then(response => {
          response.json().then(data => {
            let filteredData =
              this.state.interval === 'month'
                ? data.filter((active: any) => {
                    return checkLastFriday(new Date(active.date));
                  })
                : data;

            this.setState({
              actives: data,
              tableData: data.length > 0 ? this.getTableData(this.getGroupedData(filteredData)) : [],
            });
          });
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error);
    }
  }



  getGroupedData(data: any) {
    const grouped: any = {};
    data.forEach((active: any) => {
      let date = active.date.slice(0, 10);
      let currentItem = grouped[date];
      if (currentItem) {
        grouped[date].push(active);
      } else {
        grouped[date] = [active];
      }
    });

    return grouped;
  }

  getTableData(groupedData: any) {
    let tableData = [];
    let reg: any = [];
    let i = 0;
    tableData = Object.values(groupedData).map((active: any) => {
      reg[i] = [];
      let row: any = {};
      let average = 0;
      active.map((item: any) => {
        row[item.name] = item.value;
        average += item.profit;
        reg[i].push(Math.round(item.value * 5));
        return 0;
      });

      average = average / active.length;
      row.profit = average;

      row.id = active[0]._id;

      reg[i].unshift(Math.round(average));
      i++;

      return row;
    });


    this.setState({
      regression: regression(reg),
    });

    return tableData;
  }

  changeDates(dates: string[]) {
    this.setState(
      {
        startDate: getDateFormat(new Date(dates[0])),
        endDate: getDateFormat(new Date(dates[1])),
      },
      () => {
        this.GetActivesTransactions();
      },
    );
  }

  changeInterval = (interval: kindIntervals) => {
    let filteredData =
      interval === 'month'
        ? this.state.actives.filter((active: any) => {
            return checkLastFriday(new Date(active.date));
          })
        : this.state.actives;

    let tableData = this.getTableData(this.getGroupedData(filteredData));

    this.setState({
      interval,
      tableData,
    });
  };

  toggleModal = () =>{
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    })
  }
  render() {

    return (
      <div className="container">
        <Header
          endDate={this.state.endDate}
          startDate={this.state.startDate}
          onChange={this.changeDates}
          changeInterval={this.changeInterval}
        />
        <BodyForPortfelio
          data={this.state.tableData}
          headerData={this.state.headerActive}
          regression={this.state.regression}
          toggleModal = {this.toggleModal}
        />
        {this.state.isOpenModal &&
        <OptimizeModal open={this.state.isOpenModal} 
          toggleModal = {this.toggleModal}
          activeTypes = {this.state.activeTypes}
          regression = {this.state.regression}
          active = {this.state.tableData[0]}
        />}
      </div>
    );
  }
}

export default Optimisation;
