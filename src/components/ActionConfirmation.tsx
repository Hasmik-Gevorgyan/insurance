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
import { Button } from 'carbon-components-react';

function ActionConfirmation({ ...props }) {
  return (
    <ComposedModal open={props.open} onClose={props.onClick} size="xs">
      <ModalHeader title={'Ցանկանու՞մ եք ջնջել'} />
      <ModalBody></ModalBody>
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
            props.onSave();
            props.onClick();
          }}
        >
          Հաստատել
        </Button>
      </ModalFooter>
    </ComposedModal>
  );
}

export default ActionConfirmation;
