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
} from 'carbon-components-react';
import { TextInput } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { getDateFormat } from '../../helperFunctions';

function ModalComponent({ ...props }) {
  const [date, setDate] = useState('');
  const [value, setValue] = useState(0);
  const [profit, setProfit] = useState(0);
  const [name, setName] = useState('');

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
          label="Ընտրիր ակտիվի տեսակը"
          titleText="Ակտիվ"
          // selectedItem = {name}
          onChange={(item: any) => {
            setName(item.selectedItem.name);
          }}
        />
        <DatePicker
          dateFormat="m/d/Y"
          datePickerType="single"
          maxDate={new Date()}
          onChange={(date: any) => {
            console.log(date);
            setDate(getDateFormat(new Date(date[0])));
          }}
        >
          <DatePickerInput
            id="date-picker-calendar-id"
            placeholder="mm/dd/yyyy"
            labelText="Date picker label"
            type="text"
          />
        </DatePicker>
        <NumberInput
          labelText="Արժեք"
          min={0}
          step={100}
          defaultValue={value}
          onChange={(event: any) => {
            setValue(Number(event.imaginaryTarget.value));
          }}
        />
        <NumberInput
          labelText="Շահույթ"
          min={0}
          step={100}
          defaultValue={profit}
          onChange={(event: any) => {
            setProfit(Number(event.imaginaryTarget.value));
          }}
        />
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
              props.onSave({
                value: value,
                date: date,
                name: name,
                profit: profit,
              });
              props.onClick();
            }
          }}
        >
          Ավելացնել
        </Button>
      </ModalFooter>
    </ComposedModal>
  );
}

export default ModalComponent;
