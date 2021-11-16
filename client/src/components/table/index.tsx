import React, {forwardRef, useEffect, useMemo, useRef, useState} from 'react';
import {useFlexLayout, useResizeColumns, useRowSelect, useTable } from 'react-table';
import styled from 'styled-components'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export const Styles = styled.div`
  padding: 1rem;
  display: block;
  overflow: auto;
  .table {
    .thead {
      overflow-y: auto;
      overflow-x: hidden;
      border-bottom: 2px solid #515151;
      padding-bottom: 10px;
    }
    .tbody {
      overflow-y: scroll;
      overflow-x: hidden;
    }
    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
      border-bottom: 1px solid black;
    }
    .th{
      font-weight: 700;
    },
    .td {
      margin: 0;
      padding: 0.5rem;
      border-right: 1px solid black;
      position: relative;
      :last-child {
        border-right: 0;
      }
    }
  }
`

const Resizer = styled.div`
  right: 10px;
  width: 2px;
  height: 100%;
  position: absolute;
  z-index: 1;
  touch-action: none;
  background-color: #515151;
`

// @ts-ignore
const getStyles = (props, align = 'left') => [
    props,
    {
        style: {
            justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
            alignItems: 'flex-start',
            display: 'flex',
        },
    },
]

const IndeterminateCheckbox = forwardRef(
// @ts-ignore
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = useRef()
        const resolvedRef = ref || defaultRef

        useEffect(() => {
            // @ts-ignore
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])


        return (
            <>
                {/*// @ts-ignore */}
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        )
    }
)

// @ts-ignore
const headerProps = (props, { column }) => getStyles(props, column.align)

// @ts-ignore
const cellProps = (props, { cell }) => getStyles(props, cell.column.align)

// @ts-ignore
const TableComponent = ({ columns, data }) => {
    const defaultColumn = useMemo(
        () => ({
            // When using the useFlexLayout:
            minWidth: 30, // minWidth is only used as a limit for resizing
            width: 150, // width is used for both the flex-basis and flex-grow
            maxWidth: 200, // maxWidth is only used as a limit for resizing
        }),
        []
    )

    const { getTableProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data,
            defaultColumn,
        },
        useResizeColumns,
        useFlexLayout,
        useRowSelect
    )

    return (
        <Table {...getTableProps()} className="table">
            <div>
                {headerGroups.map(headerGroup => (
                    <TableRow
                        {...headerGroup.getHeaderGroupProps({
                            // style: { paddingRight: '15px' },
                        })}
                        className="thead"
                    >
                        {headerGroup.headers.map(column => (
                            <TableHead className="th" {...column.getHeaderProps(headerProps)}>
                                {column.render('Header')}
                                {/* Use column.getResizerProps to hook up the events correctly */}
                                {column.canResize && (
                                    <Resizer
                                        {...column.getResizerProps()}
                                    />
                                )}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </div>
            <TableBody>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <TableRow className="tbody" {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <TableCell {...cell.getCellProps(cellProps)}>
                                        {cell.render('Cell')}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

export default TableComponent;
