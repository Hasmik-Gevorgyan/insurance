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

function OptimizeModal({ ...props }) {
  return (
    <ComposedModal open={props.open}>
      <ModalHeader title="Օպտիմալացւմ" />
      <ModalBody></ModalBody>
    </ComposedModal>
  );
}

export default OptimizeModal;
