import React from 'react';
import {
  ComposedModal,
  ModalHeader,
  ModalBody,
} from 'carbon-components-react';
import { GroupedBarChart } from '@carbon/charts-react';
import styled from 'styled-components';
import { themes } from '../../styling';
var simplex = require('simplex-solver');


const StyledOptimizeModal = styled.div`
	.bx--modal-content {
		padding-right:  ${themes.spacing.spacing04};
	}
`;

const StyledTitle = styled.h1`
	margin-bottom: ${themes.spacing.spacing04};
	font-size:  ${themes.spacing.spacing05};
	padding: ${themes.spacing.spacing04};
	background: #ffffff;
	color: #009d9a;
	font-weight: bold;
`;

const StyledResult = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: ${themes.spacing.spacing04};
	border-bottom: ${themes.spacing.spacing01} solid ;
	color: #009d9a;
`;

const restrictions = [
	{
		name: "Պահուստը բանկում",
		key: "a1",
		value: 80,
		constraint: '>=',
	},
	{
		name: "Պետական արժեթղթեր",
		key: "a2",
		value: 3,
		constraint: '>=',
	},
	{
		name: "Ապահովագրվողների վարկ",
		key: "a3",
		value: 40,
		constraint: '<=',
	},
	{
		name: "Բաժնետոմսեր",
		key: "a4",
		value: 10,
		constraint: '<=',
	},
];

const options = {
	"title": "ԽՆԴՐԻ ԼՈՒԾՄԱՆ ԱՐԴՅՈՒՆՔՆԵՐԸ",
	"axes": {
		"left": {
			"mapsTo": "value"
		},
		"bottom": {
			"scaleType": "labels",
			"mapsTo": "key"
		}
	},
	"height": "300px"
};

function getSimplexData( activeTypes: any,selected: any, active: any) {
	let objective = '';
	let actives: any = [];
	let restrictionsArr: any = [];

	if(Object.keys(selected).length > 0 && selected.members.length > 2) {
		for(let i = 1; i< selected.members.length; i++) {
			actives = [...actives, activeTypes.find((active: any) => active.number === 'a' + selected.members[i])]
			restrictionsArr = [...restrictionsArr,restrictions.find(item => item.key === 'a' + selected.members[i])]
		}
	}else {
		actives = activeTypes;
		restrictionsArr = restrictions;
	}
	
	for(let i =0; i< actives.length;i++) {
		objective += actives.find((active: any) =>active.header === restrictionsArr[i].name).profitability + restrictions[i].key + ( i === restrictions.length-1 ? '':' + ');
	}
	let commonConstrait = '';
	let constraints = restrictionsArr.map((item: any,index: number) =>{
		let constrait = item.key + ' ' + item.constraint + ' ' + item.value;
		commonConstrait += item.key + ( index === restrictionsArr.length-1 ? '':' + ');
		return constrait;
	});

	commonConstrait += ' >= 80';
	let sumA = 0;
	let Cn = '';
	for(let i = 0; i< actives.length; i++) {
		Cn += actives[i].r + actives[i].number + ( i === actives.length-1 ? '':' + ')
		sumA += active[actives[i].activeName.en];
	}

	Cn = "( "+ Cn + ") "+ " * " +(100/sumA )+" >= 0.49";
	constraints.push(commonConstrait, Cn);
  
	const result = calculateSimplex(objective,constraints);
	const chartData = getChartData(result,restrictionsArr);

	return {simplex:result, chartData};
}

function calculateSimplex(objective: any, constraints: any) {
	var resultss = simplex.maximize(objective, [...constraints]);
	return resultss;
}

function getChartData(simplex: any,restrictions: any){
	let data: any = [];
	for(let i = 0; i < restrictions.length; i++) {
		let index = Object.keys(simplex).find(key => key === restrictions[i].key);
		data = [...data, {
			"group": "Սահմանային արժեք",
			"key": restrictions[i].name,
			"value": restrictions[i].value,
		},
		{
			"group": "Ստացված արժեք",
			"key": restrictions[i].name,
			"value": simplex[index as any],
		}]
	}

	return data;
}

function OptimizeModal({ ...props }) {
	let result = getSimplexData(props.activeTypes, props.regression.selected, props.active);

  return (
	  <StyledOptimizeModal>
		<ComposedModal open={props.open} onClose= {props.toggleModal}>
			<ModalHeader title="Օպտիմալացում" />
			<ModalBody>
					<StyledTitle>
					{ "P(A) = " + result.simplex.max.toLocaleString()}
					</StyledTitle>
				<div className = 'bx--row'>
					<div className = "bx--col-lg-10">					
						<GroupedBarChart 
						data = {result.chartData}
						options = {options as any}/>
					</div>
					<div className = "bx--col-lg-6">
						{result.chartData.map((data: any) =>{
							return data.group === "Ստացված արժեք" &&
							<StyledResult>
								<div>{data.key}</div>
								<div>{data.value} %</div>
							</StyledResult>
						})}
					</div>
				</div>
				
			</ModalBody>
		</ComposedModal>
	</StyledOptimizeModal>
  );
}

export default OptimizeModal;
