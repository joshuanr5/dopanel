import React from 'react';
import { Table } from 'antd';

const WorkingTimeTable = ({
  workingTimeData,
}) => {
  const columns = [{
    title: 'Dia',
    dataIndex: 'day_name',
    key: 'day_name',
  }, {
    title: 'Start',
    dataIndex: 'working_hours',
    key: 'start_hour',
    render: (wh) => wh.start,
  }, {
    title: 'End',
    dataIndex: 'working_hours',
    key: 'end_hour',
    render: (wh) => wh.end,
  }];
  return (
    <Table
      rowKey={record => record.day_code}
      columns={columns}
      dataSource={workingTimeData}
      pagination={false}
    />
  );
};

export default WorkingTimeTable;
