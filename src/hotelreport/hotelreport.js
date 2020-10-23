import React from "react";
import {
  Table,
  Layout,
  Card,
  Button,
  Input,
  Cascader,
  DatePicker,
  Pagination
} from "antd";
import {
  getregion,
  detectionService
} from "../axios";
import "./hotelreport.css";
import moment from 'moment';

const { Content } = Layout;
const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoListDataSource: [],
      device_ip: null,
      typenone: "inline-block",
      pageNum: 1,
      pageNumSize: 10,
      begintime: undefined,
      endtime: undefined,
    };
    this.nodeInfoTableColumns = [
      {
        title: "酒店名称",
        dataIndex: "siteName",
      },
      {
        title: "监控位置",
        dataIndex: "name",
        render: (text, record, index) => {
          return (
            <div>
              <a onClick={() => this.findroom(text, record, index)} style={{ color: '#666' }}>
                {text}
              </a>
            </div>
          )
        }
      },
      {
        title: "监测日期",
        dataIndex: "date",
        sorter: (a, b) => new Date(a) > new Date(b) ? 1 : -1,
        // defaultSortOrder: 'descend',
        render: (text, record, index) => {
          return (
            <div>
              {moment(new Date(text.replace(/-/g, '/'))).format('YYYY-MM-DD')}
            </div>
          )
        }
      },
      {
        title: "监测结果",
        dataIndex: "result",
        render: (text, record, index) => {
          if (text === 1) {
            return (
              <div>
                <span style={{ color: 'green' }}>已消毒</span>
              </div>
            )
          } else {
            return (
              <div>
                <span style={{ color: 'red' }}>未达标</span>
              </div>
            )
          }
        }
      },
      {
        title: "监测报告",
        dataIndex: "sceneId",
        render: (text, record, index) => {
          return (
            <div>
              <a onClick={() => this.lookreport(text, record, index)}>
                查看
              </a>
            </div>
          )
        }
      },
    ];


  }

  componentWillMount() {
    document.title = "酒店消毒监测报告";
  }

  componentDidMount() {
    getregion().then(res => {
      if (res.data && res.data.message === "success") {
        if (res.data.data.length !== 0) {
          for (var i in res.data.data[0].children) {
            for (var j in res.data.data[0].children[i].children) {
              for (var k in res.data.data[0].children[i].children[j].children) {
                if (res.data.data[0].children[i].children[j].children[k].children.length === 0) {
                  res.data.data[0].children[i].children[j].children[k].adcode = res.data.data[0].children[i].children[j].children[k].id
                  res.data.data[0].children[i].children[j].children[k].children = undefined
                }
              }
            }
          }
          this.setState({
            deviceList: res.data.data[0].children
          })
        } else {
          this.setState({
            deviceList: []
          })
        }
      }
    });


    this.detectionService()

  }

  detectionService = () => {
    detectionService([
      this.state.pageNum,
      this.state.pageNumSize,
      null,
      null,
      null,
      null,
      moment(new Date() - 3600 * 24 * 1000).format("YYYY-MM-DD")
    ]).then(res => {
      if (res.data && res.data.message === "success") {
        if (res.data.data === null) {
          this.setState({
            videoListDataSource: []
          })
        } else {
          this.setState({
            videoListDataSource: res.data.data.detectionVOList,
            total: res.data.data.total,
          })
        }
      }
    })
  }

  //房间搜索
  findroom = (text, record, index) => {
    this.setState({
      keytext: text
    })
    detectionService([
      this.state.pageNum,
      this.state.pageNumSize,
      null,
      null,
      null,
      null,
      this.state.endtime === undefined ? moment(new Date() - 3600 * 24 * 1000).format("YYYY-MM-DD") : moment(this.state.endtime).format('YYYY-MM-DD'),
      text
    ]).then(res => {
      if (res.data && res.data.message === "success") {
        if (res.data.data === null) {
          this.setState({
            videoListDataSource: []
          })
        } else {
          this.setState({
            videoListDataSource: res.data.data.detectionVOList,
            total: res.data.data.total,
          })
        }
      }
    })
  }


  onChange = (date, dateString) => {
    console.log(date, dateString);
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

  //查询
  query = () => {
    detectionService([
      this.state.pageNum,
      this.state.pageNumSize,
      this.state.cityid,
      this.state.areaid,
      this.state.siteId,
      this.state.begintime === undefined ? undefined : moment(this.state.begintime).format('YYYY-MM-DD'),
      this.state.endtime === undefined ? moment(new Date() - 3600 * 24 * 1000).format("YYYY-MM-DD") : moment(this.state.endtime).format('YYYY-MM-DD'),
      this.state.keytext,
    ]).then(res => {
      if (res.data && res.data.message === "success") {
        if (res.data.data === null) {
          this.setState({
            videoListDataSource: []
          })
        } else {
          this.setState({
            videoListDataSource: res.data.data.detectionVOList,
            total: res.data.data.total,
          })
        }
      }
    });
  }


  //分页

  pagechange = (page, num) => {
    console.log(page, num)
    console.log(this.state.endtime)
    this.setState({
      pageNum: page,
      pageNumSize: num,
    }, function () {
      detectionService([
        this.state.pageNum,
        this.state.pageNumSize,
        this.state.cityid,
        this.state.areaid,
        this.state.siteId,
        this.state.begintime === undefined ? undefined : moment(this.state.begintime).format('YYYY-MM-DD'),
        this.state.endtime === undefined ? moment(new Date() - 3600 * 24 * 1000).format("YYYY-MM-DD") : moment(this.state.endtime).format('YYYY-MM-DD'),
        this.state.keytext,
      ]).then(res => {
        if (res.data && res.data.message === "success") {
          if (res.data.data === null) {
            this.setState({
              videoListDataSource: []
            })
          } else {
            this.setState({
              videoListDataSource: res.data.data.detectionVOList,
              total: res.data.data.total,
            })
          }
        }
      })

    })
  }



  //查看报告
  lookreport = (text, record, index) => {
    console.log(text)
    console.log(record)
    localStorage.setItem('detectionId', record.id)
    localStorage.setItem('reportdate', moment(new Date(record.date)).format('YYYY-MM-DD'))
    localStorage.setItem('reportsite', record.siteId)
    localStorage.setItem('hotelname', record.siteName)
    localStorage.setItem('roomname', record.name)
    localStorage.setItem('reportroomId', record.roomId)
    localStorage.setItem('cameraid', record.cameraId)
    setTimeout(function () {
      window.location.href = "/app/hotelplace";
    }, 1000);
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


  //重置
  reset = () => {
    this.setState({
      cityid: undefined,
      areaid: undefined,
      siteId: undefined,
      addresslist: [],
      keytext: undefined,
      begintime: undefined,
      endtime: undefined,
    }, function () {
      this.detectionService()
    })
  }

  //关键字录入
  keytext = (e) => {
    this.setState({
      keytext: e.target.value
    })
  }

  render() {
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
          <Content style={{ margin: "16px 16px" }} >
            <Card title="监测报告-杯具消毒" headStyle={{ fontWeight: 'bold', fontSize: '18px' }}>
              <div className="gutter-example-nodemanage">
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
                <div style={{ marginTop: "20px" }}>
                  关键字搜索&nbsp;: &nbsp;&nbsp;&nbsp;
                <Input placeholder="请输入关键字" style={{ width: '300px', marginRight: '20px' }}
                    value={this.state.keytext}
                    onChange={this.keytext}
                  />
                  <Button type="primary" onClick={this.query}>查询</Button>
                  <Button onClick={this.reset} style={{ marginLeft: '15px' }}>重置</Button>
                </div>
              </div>
              <div style={{ marginTop: '20px' }}>
                <Table
                  dataSource={this.state.videoListDataSource}
                  columns={nodeInfoTableColumns}
                  pagination={false}
                />
              </div>
              <div className="pageone" style={{ textAlign: 'right', marginTop: '10px' }}>
                <Pagination
                  onShowSizeChange={this.onShowSizeChange}
                  defaultCurrent={1}
                  onChange={this.pagechange}
                  total={this.state.total}
                  hideOnSinglePage={true}
                  current={this.state.pageNum}
                />
              </div>
            </Card>
          </Content>
        </Layout>
      </Layout >
    );
  }
}

export default App;
