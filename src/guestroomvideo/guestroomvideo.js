import React from "react";
import {
  Table,
  Layout,
  Card,
  Button,
  Input,
  message,
  Cascader,
  Pagination,
  DatePicker,
} from "antd";
import {
  getregion,
  sitelist,
  gethandheld,
} from "../axios";
import "./guestroomvideo.css";
import moment from 'moment';

const { Content } = Layout;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoListDataSource: [],
      msg: true,
      site: undefined,
      name: undefined,
      begintime: undefined,
      endtime: undefined,
      hotellist: [],
      opentype: true,
      pdpage: false,
      indexs: 0,
      pageNum: 1,
      pageNumSize: 10,
      sitelist: {}
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
        title: "检测日期",
        dataIndex: "date",
        sorter: (a, b) => new Date(a) > new Date(b) ? 1 : -1,
        render: (text, record, index) => {
          return (
            <div>
              {moment(new Date(text.replace(/-/g, '/'))).format('YYYY-MM-DD')}
            </div>
          )
        }
      },
      {
        title: "保洁时长（分）",
        dataIndex: "worktime",
        render: (text, record, index) => {
          return (
            <div>
              {parseFloat(text / 60).toFixed(1)}
            </div>
          )
        }
      },
      {
        title: "摄像头名称",
        dataIndex: "cameraName",
      },
      // {
      //   title: "摄像头名称",
      //   dataIndex: "cameraName",
      // },
      {
        title: "查看回放",
        dataIndex: "id",
        render: (text, record, index) => {
          return (
            <div onClick={() => this.findback(text, record, index)} style={{ display: 'inline-block' }}  >
              <a href={this.state.export1} >
                查看
              </a>
            </div>
          )
        }
      },
      // {
      //   title: "详情",
      //   dataIndex: "id",
      //   render: (text, record, index) => {
      //     return (
      //       <div>
      //         <div onClick={() => this.findpicture(text, record, index)} style={{ display: 'inline-block' }} >
      //           <a href={this.state.export1} >
      //             图片下载
      //         </a>
      //         </div>
      //         <span onClick={() => this.findvideo(text, record, index)} style={{ color: '#40a9ff', cursor: 'pointer', marginLeft: '10PX' }} >
      //           视频播放
      //       </span>

      //       </div>
      //     )
      //   }
      // }
    ];
  }


  componentWillMount() {
    document.title = "视频监测-客房保洁";
  }

  componentDidMount() {

  }

  onChange = (date, dateString) => {
    console.log(date, dateString);
  }



  //查看回放
  findback = (text, record, index) => {
    console.log(record)
    if (record.picture === undefined) {
      message.error('暂无图片')
    } else {
      localStorage.setItem('backlist', record.picture)
      setTimeout(function () {
        window.location.href = "/app/backvideo";
      }, 1000);
    }
  }



  //时间选择
  timeonChange = (value, dateString) => {
    this.setState({
      begintime: moment(dateString[0]),
      endtime: moment(dateString[1]),
    });
  }


  tablechange = (a, b, c, d) => {
    localStorage.setItem('pagesize', a.current)
  }



  //酒店选择
  hotelchange = (value) => {
    this.setState({
      hotelid: value
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




  //关键字录入
  keytext = (e) => {
    this.setState({
      keytext: e.target.value
    })
  }

  render() {
    return (
      <Layout id="guestroomvideo">
        <Layout>
          <Content style={{ margin: "16px 16px" }} >
            <Card title="视频监测-客房保洁" headStyle={{ fontWeight: 'bold', fontSize: '18px' }}>
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
              <div style={{ marginTop: 20 }}>
                <Table
                  dataSource={this.state.videoListDataSource}
                  columns={this.nodeInfoTableColumns}
                  pagination={false}
                  onChange={this.tablechange}
                />
              </div>
              <div className="pageone">
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
