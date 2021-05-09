import React from 'react';
import {
  ComposedModal,
  ModalHeader,
  ModalBody,
} from 'carbon-components-react';
import { GroupedBarChart } from '@carbon/charts-react';
import styled from 'styled-components';
import { themes } from '../../styling';

const StyledTitle = styled.h1`
  margin-bottom: ${themes.spacing.spacing04};
  font-size: 24px;
  padding: ${themes.spacing.spacing04};
  background: #ffffff;
  color: #6929c4;
  font-weight: bold;
`;

const data = [
	{
		"group": "Dataset 1",
		"key": "Qty",
		"value": 65000
	},
	{
		"group": "Dataset 1",
		"key": "Restocking",
		"value": 51213
	},
	{
		"group": "Dataset 1",
		"key": "Misc",
		"value": 16932
	},
	{
		"group": "Dataset 2",
		"key": "Misc",
		"value": 34234
	},
	{
		"group": "Dataset 3",
		"key": "More",
		"value": 23232
	},
	{
		"group": "Dataset 3",
		"key": "Sold",
		"value": 34232
	},
	{
		"group": "Dataset 4",
		"key": "More",
		"value": 21313
	},
	{
		"group": "Dataset 4",
		"key": "Sold",
		"value": 64353
	},
	{
		"group": "Dataset 4",
		"key": "Restocking",
		"value": 24134
	},
	{
		"group": "Dataset 4",
		"key": "Misc",
		"value": 24134
	}
];

const options = {
	"title": "Vertical grouped bar (discrete)",
	"axes": {
		"left": {
			"mapsTo": "value"
		},
		"bottom": {
			"scaleType": "labels",
			"mapsTo": "key"
		}
	},
	"height": "250px"
};

function OptimizeModal({ ...props }) {
  return (
    <ComposedModal open={props.open} onClose= {props.toggleModal}>
      <ModalHeader title="Օպտիմալացում" />
      <ModalBody>
        <StyledTitle>
          {Object.keys(props.simplex).length > 0 && "P(A) = " + props.simplex.solution.optimum}
        </StyledTitle>
        <GroupedBarChart 
        data = {data}
        options = {options as any}/>
      </ModalBody>
    </ComposedModal>
  );
}

export default OptimizeModal;
