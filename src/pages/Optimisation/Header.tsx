import React, { useState } from 'react';
import styled from 'styled-components';
// import { themes } from '../styling';
import {} from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { DatePicker, DatePickerInput } from 'carbon-components-react';
import { Dropdown } from 'carbon-components-react';
import { handleDateFormat } from '../../helperFunctions';
import { kindIntervals } from './index';

interface IHeaderProps {
  //   headerData: any[];
  //   data: any;
  //   onClick(isopenModal: boolean): void;
  //   isChangable?: boolean;
  //   getDeletedId(id: string): void;
  //   toggleDeleteModal(): void;
  endDate: string;
  startDate: string;
  onChange(data: any): void;
  changeInterval(interval: kindIntervals): void;
}

const StyledHeader = styled.div`
  align-items: center;
  background: #e5e5e5;
  padding-bottom: 16px;
  padding-top: 16px;
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledDropdown = styled.div`
  display: flex;
  justify-content: flex-end;

  > div {
    width: 200px;
  }
`;

const Header = (props: IHeaderProps) => {
  const { endDate, startDate, onChange, changeInterval } = props;

  const [nstartDate, setStartDate] = useState(startDate);
  const [nendDate, setEndDate] = useState(endDate);
  console.log([nstartDate, nendDate]);

  return (
    <StyledHeader className="bx--row">
      <div className="bx--col-lg-6">
        <DatePicker
          dateFormat="d/m/Y"
          datePickerType="range"
          maxDate={new Date().getUTCDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear}
          onChange={(dates: any) => {
            console.log(dates);
            setEndDate(dates[1]);
            setStartDate(dates[0]);
          }}
          locale="en"
        >
          <DatePickerInput
            id="date-picker-range-start"
            placeholder="dd/mm/yyyy"
            labelText=""
            type="text"
            value={handleDateFormat(new Date(nstartDate))}
          />
          <DatePickerInput
            id="date-picker-range-end"
            placeholder="dd/mm/yyyy"
            labelText=""
            type="text"
            value={handleDateFormat(new Date(nendDate))}
          />
        </DatePicker>
      </div>
      <div className="bx--col-lg-5">
        <Button
          size="small"
          kind="tertiary"
          onClick={() => {
            onChange([nstartDate, nendDate]);
          }}
        >
          Հաշվել
        </Button>
      </div>
      <StyledDropdown className="bx--col-lg-5">
        <Dropdown
          ariaLabel="Dropdown"
          id="carbon-dropdown-example"
          items={['Ամսեկան', 'Շաբաթական']}
          label=""
          titleText=""
          initialSelectedItem="Շաբաթական"
          onChange={(interval: any) => {
            changeInterval(interval.selectedItem === 'Ամսեկան' ? 'month' : 'week');
            console.log();
          }}
        />
      </StyledDropdown>
    </StyledHeader>
  );
};

export default Header;
