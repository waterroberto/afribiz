import Loader from '@/components/Global/Loader';
import { TableProps } from '@/interface';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react';


export default function Table(props: TableProps) {
  const {
    data,
    headers,
    stripedRows = true,
    selectable = false,
    dataKey = '_id',
    scrollHeight = '30rem',
    selectionMode = 'multiple',
    scrollable = true,
    loading = false,
    desktopOnly = false,
    children,
    ...rest
  } = props;

  const bodyTemplate = (data: any, options: ColumnBodyOptions) => {
    return <div>{data[options?.field]}</div>;
  };

  return (
    <div className='relative overflow-hidden border border-gray-200 rounded-xl bg-primary_3'>
      {loading && (
        <div
          className={`mx-2 rounded-none w-full absolute left-0 top-0 bottom-0 right-0 h-full bg-primary/10 backdrop-blur-[2px] z-10 flex items-center justify-center`}
        >
          <Loader />
        </div>
      )}

      <div className={`${desktopOnly ? 'hidden md:block' : ''}`}>
        <DataTable
          id='table-style'
          {...rest}
          stripedRows={stripedRows}
          scrollable={scrollable}
          columnResizeMode='fit'
          value={data}
          tableStyle={{ minWidth: '50rem', backgroundColor: "#090D1F" }}
          style={{backgroundColor: "#090D1F"}}
          paginator
          first={0}
          rows={20}
          rowsPerPageOptions={[10, 25, 50]}
          dataKey='_id'
          sortField='date'
          sortOrder={-1}
        
        >
          {/* //If selectable is enabled// */}
          {selectable && (
            <Column
              selectionMode={selectionMode}
              headerStyle={{ width: '3rem', backgroundColor: "#090D1F" }}
            ></Column>
          )}

          {headers.map((col) => (
            <Column
              key={col.field}
              field={col.field}
              header={col.title}
              body={col.body || bodyTemplate}
              className='text-sm bg-primary_2 text-neutral'
              headerClassName=" bg-primary_2 .dataTableHeader"
              headerStyle={{ backgroundColor: "#090D1F"}}
            />
          ))}
        </DataTable>
      </div>

      {desktopOnly && <div className='block md:hidden bg-primary_2'>{children}</div>}
    </div>
  );
}
