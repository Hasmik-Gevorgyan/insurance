import React, { useState } from 'react';
import {
  ComposedModal,
  ModalHeader,
  ModalBody,
  NumberInput,
  ModalFooter,
  Dropdown,
  DatePicker,
  DatePickerInput,
  Button
} from 'carbon-components-react';
import styled from 'styled-components';
import { getDateFormat } from '../../helperFunctions';
import { themes } from '../../styling';
import { handleDateFormat } from '../../helperFunctions';

const StyledItem = styled.div`
  margin-top: ${themes.spacing.spacing04};
`;

function ModalComponent({ ...props }) {
  const [date, setDate] = useState(props.kind === "edit" ? props.editableActive.date : "");
  const [value, setValue] = useState(props.kind === "edit" ? props.editableActive.value : 0);
  const [profit, setProfit] = useState(props.kind === "edit" ? props.editableActive.profit : 0);
  const [name, setName] = useState("");

  return (
    <ComposedModal open={props.open} onClose={props.onClick}>
      <ModalHeader title={props.header} />
      <ModalBody>
        <Dropdown
          id="carbon-dropdown-example"
          items={props.types}
          itemToString={(item: any) => {
            return item.name;
          }}
          label="Ընտրել ակտիվի տեսակը"
          titleText="Ակտիվ"
          // selectedItem = {name}
          onChange={(item: any) => {
            setName(item.selectedItem.activeName.en);
          }}
        />
        <StyledItem>
        <DatePicker
          dateFormat="d/m/Y"
          datePickerType="single"
          maxDate={new Date()}
          onChange={(date: any) => {
            setDate(getDateFormat(new Date(date[0])));
          }}
        >
          <DatePickerInput
            id="date-picker-calendar-id"
            placeholder="dd/mm/yyyy"
            labelText="Ամսաթիվ"
            type="text"
            value={props.kind === "edit" ? handleDateFormat(new Date(date)): ""}
          />
        </DatePicker>
        </StyledItem>
        <StyledItem>
        <label className="bx--label">Արժեք</label>
        <NumberInput
          id ="value"
          labelText=""
          min={0}
          step={100}
          defaultValue={value}
          onChange={(event: any) => {
            setValue(Number(event.imaginaryTarget.value));
          }}
        />
        </StyledItem>
        <StyledItem>
        <label className="bx--label">Շահույթ</label>
        <NumberInput
          labelText="Շահույթ"
          min={0}
          step={100}
          defaultValue={profit}
          onChange={(event: any) => {
            setProfit(Number(event.imaginaryTarget.value));
          }}
        />
        </StyledItem>
      </ModalBody>
      <ModalFooter>
        <Button
          kind="secondary"
          onClick={() => {
            props.onClick();
          }}
        >
          Չեղարկել
        </Button>
        <Button
          kind="primary"
          onClick={() => {
            if (date !== '' && name !== '' && value > 0 && profit > 0) {
              if(props.kind === "add" ){
              props.onSave({
                value: value,
                date: date,
                name: name,
                profit: profit,
              });}else{
                props.onEdit(
                  {
                    value: value,
                    date: date,
                    name: name,
                    profit: profit,
                    id:props.editableActive._id,
                  }
                )
              }
              props.onClick();
            }
          }}
        >
          {props.header}
        </Button>
      </ModalFooter>
    </ComposedModal>
  );
}

export default ModalComponent;
