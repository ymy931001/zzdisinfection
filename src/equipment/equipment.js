import React from "react";
import {
  Table,
  Layout,
  Card,
  Button,
  Input,
  Modal,
  message,
  Cascader,
  Select,
  Drawer,
  Tree,
  Tabs,
  Radio
} from "antd";
import {
  devicelist,
  hotellist,
  getroomdevice,
  getregion,
  getonlinestatus,
  getbasetype,
  isclist,
  iscarea,
  iscdevice,
  addcamera,
  getbackUrl,
  roomlist,
  deletecamera,
  addhandheld,
  geisctUrl
} from "../axios";
import "./equipment.css";
import moment from 'moment';

const { Content } = Layout;
const Option = Select.Option;
const { DirectoryTree } = Tree;
const { TabPane } = Tabs;
const { Search } = Input;
const { TextArea } = Input;




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoListDataSource: [],
      device_ip: null,
      sitelist: [],
      AutoCompletedata: [],
      macedata: [],
      typenone: 'inline-block',
      typecolor: '#40a9ff',
      oneadd: 'none',
      iscdis: 'none',
      twoadd: 'none',
      threeadd: 'none',
      cameralist: [],
      roomlist: [],
      iscoption: [],
      addnum: 1,
      disthree: 'none',
      disone: 'none',
      distwo: 'none',
      disfour: 'none',
      iscplatformid: '',
      disfive: 'none',
      iscplatformdis: 'none',
      roomshow: 'none',
      treeData: [],
      type: null,
      serial: null,
      stream: null,
      deviceIp: null,
      port: null,
      account: null,
      password: null,
      roomId: null,
      iscplatform: [],
      tabvalue: '1',
      videoListDataSource: [
        {
          bbox: 0.5,
          cover: "/mnt/detection/cover/41.jpg",
          gmtcreate: "2020-07-16 10:32:37",
          id: 41,
          indexCode: "ccf168dc17fb4c888ec9a242c674ee6d",
          iscId: 2,
          mode: 0,
          name: "主9F消毒间",
          onlinestatus: true,
          roomId: 1,
          roomName: "主9F消毒间",
          siteId: 1,
          siteName: "郑州大酒店",
          streams: "http://39.107.227.244:83/openUrl/XIHXm8w/live.m3u8",
          type: 3,
          xmax: 640,
          xmin: 129,
          ymax: 360,
          ymin: 0,
        }, {
          bbox: 0.5,
          cover: "/mnt/detection/cover/43.jpg",
          gmtcreate: "2020-07-16 10:46:45",
          id: 43,
          indexCode: "8fff02a0ffd74947b46eb21a9ba20b3c",
          iscId: 2,
          mode: 0,
          name: "主15F消毒间",
          onlinestatus: true,
          roomId: 3,
          roomName: "主15F消毒间",
          siteId: 1,
          siteName: "郑州大酒店",
          streams: "http://39.107.227.244:83/openUrl/XplxJ3G/live.m3u8",
          type: 3,
          xmax: 640,
          xmin: 96,
          ymax: 360,
          ymin: 0,
        }
      ],
      onlines: [{
        title: '序列号',
        dataIndex: 'serial',
      }, {
        title: '状态',
        dataIndex: 'status',
        render: (text, record, index) => {
          if (text === true) {
            return (
              <div>
                <a onClick={() => this.showonline(text, record, index)} style={{ color: 'green' }}
                >在线</a>
              </div>
            )
          }
          if (text === false) {
            return (
              <div>
                <a onClick={() => this.showonline(text, record, index)} style={{ color: 'red' }}
                >离线</a>
              </div>
            )
          }
        }
      }, {
        title: '时间',
        dataIndex: 'date',
      }],
    };


    this.isclistcolumns = [

      {
        title: "摄像头名称",
        dataIndex: "cameraName",
        key: 'cameraName',
      }, {
        title: "摄像头类型",
        dataIndex: "cameraTypeName",
        key: 'cameraTypeName',
      }, {
        title: "IndexCode",
        dataIndex: "cameraIndexCode",
        key: 'cameraIndexCode',
      }, {
        title: "创建时间",
        dataIndex: "createTime",
        key: 'createTime',
        render: (text, record, index) => {
          return (
            <div>
              {moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss')}
            </div>
          )
        }
      },
    ];



    this.handleColumns = [
      {
        title: "设备ID",
        dataIndex: "id",
        key: 'roomName',
      }, {
        title: "单位名称",
        dataIndex: "siteName",
        key: 'siteName',
      },
      {
        title: "联网状态",
        dataIndex: "onlinestatus",
        key: 'onlinestatus',
        render: (text, record, index) => {
          if (text === true) {
            return (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <a onClick={() => this.showonline(text, record, index)} style={{ color: '#08c04d' }}
                > <span className="circle"></span> 在线</a>
              </div>
            )
          }
          if (text === false) {
            return (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <a onClick={() => this.showonline(text, record, index)} style={{ color: '#e72e2e' }}
                ><span className="circle1"></span> 离线</a>
              </div>
            )
          }
        }
      }, {
        title: "实时画面",
        dataIndex: "streams",
        key: 'streams',
        render: (text, record, index) => {
          if (record.onlinestatus === true) {
            return (
              <div onClick={() => this.findvideo(text, record, index)} style={{ color: '#40a9ff', cursor: 'pointer' }} >
                查看
              </div>
            )
          } else {
            return (
              <div style={{ color: '#40a9ff', cursor: 'pointer' }} >
                暂无
              </div>
            )
          }
        }
      },
      {
        title: "添加时间",
        dataIndex: "gmtcreate",
        key: 'gmtcreate',
      }, {
        title: "备注",
        dataIndex: "remark",
        key: 'remark',
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        render: (text, record, index) => {
          return (
            <div>
              <span style={{ marginLeft: '20px' }} onClick={() => this.onDelete(text, record, index)}>
                <a><img src={require('./delete.png')} alt="" /></a>
              </span>
            </div>
          );
        }
      }
    ];

    if (localStorage.getItem("type") === "2" || localStorage.getItem("type") === "3") {
      this.nodeInfoTableColumns = [
        {
          title: "设备ID",
          dataIndex: "id",
          key: 'roomName',
        }, {
          title: "单位名称",
          dataIndex: "siteName",
          key: 'siteName',
        }, {
          title: "设备位置",
          dataIndex: "roomName",
          key: 'roomName',
        },
        {
          title: "联网状态",
          dataIndex: "onlinestatus",
          key: 'onlinestatus',
          render: (text, record, index) => {
            if (text === true) {
              return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <a onClick={() => this.showonline(text, record, index)} style={{ color: '#08c04d' }}
                  > <span className="circle"></span> 在线</a>
                </div>
              )
            }
            if (text === false) {
              return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <a onClick={() => this.showonline(text, record, index)} style={{ color: '#e72e2e' }}
                  ><span className="circle1"></span> 离线</a>
                </div>
              )
            }
          }
        }, {
          title: "实时画面",
          dataIndex: "streams",
          key: 'streams',
          render: (text, record, index) => {
            if (record.onlinestatus === true) {
              return (
                <div onClick={() => this.findvideo(text, record, index)} style={{ color: '#40a9ff', cursor: 'pointer' }} >
                  查看
                </div>
              )
            } else {
              return (
                <div style={{ color: '#40a9ff', cursor: 'pointer' }} >
                  暂无
                </div>
              )
            }
          }
        },
        {
          title: "添加时间",
          dataIndex: "gmtcreate",
          key: 'gmtcreate',
        }
      ];
    } else {
      this.nodeInfoTableColumns = [
        {
          title: "设备ID",
          dataIndex: "id",
          key: 'roomName',
        }, {
          title: "单位名称",
          dataIndex: "siteName",
          key: 'siteName',
        }, {
          title: "设备位置",
          dataIndex: "roomName",
          key: 'roomName',
        },
        {
          title: "联网状态",
          dataIndex: "onlinestatus",
          key: 'onlinestatus',
          render: (text, record, index) => {
            if (text === true) {
              return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <a onClick={() => this.showonline(text, record, index)} style={{ color: '#08c04d' }}
                  > <span className="circle"></span> 在线</a>
                </div>
              )
            }
            if (text === false) {
              return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <a onClick={() => this.showonline(text, record, index)} style={{ color: '#e72e2e' }}
                  ><span className="circle1"></span> 离线</a>
                </div>
              )
            }
          }
        }, {
          title: "实时画面",
          dataIndex: "streams",
          key: 'streams',
          render: (text, record, index) => {
            if (record.onlinestatus === true) {
              return (
                <div onClick={() => this.findvideo(text, record, index)} style={{ color: '#40a9ff', cursor: 'pointer' }} >
                  查看
                </div>
              )
            } else {
              return (
                <div style={{ color: '#40a9ff', cursor: 'pointer' }} >
                  暂无
                </div>
              )
            }
          }
        }
        , {
          title: "参数设置",
          dataIndex: "cover",
          key: 'roomId',
          render: (text, record, index) => {
            return (
              <div style={{ color: this.state.typecolor, cursor: 'pointer' }} onClick={() => this.parameter(text, record, index)}>
                <span>查看</span>
              </div>
            )
          }
        },
        {
          title: "添加时间",
          dataIndex: "gmtcreate",
          key: 'gmtcreate',
        },
        {
          title: '操作',
          dataIndex: 'id',
          key: 'id',
          render: (text, record, index) => {
            // const editable = this.isEditing(record);
            return (
              <div>
                <span style={{ marginLeft: '20px' }} onClick={() => this.onDelete(text, record, index)}>
                  <a><img src={require('./delete.png')} alt="" /></a>
                </span>
              </div>
            );
          }
        }
      ];
    }


  }

  componentWillMount() {
    document.title = "摄像头管理";
  }

  componentDidMount() {

  }

  onChange = (date, dateString) => {
    console.log(date, dateString);
  }



  //网点选择
  handleChange = (value, b) => {
    this.setState({
      siteid: value,
    })
  }





  //删除摄像头
  deleteOk = (text, record, index) => {
    this.setState({
      deletevisible: false,
    })
  }


  //房间选择
  roomchange = (value) => {
    console.log(value)
    this.setState({
      roomId: value
    })
  }




  handleOk = () => {
    this.setState({
      visible: false,
    })
  }

  findvideo(text, record, index) {
    geisctUrl(
      record,
    ).then(res => {
      console.log(text)
      localStorage.setItem('videoid', res.data)
      localStorage.setItem('hotelnames', record.siteName)
      if (!res.data) {
        message.error('暂无视频')
      } else {
        window.location.href = "/app/onlinevideo"
      }
    });
  }



  parameter(text, record, index) {
    localStorage.setItem('cover', text)
    localStorage.setItem('cameraid', record.id)
    window.location.href = "/app/camera"
  }



  showModal = () => {
    this.setState({
      visible: true,
    })
    if (this.state.tabvalue === "2") {
      this.setState({
        cameratype: 2,
        roomdis: 'none',
        roomshow: 'block',
      })
    }
    if (this.state.tabvalue === "1") {
      this.setState({
        cameratype: 1,
        roomdis: 'block',
        roomshow: 'none',
      })
    }
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
      onlinevisible: false,
      visibles: false,
      oneadd: 'none',
      twoadd: 'none',
      threeadd: 'none',
      iscdis: 'none',
      addnum: 1,
      serial: undefined,
      deletevisible: false,
    });
  }

  onClose = (e) => {
    this.setState({
      iscvisible: false,
    });
  }


  socket = (text, record, index) => {
    if (localStorage.getItem("type") === "2" || localStorage.getItem("type") === "1") {

    } else {
      localStorage.setItem('socketid', text)
      this.setState({
        visibles: true,
      })
    }
  }

  state = { onlinevisible: false }
  showonline = (text, record, index) => {
    this.setState({
      onlinevisible: true,
    });
    getonlinestatus([
      record.serial,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          onlinelist: res.data.data,
        });
        if (res.data.data.length < 10) {
          this.setState({
            onlinepage: false
          })
        } else {
          this.setState({
            onlinepage: true
          })
        }
      }
    });
  }


  query = () => {

  }


  //手持式筛选
  handlequery = () => {

  }




  //设备位置选择
  addresschange = (e) => {
    console.log(e)
    this.setState({
      addresslist: e,
      cityid: e[0] === undefined ? null : e[0],
      areaid: e[1] === undefined ? null : e[1],
      siteId: e[2] === undefined ? null : e[2]
    });
  }


  //手持设备位置选择
  handleaddresschange = (e) => {
    console.log(e)
    this.setState({
      handleaddresslist: e,
      cityid: e[0] === undefined ? null : e[0],
      areaid: e[1] === undefined ? null : e[1],
      siteId: e[2] === undefined ? null : e[2]
    });
  }




  devicedata = (value) => {
    console.log(value)
    this.setState({
      devicedata: value
    })
  }

  macdata = (e) => {
    this.setState({
      macdata: e.target.value
    })
  }

  macdata1 = (e) => {
    this.setState({
      macdata1: e.target.value
    })
  }

  macdata2 = (e) => {
    this.setState({
      macdata2: e.target.value
    })
  }

  macdata3 = (e) => {
    this.setState({
      macdata3: e.target.value
    })
  }

  //摄像头列表
  iscquery = () => {
    if (this.state.iscplatformid === "") {
      message.error("请选择安防平台种类")
    } else {
      this.setState({
        iscvisible: true
      })
    }
  }

  

  //删除摄像头
  onDelete = (text, record, index) => {
    this.setState({
      deletevisible: true,
      camertid: record.id,
    })
  }
  //摄像头列表选择
  submitcamera = () => {
    this.setState({
      cameraname: this.state.selectedRowKeys.join(','),
      iscvisible: false,
    })
  }

  //视频流输入
  stream = (e) => {
    this.setState({
      stream: e.target.value
    })
  }

  //摄像头IP
  deviceIp = (e) => {
    this.setState({
      deviceIp: e.target.value
    })
  }

  //摄像头端口
  port = (e) => {
    this.setState({
      port: e.target.value
    })
  }

  //摄像头用户名
  account = (e) => {
    this.setState({
      account: e.target.value
    })
  }

  //摄像头密码
  password = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  //备注填写
  remarkchange = (e) => {
    this.setState({
      remark: e.target.value
    })
  }



  //设备类型选择
  typeonChange = (e) => {
    console.log(e.target.value)
    this.setState({
      cameratype: e.target.value
    }, function () {
      if (this.state.cameratype === 1) {
        this.setState({
          roomdis: 'block',
          roomshow: 'none',
        })
      } else {
        this.setState({
          roomdis: 'none',
          roomshow: 'block',
        })
      }
    })
  }


  callback = (value) => {
    this.setState({
      tabvalue: value
    }, function () {
      if (this.state.tabvalue === "2") {
        this.setState({
          cameratype: 2
        })
      }
      if (this.state.tabvalue === "1") {
        this.setState({
          cameratype: 1
        })
      }
    })


  }

  //关键字录入
  keytext = (e) => {
    this.setState({
      keytext: e.target.value
    })
  }


  //重置
  reset = () => {
    this.setState({
      cityid: undefined,
      areaid: undefined,
      siteId: undefined,
      addresslist: [],
      keytext: undefined,
    }, function () {
      this.query()
    })
  }


  render() {
    // console.log(this.state.AutoCompletedata)
    const prooptions = this.state.sitelist.map((province) => <Option key={province.id}  >{province.value}</Option>);
    // const cameratypelist = this.state.cameralist.map((province) => <Option key={province.type}  >{province.desc}</Option>);
    const isclistoption = this.state.iscplatform.map((province) => <Option key={province.id}  >{province.value}</Option>);
    const roomoption = this.state.roomlist.map((province) => <Option key={province.id}>{province.name}</Option>);
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      onSelect: this.onSelect,
      type: "radio",
    };

    return (
      <Layout>
        <Layout>
          <Content style={{ margin: "16px 16px" }} id="equipment">
            <Card title="设备管理-摄像头管理" headStyle={{ fontWeight: 'bold', fontSize: '18px' }} extra={<Button type="primary"
              style={{ background: '#0070CC', border: '1px solid #0070CC', marginRight: '20px', display: this.state.typenone }} onClick={this.showModal}
            >
              设备添加
            </Button>}>
              <Tabs defaultActiveKey="1" onChange={this.callback} value={this.state.tabvalue}>
                <TabPane tab="固定式" key="1">
                  <div className="gutter-example-nodemanage">
                    设备位置&nbsp;: &nbsp;&nbsp;&nbsp;
                <Cascader
                      fieldNames={{ label: 'name', value: 'adcode' }}
                      options={this.state.deviceList}
                      onChange={this.addresschange}
                      value={this.state.addresslist}
                      changeOnSelect
                      style={{ width: "350px", marginRight: '20px' }}
                      placeholder="选择酒店" />
                          关键字搜索&nbsp;: &nbsp;&nbsp;&nbsp;
                <Input placeholder="请输入关键字" style={{ width: '200px', marginRight: '20px' }}
                      value={this.state.keytext}
                      onChange={this.keytext}
                    />
                    <Button type="primary" onClick={this.query}>查询</Button>
                  </div>
                  <div style={{ marginTop: 20 }}>

                    <Table
                      dataSource={this.state.videoListDataSource}
                      columns={this.nodeInfoTableColumns}
                      pagination={false}
                    />
                  </div>
                </TabPane>
                <TabPane tab="手持式" key="2" style={{ minHeight: "700px", marginLeft: '20px' }}>
                  <div className="gutter-example-nodemanage">
                    选择酒店&nbsp;: &nbsp;&nbsp;&nbsp;
                    <Cascader
                      fieldNames={{ label: 'name', value: 'adcode' }}
                      options={this.state.deviceList}
                      onChange={this.handleaddresschange}
                      value={this.state.handleaddresslist}
                      changeOnSelect
                      style={{ width: "350px", marginRight: '20px' }}
                      placeholder="选择酒店" />
                    <Button type="primary" onClick={this.handlequery}>查询</Button>
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <Table
                      dataSource={this.state.addhandheldSource}
                      columns={this.handleColumns}
                      pagination={false}
                    />
                  </div>
                </TabPane>
              </Tabs>

            </Card>
          </Content>
          <Modal
            title="上下线记录"
            width='500px'
            destroyOnClose
            // maskStyle={{ background: "black", opacity: '0.1' }}
            visible={this.state.onlinevisible}
            centered
            footer={null}
            onCancel={this.handleCancel}
            mask={false}
          >


            <Table
              bordered
              dataSource={this.state.onlinelist}
              columns={this.state.onlines}
              pagination={this.state.onlinepage}
              rowClassName="editable-row"
            />
          </Modal>
          <Modal
            title="添加设备"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确认"
            width="400px"
            destroyOnClose
            mask={false}
          >
            <div>
              <span>设备类型：</span>
              <Radio.Group onChange={this.typeonChange} value={this.state.cameratype}>
                <Radio value={1}>固定式</Radio>
                <Radio value={2}>手持式</Radio>
              </Radio.Group>
            </div>
            <div style={{ marginTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>ISC平台列表：
               {/* <Button type="primary" onClick={this.iscquery} >摄像头列表</Button> */}
              </div>
              <Select
                style={{ width: '100%', marginBottom: "10px", marginTop: '10px' }}
                placeholder="请选择ISC平台"
                onChange={this.iscchange}
              >
                {isclistoption}
              </Select>
            </div>
            <div style={{ display: this.state.disfour }}>
              <span>设备类型：</span>
              <Select
                style={{ width: '100%', marginBottom: "10px", marginTop: '10px' }}
                placeholder="请选择设备类型"
                onChange={this.typeChanges}
                value={this.state.equtype}
              >
                <Option key="IPC">IPC</Option>
                <Option key="NVR">NVR</Option>
              </Select>
            </div>
            <div>
              <span>摄像头：    </span>
              <Search
                placeholder="请选择摄像头"
                enterButton="摄像头列表"
                size="middle"
                onSearch={this.iscquery}
                value={this.state.cameraname}
                style={{ width: '100%', marginBottom: "5px", marginTop: '5px', fontSize: '14px' }}
              />
            </div>
            <div style={{ display: this.state.disfive }}>
              <span>序列号：</span>
              <Input placeholder="请输入序列号"
                style={{ width: '100%', marginBottom: "5px", marginTop: '5px', }}
                value={this.state.serial}
                onChange={this.serial}
                autoComplete="off" />
            </div>

            <div style={{ display: this.state.disfive }}>
              <span>通道号：</span>
              <Input placeholder="请输入通道号"
                style={{ width: '100%', marginBottom: "5px", marginTop: '5px' }}
                autoComplete="off"
              />
            </div>
            <div style={{ display: this.state.disthree }}>
              <span>视频流：</span>
              <Input placeholder="请输入视频流"
                style={{ width: '100%', marginBottom: "5px", marginTop: '5px' }}
                onChange={this.stream}
                value={this.state.stream}
                autoComplete="off"
              />
            </div>
            <div>
              <span>所属酒店：</span>
              <Select
                style={{ width: '100%', marginBottom: "10px", marginTop: '10px' }}
                placeholder="请选择所属酒店"
                onChange={this.handleChanges}
              >
                <Option key={1}  >郑州大酒店</Option>
              </Select>
            </div>

            <div style={{ display: this.state.roomdis }}>
              <span>所属房间：</span>
              <Select
                style={{ width: '100%', marginBottom: "10px", marginTop: '10px' }}
                placeholder="请选择所属房间"
                onChange={this.roomchange}
              >
                {roomoption}
              </Select>
            </div>
            <div style={{ display: this.state.roomshow }}>
              <span>备注：</span>
              <TextArea rows={4} style={{ width: '100%', marginBottom: "10px", marginTop: '10px' }}
                onChange={this.remarkchange}
                value={this.state.remark}
                placeholder="请输入备注（选填）"
              />
            </div>
          </Modal>
          <Modal
            title="删除摄像头"
            visible={this.state.deletevisible}
            onOk={this.deleteOk}
            width="400px"
            okText="删除"
            centered
            onCancel={this.handleCancel}
          >
            您确认要删除该摄像头吗？
          </Modal>
          <Drawer
            title="摄像头列表"
            width={1100}
            onClose={this.onClose}
            visible={this.state.iscvisible}
            bodyStyle={{ paddingBottom: 80 }}
          >
            <div className="drawermain">
              <div className="treelist">
                <DirectoryTree
                  multiple
                  defaultExpandAll
                  onSelect={this.onSelects}
                  // onExpand={onExpand}
                  treeData={this.state.treeData}
                />
              </div>
              <div style={{ width: '650px' }}>
                < Table
                  // components={components} 
                  dataSource={this.state.iscdata}
                  rowSelection={rowSelection}
                  columns={this.isclistcolumns}
                  bordered
                />
                <div style={{ textAlign: 'right', marginTop: '20px' }}>
                  <Button type="primary" onClick={this.submitcamera}>确定</Button>
                </div>
              </div>
            </div>

          </Drawer>
        </Layout >
      </Layout >
    );
  }
}

export default App;
