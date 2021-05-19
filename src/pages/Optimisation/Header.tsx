import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  DatePicker, 
  DatePickerInput,
  Button,
  Dropdown 
} from 'carbon-components-react';
import { handleDateFormat } from '../../helperFunctions';
import { kindIntervals } from './index';

interface IHeaderProps {
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

  return (
    <StyledHeader className="bx--row">
      <div className="bx--col-lg-6">
        <DatePicker
          dateFormat="d/m/Y"
          datePickerType="range"
          maxDate={new Date().getUTCDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear}
          onChange={(dates: any) => {
            dates[1] !== endDate && setEndDate(dates[1]);
            dates[0] !== startDate && setStartDate(dates[0]);
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
          }}
        />
      </StyledDropdown>
    </StyledHeader>
  );
};

export default Header;
