import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
import {useRef} from 'react';
import {searchUser} from "@/services/ant-design-pro/api";
import {Image} from 'antd';

const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true
  },
  {
    title: '头像',
    dataIndex: 'avatarurl',
    copyable: true,
    render: (_, record) => (
      <div>
        <Image src={record.avatarurl} width={100}/>
        {/*{JSON.stringify(record)}*/}
      </div>
    ),
  },
  {
    title: '性别',
    dataIndex: 'gender',
    copyable: true,
    valueType: 'select',
    valueEnum: {
      0: {text: '男', status: 'Default'},
      1: {text: '女', status: 'Success',},
    },
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true
  },
  {
    title: '邮件',
    dataIndex: 'email',
    copyable: true
  },
  {
    title: '星球编号',
    dataIndex: 'planetCode',
    copyable: true
  },
  {
    title: '用户状态',
    dataIndex: 'userstatus',
    copyable: true,
    valueType: 'select',
    valueEnum: {
      1: {text: '异常', status: 'Default'},
      0: {text: '正常', status: 'Success',},
    },
  },
  {
    title: '用户角色',
    dataIndex: 'role',
    copyable: true,
    valueType: 'select',
    valueEnum: {
      0: {text: '普通用户', status: 'Default'},
      1: {text: '管理员', status: 'Success',},
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createtime',
    valueType: 'dateTime',
    copyable: true
  },
  {
    title: '修改时间',
    dataIndex: 'updatetime',
    valueType: 'dateTime',
    copyable: true
  },
  {
    title: '是否删除',
    dataIndex: 'isDelete',
    copyable: true,
    valueType: 'select',
    valueEnum: {
      0: {text: '否', status: 'Default'},
      1: {text: '是', status: 'Success',},
    },
  },
  // {
  //   disable: true,
  //   title: '状态',
  //   dataIndex: 'state',
  //   filters: true,
  //   onFilter: true,
  //   valueType: 'select',
  //   valueEnum: {
  //     all: { text: '全部', status: 'Default' },
  //     open: {
  //       text: '未解决',
  //       status: 'Error',
  //     },
  //     closed: {
  //       text: '已解决',
  //       status: 'Success',
  //       disabled: true,
  //     },
  //     processing: {
  //       text: '解决中',
  //       status: 'Processing',
  //     },
  //   },
  // },
  // {
  //   disable: true,
  //   title: '标签',
  //   dataIndex: 'labels',
  //   search: false,
  //   renderFormItem: (_, { defaultRender }) => {
  //     return defaultRender(_);
  //   },
  //   render: (_, record) => (
  //     <Space>
  //       {record.labels.map(({ name, color }) => (
  //         <Tag color={color} key={name}>
  //           {name}
  //         </Tag>
  //       ))}
  //     </Space>
  //   ),
  // },
  // {
  //   title: '创建时间',
  //   key: 'showTime',
  //   dataIndex: 'created_at',
  //   valueType: 'dateTime',
  //   sorter: true,
  //   hideInSearch: true,
  // },
  // {
  //   title: '创建时间',
  //   dataIndex: 'created_at',
  //   valueType: 'dateRange',
  //   hideInTable: true,
  //   search: {
  //     transform: (value) => {
  //       return {
  //         startTime: value[0],
  //         endTime: value[1],
  //       };
  //     },
  //   },
  // },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      // <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
      //   查看
      // </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          {key: 'copy', name: '复制'},
          {key: 'delete', name: '删除'},
        ]}
      />,
    ],
  },
];


export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={
        async (params = {}, sort, filter) => {
          console.log(sort, filter);
          const res = await searchUser();
          return {
            data: res.data
          }
        }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
    />
  );
};
