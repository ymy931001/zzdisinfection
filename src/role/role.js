import React from "react";
import {
  Table,
  Layout,
  Card,
  Button,
  Input,
  Modal,
  message,
  Tree
} from "antd";
import {
  getmenu,
  addrole,
  rolelist,
  updateMenuRole,
  deleterole
} from "../axios";
import "./role.css";

const { Content } = Layout;
const TreeNode = Tree.TreeNode;

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
      rolelist: [{
        id: 1,
        name: "ROLE_SUPER",
        namezh: "系统管理员",
      }, {
        id: 2,
        name: "ROLE_AREA",
        namezh: "区域管理员",
      }, {
        id: 4,
        name: "ROLE_SITE",
        namezh: "酒店管理员",
      }]
    };


  }


  componentWillMount() {
    document.title = "角色管理";
  }

  componentDidMount() {






  }

  onChange = (date, dateString) => {
    console.log(date, dateString);
  }

  //打开权限弹框
  showModal = (text, index, record) => {
    console.log(record)
    this.setState({
      roleid: record.id
    });
    getmenu([
      record.id
    ]).then(res => {
      if (res.data && res.data.message === "success") {
        this.setState({
          permissionlist: res.data.data.menus,
          // rolemenu: res.data.data.mids,
          checkedKeys: res.data.data.mids,
          menuvisible: true,

        })
      }
    });
  }

  //打开弹框
  setup = () => {
    this.setState({
      visible: true
    })
  }

  //关闭弹框
  handleCancel = () => {
    this.setState({
      visible: false,
      menuvisible: false,
      deletevisible: false,
    })
  }

  //输入角色中文
  roleZh = (e) => {
    this.setState({
      roleZh: e.target.value
    })
  }
  //输入角色英文
  role = (e) => {
    this.setState({
      role: e.target.value
    })
  }
  //添加角色
  handleOk = () => {
    this.setState({
      visible: false
    })
  }


  //删除角色
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



  render() {
    const components = {
      body: {
        // row: EditableFormRow,
        // cell: EditableCell,
      },
    };

    this.nodeInfoTableColumns = [
      {
        title: "角色名称",
        dataIndex: "namezh",
      }, {
        title: "角色简写",
        dataIndex: "name",
      },
      {
        title: "权限分配",
        dataIndex: "id",
        render: (text, record, index) => {
          return (
            <div>
              <span style={{ color: 'blue', cursor: 'pointer' }}>
                选择权限
              </span>
              <span style={{ marginLeft: '10px' }}>
              </span>
            </div>
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: (text, record, index) => {
          return (
            <div>
              <span onClick={() => this.onDelete(text, record, index)}>
                <a><img src={require('./delete.png')} alt="" /></a>
              </span>
            </div>
          );
        }
      }
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
          editing: this.isEditing(record),
        }),
      };
    });
    return (
      <Layout >
        <Layout>
          <Content style={{ margin: "16px 16px" }} id="role">
            <Card title="账号管理-角色管理" headStyle={{ fontWeight: 'bold', fontSize: '18px' }} extra={
              <div>
                <Button type="primary" onClick={this.setup}
                  style={{ marginRight: '20px', display: this.state.typenone }}
                >
                  添加角色
                </Button>
              </div>
            }>
              <div>
                <Table
                  dataSource={this.state.rolelist}
                  components={components}
                  columns={nodeInfoTableColumns}
                  pagination={false}
                />
              </div>
            </Card>
          </Content>
          <Modal
            title="添加角色"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确认"
            destroyOnClose
            width="400px"
            centered
          // mask={false}
          >
            <div>
              <div style={{ display: this.state.twoadd }}>
                <span>角色名称：</span>
                <Input placeholder="请输入角色名称"
                  style={{ width: '100%', marginBottom: "10px", marginTop: '10px' }}
                  autoComplete="off"
                  onChange={this.roleZh}
                  value={this.state.roleZh}
                />
                <span>角色简写：</span>
                <Input placeholder="请输入角色简写"
                  style={{ width: '100%', marginBottom: "10px", marginTop: '10px' }}
                  autoComplete="off"
                  onChange={this.role}
                  value={this.state.role}
                />
              </div>
            </div>
          </Modal>
          <Modal
            title="删除角色"
            visible={this.state.deletevisible}
            onOk={this.deleteOk}
            width="400px"
            okText="删除"
            centered
            onCancel={this.handleCancel}
          >
            您确定要删除该角色吗？
          </Modal>

        </Layout>
      </Layout >
    );
  }
}

export default App;
