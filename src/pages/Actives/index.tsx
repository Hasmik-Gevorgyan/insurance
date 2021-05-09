import React, { Component } from 'react';
import HeaderComponent from '../../components/HeaderComponent';
import TableDataShow from '../../components/TableDataShow';
import styled from 'styled-components';
import { themes } from '../../styling';
import { headerOfTypes, headerOfTransactions, switches, pieOptions, lineChartOptions } from './options';
import '@carbon/charts/styles.css';
import { PieChart, LineChart } from '@carbon/charts-react';
import { Button } from 'carbon-components-react';
import ModalComponent from './ModalComponent';
import ActionConfirmation from '../../components/ActionConfirmation';
import { kindOfSwitches } from './options';

const StyledActiveBody = styled.div`
  margin-top: ${themes.spacing.spacing04};
`;

const StyledMoreButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${themes.spacing.spacing04};

  > button {
    padding-right: ${themes.spacing.spacing04};
  }
`;

interface IActivesProps {}

interface IActivesState {
  activeTypes: any[];
  activesTransactions: any[];
  switchName: kindOfSwitches;
  pieChartData: { group: string; value: number }[];
  isModalOpen: boolean;
  isdeleteModalOpen: boolean;
  id: string;
  kind: "add" | "edit";
  editableActive: any;
}

class Actives extends Component<IActivesProps, IActivesState> {
  constructor(props: IActivesProps) {
    super(props);
    this.state = {
      activeTypes: [],
      activesTransactions: [],
      switchName: switches[0],
      pieChartData: [],
      isModalOpen: false,
      isdeleteModalOpen: false,
      id: '',
      kind: "add",
      editableActive: {}
    };

    this.GetActivesTransactions = this.GetActivesTransactions.bind(this);
    this.GetActivesTypes = this.GetActivesTypes.bind(this);
    this.onChangeSwitch = this.onChangeSwitch.bind(this);
    this.deleteActive = this.deleteActive.bind(this);
    this.editActive = this.editActive.bind(this)
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
            let chartData: any = [];
            data = data.map((item: any) => {
              item.name = item.activeName.hy;
              item.id = item._id;
              chartData = [...chartData, { group: item.activeName.hy, value: item.profitability }];
              return item;
            });

            this.setState(
              {
                activeTypes: data,
                pieChartData: chartData,
              },
              () => {
                this.GetActivesTransactions();
              },
            );
            console.log(data);
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
        `http://localhost:4000/app/insurance/active/details?skip=${this.state.activesTransactions.length}&limit=20`,
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
            data = data.map((item: any) => {
              item.id = item._id;
              item.group = this.state.activeTypes.find(active => active.activeName.en === item.name).activeName.hy;
              item.name = this.state.activeTypes.find(active => active.activeName.en === item.name).activeName.hy;
              return item;
            });

            this.setState({
              activesTransactions: [...this.state.activesTransactions, ...data],
            });
          });
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error);
    }
  }

  async saveActive(data: any) {
    try {
      await fetch(`http://localhost:4000/app/insurance/active`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: data.value,
          name: data.name,
          profit: data.profit,
          date: new Date(data.date),
        }),
      })
        .then(response => {
          this.GetActivesTransactions()
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error);
    }
  }

  async editActive(data: any) {
    try {
      await fetch(`http://localhost:4000/app/insurance/active/${data.id}`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: data.value,
          name: data.name,
          profit: data.profit,
          date: new Date(data.date),
        }),
      })
        .then(response => {
          this.GetActivesTransactions()
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteActive() {
    try {
      await fetch(`http://localhost:4000/app/insurance/active/${this.state.id}`, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          this.GetActivesTransactions()
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error);
    }
  }

  onChangeSwitch(name: kindOfSwitches) {
    this.setState({
      switchName: name,
    });
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  toggleDeleteModal = () => {
    this.setState({
      isdeleteModalOpen: !this.state.isdeleteModalOpen,
    });
  };

  getDeletedId = (id: string) => {
    this.setState({
      id: id,
    });
  };

  editActiveKind = (active: any) => {
    this.setState({
      kind: "edit",
      editableActive: active,
      isModalOpen: true
    })
  }

  changeKind=()=>{
    this.setState({
      kind: "add",
    })
  }
  render() {
    return (
      <div className="container">
        <HeaderComponent
          switches={switches}
          buttonName={'Ավելացնել Ակտիվ'}
          onClick={this.toggleModal}
          onChange={this.onChangeSwitch}
          changeKind = {this.changeKind}
        />
        <StyledActiveBody className="bx--row">
          <div className="bx--col-lg-10">
            {this.state.switchName === 'Գործարքներ' ? (
              <TableDataShow
                headerData={headerOfTransactions}
                data={this.state.activesTransactions}
                onClick={() => {}}
                getDeletedId={this.getDeletedId}
                toggleDeleteModal={this.toggleDeleteModal}
                editActive = {this.editActiveKind}
                isChangable
              />
            ) : (
              <TableDataShow
                headerData={headerOfTypes}
                data={this.state.activeTypes}
                onClick={() => {}}
                getDeletedId={this.getDeletedId}
                toggleDeleteModal={this.toggleDeleteModal}
                isChangable={false}
                editActive = {this.editActiveKind}
              />
            )}
            {this.state.switchName === 'Գործարքներ' && (
              <StyledMoreButton>
                <Button size="field" onClick={this.GetActivesTransactions}>
                  Ցույց տալ ավելին
                </Button>
              </StyledMoreButton>
            )}
          </div>
          <div className="bx--col-lg-6">
            {this.state.switchName === 'Գործարքներ' ? (
              <LineChart data={this.state.activesTransactions} options={lineChartOptions as any} />
            ) : (
              <PieChart options={pieOptions} data={this.state.pieChartData} />
            )}
          </div>
        </StyledActiveBody>
        {this.state.activeTypes.length > 0 && this.state.isModalOpen && (
          <ModalComponent
            kind={this.state.kind}
            open={this.state.isModalOpen}
            header={this.state.kind === "add" ? "Ավելացնել" : "Խմբագրել"}
            types={this.state.activeTypes}
            onClick={this.toggleModal}
            onSave={this.saveActive}
            editableActive = {this.state.editableActive}
            onEdit = {this.editActive}
          />
        )}
        {this.state.isdeleteModalOpen && (
          <ActionConfirmation
            key={this.state.id}
            open={this.state.isdeleteModalOpen}
            onClick={this.toggleDeleteModal}
            onSave={this.deleteActive}
          />
        )}
      </div>
    );
  }
}

export default Actives;
