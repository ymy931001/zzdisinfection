import React from "react";
import {
  Table,
  Layout,
  Card,
  Tabs,
  Modal,
  Input,
  message,
  Cascader,
  Button,
  DatePicker,
  Tooltip
} from "antd";

import {
  getalarm,
  addalarmRemark, getregion
} from "../axios";
import "./warning.css";
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';
const { Content } = Layout;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { RangePicker } = DatePicker;



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      otaInfoTableDataSource: [],
      otaModalVisible: null,
      begintime: undefined,
      endtime: undefined,
      warningListDataSource: [{
        date: "2020-09-08 00:00:00",
        gmtcreate: "2020-10-15 02:00:00",
        id: 100,
        message: "插座长期离线",
        roomId: 4,
        roomName: "主15F消毒间",
        siteId: 1,
        siteName: "郑州大酒店",
        status: false,
        type: 1,
      }, {
        date: "2020-09-08 00:00:00",
        gmtcreate: "2020-10-15 02:00:00",
        id: 100,
        message: "无杯具提交记录",
        roomId: 4,
        roomName: "主15F消毒间",
        siteId: 1,
        siteName: "郑州大酒店",
        status: false,
        type: 1,
      }],
      historydata: [{
        date: "2020-09-09 00:00:00",
        duration: 93,
        gmtcreate: "2020-1009 02:00:00",
        id: 97,
        message: "插座长期离线",
        object: "863493041067409",
        remark: "信号不好",
        roomId: 2,
        roomName: "主9F消毒间",
        siteId: 1,
        siteName: "郑州大酒店",
        status: true,
        type: 3,
      }]
    };
  }
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  componentWillMount() {

  }

  componentDidMount() {
    this.getalarm()

  }


  getalarm = () => {

  }


  //打开负责人说明
  explain = (text, record, index) => {
    this.setState({
      describevisible: true
    })
  }



  //关闭model
  handleCancel = () => {
    this.setState({
      describevisible: false,
    })
  }

  explainok = () => {
    this.setState({
      describevisible: false,
    })
  }

  //添加说明
  remarkchange = (e) => {
    this.setState({
      remark: e.target.value
    })
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


  //时间选择
  timeonChange = (value, dateString) => {
    console.log(dateString)
    if (dateString[0] === "") {
      this.setState({
        begintime: undefined
      })
    } else {
      this.setState({
        begintime: moment(dateString[0]),
      });
    }
    if (dateString[1] === "") {
      this.setState({
        endtime: undefined
      })
    } else {
      this.setState({
        endtime: moment(dateString[1]),
      });
    }
  }


  render() {
    const otaInfoTableColumns = [
      {
        title: "酒店名称",
        dataIndex: "siteName",
      },
      {
        title: "房间位置",
        dataIndex: "roomName",
        render: (text, record, index) => {
          if (!text) {
            return (
              <div>
                无
              </div>
            )
          } else {
            return (
              <div>
                {text}
              </div>
            )
          }
        }
      },
      {
        title: "报警原因",
        dataIndex: "message",
        render: (text, record, index) => {
          if (record.type === 3) {
            return (
              <div style={{ color: 'red', cursor: "pointer" }}>
                <Tooltip placement="topLeft" title={"离线时间：" + record.duration + "小时"}>
                  {text}
                </Tooltip>
              </div>
            )
          }
          else if (record.type === 0) {
            if (!record.duration) {
              return (
                <div style={{ color: 'red' }}>
                  {text}
                </div>
              )
            } else {
              return (
                <div style={{ color: 'red', cursor: "pointer" }}>
                  <Tooltip placement="topLeft" title={"未消毒天数：" + record.duration + "天"}>
                    {text}
                  </Tooltip>
                </div>

              )
            }

          }
          else {
            return (
              <div style={{ color: 'red' }} >
                {text}
              </div >
            )
          }

        }
      }, {
        title: "报警级别",
        dataIndex: "level",
        render: (text, record, index) => {
          if (text === 1) {
            return (
              <div style={{ color: 'red' }}>
                预报警
              </div>
            )
          }
          if (text === 2) {
            return (
              <div style={{ color: 'red' }}>
                报警
              </div>
            )
          }
          if (text === undefined) {
            return (
              <div>
                无
              </div>
            )
          }
        }
      },
      {
        title: "报警时间",
        dataIndex: "date",
        render: (text, record, index) => {
          if (text === null) {
            return (
              <div style={{ color: 'red' }}>
                暂无
              </div>
            )
          } else {
            return (
              <div style={{ color: 'green' }}>
                {moment(new Date(text)).format('YYYY-MM-DD')}
              </div>
            )
          }
        }
      }, {
        title: "异常说明",
        dataIndex: "remark",
        render: (text, record, index) => {
          if (text === null || text === undefined) {
            return (
              <div >
                <a onClick={() => this.explain(text, record, index)}>添加</a>
              </div>
            )
          } else {
            return (
              <div style={{ color: 'red' }}>
                {text}
              </div>
            )
          }
        }
      }

    ];
    return (
      <Layout>
        <Layout id="warning">
          <Content style={{ margin: "16px 16px" }} >
            <Card title="运行概览-报警监测" headStyle={{ fontWeight: 'bold', fontSize: '18px' }}>
              <div className="gutter-example-nodemanage" style={{ marginTop: '20px' }}>
                &nbsp;&nbsp;&nbsp;设备位置&nbsp;: &nbsp;&nbsp;&nbsp;
                <Cascader
                  fieldNames={{ label: 'name', value: 'adcode' }}
                  options={this.state.deviceList}
                  onChange={this.addresschange}

                  value={this.state.addresslist}
                  changeOnSelect
                  style={{ width: "350px", marginRight: '20px' }}
                  placeholder="选择酒店" />
                    时间&nbsp;:
                    <RangePicker
                  style={{ marginLeft: '20px', marginRight: '20px', width: '300px' }}
                  format={dateFormat}
                  ranges={{ 今天: [moment().startOf('day'), moment().endOf('day')], '本月': [moment().startOf('month'), moment().endOf('month')] }}
                  onChange={this.timeonChange}
                  value={[this.state.begintime, this.state.endtime]}
                />
                <Button type="primary" onClick={this.query}>查询</Button>
                <Button onClick={this.reset} style={{ marginLeft: '15px' }}>重置</Button>
              </div>
              <Tabs defaultActiveKey="1">
                <TabPane tab="当前" key="1">
                  <div style={{ marginTop: 5 }}>
                    <Table
                      dataSource={this.state.warningListDataSource}
                      columns={otaInfoTableColumns}
                      pagination={this.state.page}
                    />
                  </div>
                </TabPane>
                <TabPane tab="历史" key="2" style={{ minHeight: "700px" }}>
                  <div style={{ marginTop: 5 }}>
                    <Table
                      dataSource={this.state.historydata}
                      columns={otaInfoTableColumns}
                      pagination={this.state.pages}
                    />
                  </div>
                </TabPane>
              </Tabs>
            </Card>
          </Content>
          <Modal
            title="负责人说明"
            destroyOnClose
            onOk={this.explainok}
            visible={this.state.describevisible}
            centered
            width='400px'
            onCancel={this.handleCancel}
            mask={false}
          >
            <TextArea rows={4} style={{ width: '100%', height: '200px' }}
              onChange={this.remarkchange}
              value={this.state.remark}
              placeholder="请输入说明"
            />
          </Modal>

        </Layout>
      </Layout>
    );
  }
}

export default App;
