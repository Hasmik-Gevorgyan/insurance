import React from 'react';
import styled from 'styled-components';
import { themes } from '../styling';
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
import { handleDateFormat } from '../helperFunctions';

interface IHeaderProps {
  headerData: any[];
  data: any;
  onClick(isopenModal: boolean): void;
  isChangable?: boolean;
  getDeletedId(id: string): void;
  toggleDeleteModal(): void;
  editActive(active: any): void;
}

const StyledHeader = styled.div`
  padding-bottom: ${themes.spacing.spacing05};
  border-bottom: ${themes.spacing.spacing01} solid ${themes.colors.border01};
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: flex-end;

  & > button {
    padding-right: ${themes.spacing.spacing04};
  }

  &>button: first-child {
    margin-right: ${themes.spacing.spacing03};
  }
`;

const TableDataShow = (props: IHeaderProps) => {
  const { data, headerData, onClick,editActive } = props;

  return (
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
                  {row.cells.map((cell: any) => {
                    return props.isChangable && row.cells[row.cells.length - 1] === cell ? (
                      <>
                        <TableCell key={cell.id}>
                          <StyledButtons>
                            <Button size="small"
                              onClick = {()=>{
                                console.log(data.find((d: any) => d.id === row.id), row._id);
                                editActive(data.find((d: any) => d.id === row.id));
                              }}
                            >Խմբագրել</Button>
                            <Button
                              size="small"
                              kind="danger"
                              onClick={() => {
                                console.log(data.find((d: any) => d.id === row.id), row._id);
                                props.getDeletedId(row.id);
                                props.toggleDeleteModal();
                              }}
                            >
                              ՋնՋել
                            </Button>
                          </StyledButtons>
                        </TableCell>
                      </>
                    ) : (
                      <TableCell key={cell.id}>
                        {cell.info.header === 'date' ? handleDateFormat(new Date(cell.value)) : cell.value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
};

export default TableDataShow;
