import React from "react";
import {
  Table,
  Layout,
  Card,
  Button,
  Input,
  Modal,
  message,
  Select,
  Transfer,
  Popconfirm,
  InputNumber,
  Form,
  Tabs,
  Tree
} from "antd";
import {
  userlist,
  hotellist,
  addUserAlarm,
  removeUserAlarm,
  getAreaMap,
  updateAdminAreas,
  getAdminAreas,
  getallRegion,
  putuser,
  deleteuser
} from "../axios";
import "./user.css";
import { Link } from 'react-router-dom';

const { Content } = Layout;
const Option = Select.Option;
const { TabPane } = Tabs;
const TreeNode = Tree.TreeNode;

function callback(key) {
  console.log(key);
}





const FormItem = Form.Item;
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };
  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoListDataSource: [],
      device_ip: null,
      sitelist: [],
      typenone: "inline-block",
      mockData: [],
      targetKeys: [],
      hotllists: [],
      arealist: [],
      sitelists: [],
      permissionlist: [],
      userlist: [{
        gmtcreate: "2020-10-16 15:03:14",
        id: 3,
        lastLogin: "2020-10-26 15:03:14",
        mail: "772988756@qq.com",
        name: "郑州市卫生监督所",
        notifier: false,
        phone: "110",
        status: true,
        username: "admin",
      }],
      areauserlist: [{
        gmtcreate: "2020-08-26 15:58:17",
        id: 61,
        lastLogin: "2020-10-23 11:05:54",
        mail: "772988756@qq.com",
        name: "郑州卫计所",
        notifier: false,
        phone: "15355497220",
        status: true,
        username: "zzadmin",
      }],
      hoteluserlist: [{
        gmtcreate: "2020-10-25 15:01:55",
        id: 56,
        lastLogin: "2020-10-24 09:11:29",
        mail: "772988756@qq.com",
        name: "张经理",
        notifier: false,
        phone: "15355497220",
        siteId: 1,
        siteName: "郑州大酒店",
        status: true,
        username: "hoteladmin",
      }],
      typelist: [{
        'id': '0',
        'value': '超级管理员'
      }, {
        'id': '1',
        'value': '管理员'
      }, {
        'id': '2',
        "value": '酒店管理员'
      }],

    };


  }


  componentWillMount() {
    document.title = "用户管理";
  }

  componentDidMount() {


    getallRegion([
      410000
    ]).then(res => {
      if (res.data && res.data.message === "success") {
        this.setState({
          permissionlist: res.data.data
        })
      }
    });


  }

  onChange = (date, dateString) => {
    console.log(date, dateString);
  }

  setup = () => {
    this.setState({
      visible: true
    })
  }

  saveOk = () => {
    this.setState({
      menuvisible: false
    })
  }

  typeChange = (value) => {
    console.log(value)
    this.setState({
      usertypeid: value
    }, function () {
      if (this.state.usertypeid === "2") {
        this.setState({
          hotllists: JSON.parse(localStorage.getItem('sitelist'))
        })
      } else {
        this.setState({
          siteid: undefined,
          hotllists: []
        })
      }
    })
  }

  hotelChange = (value) => {
    console.log(value)
    this.setState({
      siteid: value
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      menuvisible: false,
      deletevisible: false,
    })
  }






  //删除用户
  deleteOk = (text, record, index) => {
    this.setState({
      deletevisible: false,
    });

  }

  onDelete = () => {
    this.setState({
      deletevisible: true,
    });
  }

  //打开区域弹框
  showModal = (text, index, record) => {
    this.setState({
      menuvisible: true,
    })
  }


  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.adcode} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }

  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: true,
    });
  }

  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({
      checkedKeys: checkedKeys,
    });
  }


  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const typeOptions = this.state.hotllists.map(type => <Option key={type.id}>{type.value}</Option>);
    // const typeOption = this.state.typelist.map(type => <Option key={type.id}>{type.value}</Option>);

    this.nodeInfoTableColumns = [
      {
        title: "用户名",
        dataIndex: "username",
      },
      {
        title: "姓名",
        dataIndex: "name",
        editable: true,
      },
      {
        title: "联系方式",
        dataIndex: "phone",
        editable: true,
        render: (text) => {
          return (
            <div>
              {text = text.substr(0, 4) + '****' + text.substr(-4)}
            </div>
          )
        }
      },
      {
        title: "邮箱",
        dataIndex: "mail",
        editable: true,
        render: (text) => {
          if (text === null || text === "" || text === undefined) {
            return (
              <div>
                无
              </div>
            )
          } else {
            return (
              <div>
                {text = text.substr(0, 4) + '****' + text.substr(-4)}
              </div>
            )
          }

        }
      }
      ,
      {
        title: "创建时间",
        dataIndex: "gmtcreate"
      }
    ]



    this.areaColumns = [
      {
        title: "用户名",
        dataIndex: "username",
        editable: true,
      },
      {
        title: "姓名",
        dataIndex: "name",
        editable: true,
      },
      {
        title: "联系方式",
        dataIndex: "phone",
        editable: true,
        render: (text) => {
          return (
            <div>
              {text = text.substr(0, 4) + '****' + text.substr(-4)}
            </div>
          )
        }
      },
      {
        title: "邮箱",
        dataIndex: "mail",
        editable: true,
        render: (text) => {
          if (text === null || text === "" || text === undefined) {
            return (
              <div>
                无
              </div>
            )
          } else {
            return (
              <div>
                {text = text.substr(0, 4) + '****' + text.substr(-4)}
              </div>
            )
          }

        }
      }
      ,
      {
        title: "管辖区域",
        dataIndex: "areaId",
        render: (text, record, index) => {
          return (
            <div>
              <span onClick={() => this.showModal(text, index, record)} style={{ color: 'blue', cursor: 'pointer' }}>
                查看
              </span>
            </div>
          );
        }
      }
      ,
      {
        title: "创建时间",
        dataIndex: "gmtcreate",
      }
      , {
        title: '操作',
        dataIndex: 'id',
        render: (text, record, index) => {
          return (
            <div>
              <a ><img src={require('./edit.png')} alt="" /></a>
              <span style={{ marginLeft: '20px' }} onClick={() => this.onDelete(text, record, index)}>
                <a><img src={require('./delete.png')} alt="" /></a>
              </span>
            </div>
          );
        }
      }
    ];



    this.hotelColumns = [
      {
        title: "用户名",
        dataIndex: "username",
      },
      {
        title: "姓名",
        dataIndex: "name",
        editable: true,
      },
      {
        title: "联系方式",
        dataIndex: "phone",
        editable: true,
        render: (text) => {
          return (
            <div>
              {text = text.substr(0, 4) + '****' + text.substr(-4)}
            </div>
          )
        }
      },
      {
        title: "邮箱",
        dataIndex: "mail",
        editable: true,
        render: (text) => {
          if (text === null || text === "" || text === undefined) {
            return (
              <div>
                无
              </div>
            )
          } else {
            return (
              <div>
                {text = text.substr(0, 4) + '****' + text.substr(-4)}
              </div>
            )
          }

        }
      }
      , {
        title: "所属酒店",
        dataIndex: "siteName",
        render: (text, record, index) => {
          return (
            <span>
              {text}
            </span>
          )
        }
      },
      {
        title: "创建时间",
        dataIndex: "gmtcreate",
      }
      , {
        title: '操作',
        dataIndex: 'id',
        render: (text, record, index) => {
          return (
            <div>
              <a><img src={require('./edit.png')} alt="" /></a>
              <span style={{ marginLeft: '20px' }} onClick={() => this.onDelete(text, record, index)}>
                <a><img src={require('./delete.png')} alt="" /></a>
              </span>
            </div>
          );
        }
      },
    ];


    const nodeInfoTableColumns = this.nodeInfoTableColumns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          // editing: this.isEditing(record),
        }),
      };
    });


    const areaColumns = this.areaColumns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          // editing: this.isEditing(record),
        }),
      };
    });

    const hotelColumns = this.hotelColumns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          // editing: this.isEditing(record),
        }),
      };
    });
    return (
      <Layout >
        <Layout>
          <Content style={{ margin: "16px 16px" }} id="user">
            <Card title="账号管理-用户管理" id="nodeManage" headStyle={{ fontWeight: 'bold', fontSize: '18px' }}
              extra={
                <div>
                  <Button type="primary"
                    style={{ background: '#0070CC', border: '1px solid #0070CC', marginRight: '20px', display: this.state.typenone }}
                  >
                    <Link to="/app/adduser">添加用户</Link>
                  </Button>
                </div>
              }
            >
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="超级管理员" key="1">
                  <div>
                    <Table
                      dataSource={this.state.userlist}
                      components={components}
                      columns={nodeInfoTableColumns}
                      pagination={false}
                    />
                  </div>
                </TabPane>
                <TabPane tab="区域管理员" key="2" style={{ minHeight: "700px", marginLeft: '20px' }}>
                  <div>
                    <Table
                      dataSource={this.state.areauserlist}
                      components={components}
                      columns={areaColumns}
                      pagination={false}
                    />
                  </div>
                </TabPane>
                <TabPane tab="酒店管理员" key="3" style={{ minHeight: "700px", marginLeft: '20px' }}>
                  <div>
                    <Table
                      dataSource={this.state.hoteluserlist}
                      components={components}
                      columns={hotelColumns}
                      pagination={false}
                    />
                  </div>
                </TabPane>
              </Tabs>

            </Card>
          </Content>
          <Modal
            title="添加推送"
            width='700px'
            destroyOnClose
            visible={this.state.visible}
            centered
            footer={null}
            onCancel={this.handleCancel}
            mask={false}
          >
            <Transfer
              dataSource={this.state.mockData}
              listStyle={{
                width: 300,
                height: 300,
              }}
              targetKeys={this.state.targetKeys}
              onChange={this.handleChange}
              render={this.renderItem}
            />
          </Modal>
          <Modal
            title="删除用户"
            visible={this.state.deletevisible}
            onOk={this.deleteOk}
            width="400px"
            okText="删除"
            centered
            onCancel={this.handleCancel}
          >
            您确认要删除该用户吗？
          </Modal>
          <Modal
            title="选择管辖区域"
            visible={this.state.menuvisible}
            onOk={this.saveOk}
            onCancel={this.handleCancel}
            okText="保存"
            // centered
            mask={false}
          >
            <Tree
              checkable
              onExpand={this.onExpand}
              expandedKeys={this.state.expandedKeys}
              autoExpandParent={this.state.autoExpandParent}
              defaultCheckedKeys={this.state.tree}
              onCheck={this.onCheck}
              checkedKeys={this.state.checkedKeys}
              onSelect={this.onSelect}
              selectedKeys={this.state.selectedKeys}
            >
              {this.renderTreeNodes(this.state.permissionlist)}
            </Tree>
          </Modal>
        </Layout>
      </Layout >
    );
  }
}

export default App;
