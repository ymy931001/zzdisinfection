import React from "react";
import {
  Table,
  Layout,
  Card,
  Button,
  Input,
  Cascader,
  DatePicker
} from "antd";
import {
  getregion,
  gethandheld,
  sitelist
} from "../axios";
import "./housereport.css";
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
      sitelist: {},
      hotellist: []
    };
    this.nodeInfoTableColumns = [
      {
        title: "酒店名称",
        dataIndex: "siteId",
        render: (text, record, index) => {
          return (
            <div>
              {this.state.sitelist[text]}
            </div>
          )
        }
      },
      {
        title: "摄像头名称",
        dataIndex: "cameraName",
        render: (text, record, index) => {
          if (text === undefined || text === null) {
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
        title: "监测日期",
        dataIndex: "date",
        render: (text, record, index) => {
          return (
            <div>
              {moment(new Date(text.replace(/-/g, '/'))).format('YYYY-MM-DD')}
            </div>
          )
        }
      },
      {
        title: "监测报告",
        dataIndex: "id",
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
    document.title = "监测报告-客房保洁";
  }

  componentDidMount() {


  }


  

  onChange = (date, dateString) => {
    console.log(date, dateString);
  }


  //查看报告
  lookreport = (text, record, index) => {
    console.log(record)
    localStorage.setItem('reportdate', moment(new Date(record.date)).format('YYYY-MM-DD'))
    localStorage.setItem('reportsite', record.siteId)
    localStorage.setItem('cameraid', record.cameraId)
    localStorage.setItem('cameraName', record.cameraName)
    setTimeout(function () {
      window.location.href = "/app/housereportdetail";
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
            <Card title="监测报告-客房保洁" headStyle={{ fontWeight: 'bold', fontSize: '18px' }}>
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
                </div>
              </div>
              <div style={{ marginTop: '20px' }}>
                <Table
                  dataSource={this.state.videoListDataSource}
                  columns={nodeInfoTableColumns}
                  pagination={this.state.page}
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
