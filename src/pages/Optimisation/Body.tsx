import React from 'react';
import styled from 'styled-components';
import { themes } from '../../styling';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { lineChartOptions } from '../Actives/options';
import { LineChart } from '@carbon/charts-react';
import { handleDateFormat } from '../../helperFunctions';

interface IHeaderProps {
  headerData: any[];
  data: any;
  // chartData: any;
  regression: any;
}

const headerR = [
  {
    header: 'Y',
    key: '0',
  },
  {
    header: 'A1',
    key: '1',
  },
  {
    header: 'A2',
    key: '2',
  },
  {
    header: 'A3',
    key: '3',
  },
  {
    header: 'A4',
    key: '4',
  },
];

const StyledBody = styled.div`
  padding-top: ${themes.spacing.spacing05};
`;

const StyledTable = styled.div`
  padding-left: 0;

  > div > div {
    max-height: 600px;
  }
`;

const StyledRegressionModel = styled.div`
  padding: ${themes.spacing.spacing04};
  text-align: center;
  background: #e5e5e5;
  margin-top: ${themes.spacing.spacing04};
  color: #0f62fe;
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${themes.spacing.spacing04};

  > button {
    padding-right: ${themes.spacing.spacing04};
  }
`;

const BodyForPortfelio = (props: IHeaderProps) => {
  const { data, headerData, regression } = props;
  let regressionData = [];
  if (Object.keys(regression).length > 0) {
    regressionData = regression.data[5].r.map((r: any) => {
      return {
        '0': r[0],
        '1': r[1],
        '2': r[2],
        '3': r[3],
        '4': r[4],
        id: r[0],
      };
    });
    console.log(regression.data[5], regressionData);
  }

  return (
    <StyledBody className="bx--row">
      <StyledTable className="bx--col-lg-9 bx--col-md-8 bx--col-sm-4">
        <DataTable rows={data} headers={headerData}>
          {({ rows, headers, getHeaderProps, getTableProps }: any) => (
            <TableContainer title="">
              <Table {...getTableProps()} size="normal">
                <TableHead>
                  <TableRow>
                    {headers.map((header: any) => (
                      <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row: any) => (
                    <TableRow key={row.id}>
                      {row.cells.map((cell: any) => (
                        <TableCell key={cell.id}>{'֏ ' + cell.value.toLocaleString()}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DataTable>
      </StyledTable>
      <div className="bx--col-lg-7 bx--col-md-8 bx--col-sm-4">
        {Object.keys(regression).length > 0 && (
          <div>
            <DataTable rows={regressionData} headers={headerR} key={regressionData.data}>
              {({ rows, headers, getHeaderProps, getTableProps }: any) => (
                <TableContainer title="">
                  <Table {...getTableProps()} size="compact">
                    <TableHead>
                      <TableRow>
                        {headers.map((header: any) => (
                          <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row: any) => (
                        <TableRow key={row.id}>
                          {row.cells.map((cell: any) => (
                            <TableCell key={cell.id}>{cell.value !== 1 ? cell.value.toFixed(2) : cell.value}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </DataTable>
          </div>
        )}
        {/* <StyledCharts>
                <LineChart data={data} options={lineChartOptions as any} />
            </StyledCharts> */}
        <StyledRegressionModel>Y=23.3+0.4𝑋4</StyledRegressionModel>
        <StyledButton>
          <Button size="field">Օպտիմալացնել</Button>
        </StyledButton>
      </div>
    </StyledBody>
  );
};

export default BodyForPortfelio;
