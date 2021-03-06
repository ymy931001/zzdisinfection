import React from "react";
import {
  Table,
  Layout,
  Card,
  Button,
  Modal,
  DatePicker,
  Select,
  Tooltip
} from "antd";
import {
  siteStatistics,
  sitelist
} from "../axios";
import "./sitestatistics.css";
import moment from 'moment';
import { Link } from 'react-router-dom';


const { Content } = Layout;
const { RangePicker } = DatePicker;

const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';






class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoListDataSource: [],
      device_ip: null,
      sitelist: [{
        abnormalRoomCount: 4,
        // abnormalRooms: ["7楼洗消间", "6楼洗消间", "8楼洗消间", "9楼洗消间"],
        date: "2020-10-25 00:00:00",
        // detail: [{ "date": 1603555200000, "id": 2453, "name": "7楼洗消间", "readingVOS": [], "result": 2, "runtime": 0, "status": 5, "timePiars": [{ "end": 1603609180192, "start": 1603609083234 }, { "end": 1603638637113, "start": 1603638607082 }], "worktime": 126 }, { "date": 1603555200000, "id": 2454, "name": "6楼洗消间", "readingVOS": [], "result": 2, "runtime": 0, "status": 5, "timePiars": [{ "end": 1603586349470, "start": 1603586346467 }], "worktime": 3 }, { "date": 1603555200000, "id": 2473, "name": "10楼洗消间", "readingVOS": [], "result": 0, "runtime": 0, "status": 5, "worktime": 0 }, { "date": 1603555200000, "id": 2430, "name": "8楼洗消间", "readingVOS": [], "result": 2, "runtime": 0, "status": 5, "timePiars": [{ "end": 1603607989562, "start": 1603607808629 }], "worktime": 180 }, { "date": 1603555200000, "id": 2431, "name": "9楼洗消间", "readingVOS": [], "result": 2, "runtime": 0, "status": 5, "timePiars": [{ "end": 1603607386450, "start": 1603607367331 }, { "end": 1603613699717, "start": 1603613597805 }], "worktime": 120 }],
        housekeeping: 0,
        id: 294,
        qualifiedRoomCount: 0,
        rate: 0,
        roomCount: 2,
        runtime: 0,
        siteId: 23,
        siteName: "郑州大酒店",
        type: 0,
        unqualifiedRoomCount: 2,
        unqualifiedRooms: ["主15F消毒间", "主9F消毒间",],
        workCount: 0,
        worktime: 429,
      }, {
        abnormalRoomCount: 4,
        // abnormalRooms: ["7楼洗消间", "6楼洗消间", "8楼洗消间", "9楼洗消间"],
        date: "2020-10-24 00:00:00",
        // detail: [{ "date": 1603555200000, "id": 2453, "name": "7楼洗消间", "readingVOS": [], "result": 2, "runtime": 0, "status": 5, "timePiars": [{ "end": 1603609180192, "start": 1603609083234 }, { "end": 1603638637113, "start": 1603638607082 }], "worktime": 126 }, { "date": 1603555200000, "id": 2454, "name": "6楼洗消间", "readingVOS": [], "result": 2, "runtime": 0, "status": 5, "timePiars": [{ "end": 1603586349470, "start": 1603586346467 }], "worktime": 3 }, { "date": 1603555200000, "id": 2473, "name": "10楼洗消间", "readingVOS": [], "result": 0, "runtime": 0, "status": 5, "worktime": 0 }, { "date": 1603555200000, "id": 2430, "name": "8楼洗消间", "readingVOS": [], "result": 2, "runtime": 0, "status": 5, "timePiars": [{ "end": 1603607989562, "start": 1603607808629 }], "worktime": 180 }, { "date": 1603555200000, "id": 2431, "name": "9楼洗消间", "readingVOS": [], "result": 2, "runtime": 0, "status": 5, "timePiars": [{ "end": 1603607386450, "start": 1603607367331 }, { "end": 1603613699717, "start": 1603613597805 }], "worktime": 120 }],
        housekeeping: 60,
        id: 294,
        qualifiedRoomCount: 0,
        rate: 0,
        roomCount: 2,
        runtime: 0,
        siteId: 23,
        siteName: "郑州大酒店",
        type: 0,
        unqualifiedRoomCount: 2,
        unqualifiedRooms: ["主15F消毒间", "主9F消毒间",],
        workCount: 0,
        worktime: 329,
      }],
      allhotel: [],
      typenone: "inline-block",
      notaddress: [],
      unnormallist: [],
    };



    this.nodeInfoTableColumns = [
      {
        title: "酒店名称",
        dataIndex: "siteName",
        render: (text, record, index) => {
          return (
            <div style={{ cursor: 'pointer' }} onClick={() => this.sitechange(text, record, index)}>
              {text}
            </div>
          )
        }
      }, {
        title: <Tooltip title={'消毒人员每天累计工作时长'}>
          <span> 累计工作时长（分）</span>
        </Tooltip>,
        dataIndex: "worktime",
        // sorter: (a, b) => (Math.ceil(a.worktime / 60) / (a.qualifiedRoomCount)) > (Math.ceil(b.worktime / 60) / (b.qualifiedRoomCount)) ? 1 : -1,
        sorter: (a, b) => a.worktime - b.worktime,
        render: (text, record, index) => {
          return (
            <div>
              {(Math.ceil(text / 60)).toFixed(1)}
            </div>
          )
        }
      },
      {
        title: <Tooltip title={'消毒柜每天累计工作时长'}>
          <span> 累计运行时长（分）</span>
        </Tooltip>,
        dataIndex: "runtime",
        sorter: (a, b) => a.runtime - b.runtime,
        render: (text, record, index) => {
          return (
            <div>
              {Math.ceil(text / 60).toFixed(1)}
            </div>
          )
        }
      },
      {
        title: "保洁时长（分）",
        dataIndex: "housekeeping",
        // sorter: (a, b) => (Math.ceil(a.worktime / 60) / (a.aNum)) > (Math.ceil(b.worktime / 60) / (b.aNum)) ? 1 : -1,
        render: (text, record, index) => {
          return (
            <div>
              {(Math.ceil(text / 60)).toFixed(1)}
            </div>
          )
        }
      },
      {
        title: "消毒间数",
        dataIndex: "roomCount",
      },
      {
        title: "未达标",
        dataIndex: "unqualifiedRoomCount",
        render: (text, record, index) => {
          if (record.unqualifiedRooms) {
            if (record.unqualifiedRooms.length === 0) {
              return (
                <div>
                  无
                </div>
              )
            } else {
              return (
                <div>
                  <Tooltip placement="topLeft" title={record.unqualifiedRooms.join(',')}>
                    {/* <Link to="/app/hotelvideo" > */}
                    <span>
                      <a onClick={() => this.notstandard(text, record, index)}
                      >{text}</a></span>
                    {/* </Link> */}
                  </Tooltip>
                </div>
              )
            }
          } else {
            return (
              <div>
                无
              </div>
            )
          }
        }
      },
      // {
      //   title: "异常设备",
      //   dataIndex: "eNum",
      //   render: (text, record, index) =>
      //     <div>
      //       <a onClick={() => this.unnormal(text, record, index)}
      //       >{text}</a>
      //     </div>
      // },
      // {
      //   title: "消毒率",
      //   dataIndex: "rate",
      //   sorter: (a, b) => a.rate - b.rate,
      //   render: (text) => {
      //     return (
      //       <div>
      //         {text * 100 + "%"}
      //       </div>
      //     )
      //   }
      // },
      {
        title: "检测时间",
        dataIndex: "date",
        render: (text, record, index) => {
          return (
            <div>
              {moment(text).format("YYYY-MM-DD")}
            </div>
          )
        }
      },
    ];
  }


  componentWillMount() {

  }

  componentDidMount() {


  }

  onChange = (date, dateString) => {
    console.log(date, dateString);
  }

  notstandard = (text, record, index) => {
    console.log(JSON.parse(record.nDevice).join(','))
    localStorage.setItem('selecttype', "1")
    localStorage.setItem('testtime', moment(record.date).format("YYYY-MM-DD"))
    localStorage.setItem('sitename', record.siteName)
    localStorage.setItem('names', JSON.parse(record.nDevice).join(','))
    localStorage.removeItem('site');
    localStorage.removeItem('addresslist');
  }

  unnormal = (text, record, index) => {
    localStorage.setItem('eqsiteid', record.siteId)
    if (JSON.parse(record.eDevice).length === 0) {

    } else {
      var arr = []
      for (var i in JSON.parse(record.eDevice)) {
        arr.push({
          'value': JSON.parse(record.eDevice)[i]
        })
      }
      this.setState({
        unnormallist: arr,
        visibles: true,
      })
    }
  }


  handleCancel = () => {
    this.setState({
      visible: false,
      visibles: false,
    })
  }

  // nostandardhotel = (province) => {
  //   localStorage.setItem('name', province.value)
  //   localStorage.setItem('selecttype', "1")
  //   localStorage.removeItem('site');
  //   localStorage.removeItem('addresslist');
  // }

  unnormalclick = (province) => {
    localStorage.setItem('selecttype', "2")
    localStorage.setItem('eqname', province.value)
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




  //选择酒店
  hotelchange = (value) => {
    this.setState({
      hotelname: value
    })
  }
  render() {
    const options = this.state.allhotel.map((province) => <Option key={province.id}  >{province.name}</Option>);


    const unoptions = this.state.unnormallist.map((province) =>
      <span style={{ marginRight: '20px' }} onClick={() => this.unnormalclick(province)}>
        <Link to="/app/equipment" >
          <span>{province.value}</span>
        </Link>
      </span>
    );
    return (
      <Layout >
        <Layout>
          <Content style={{ margin: "16px 16px" }} >
            <Card title="运行概览-酒店概览" headStyle={{ fontWeight: 'bold', fontSize: '18px' }} >
              <div>
                <div style={{ marginBottom: '20px' }}>
                  <span className="titlemid">
                    酒店名称：
                </span>
                  <Select placeholder="请选择酒店名称" style={{ width: 230, marginRight: "20px" }}
                    onChange={this.hotelchange}
                    value={this.state.hotelname}
                  >
                    <Option key={1}  >郑州大酒店</Option>
                  </Select>
                  时间&nbsp;:
                    <RangePicker
                    style={{ marginLeft: '20px', marginRight: '20px' }}
                    format={dateFormat}
                    ranges={{ 今天: [moment().startOf('day'), moment().endOf('day')], '本月': [moment().startOf('month'), moment().endOf('month')] }}
                    onChange={this.timeonChange}
                  // value={[moment(this.state.begintime, dateFormat), moment(this.state.endtime, dateFormat)]}
                  />
                  <Button type="primary" onClick={this.query}>查询</Button>
                  <Button type="primary" onClick={this.reset}
                    style={{ background: 'white', border: '1px solid #999', color: "#999", marginLeft: '20px' }}>重置</Button>
                </div>
                <Table
                  dataSource={this.state.sitelist}
                  columns={this.nodeInfoTableColumns}
                  pagination={this.state.page}
                />
              </div>
            </Card>
          </Content>
          {/* <Modal
            title="未达标消毒间"
            visible={this.state.visible}
            width="500px"
            onCancel={this.handleCancel}
            footer={null}
            mask={false}
          >
            <div>
              {prooptions}
            </div>
          </Modal> */}
          <Modal
            title="异常设备"
            visible={this.state.visibles}
            width="400px"
            onCancel={this.handleCancel}
            footer={null}
            mask={false}
          >
            <div>
              {unoptions}
            </div>
          </Modal>
        </Layout>
      </Layout >
    );
  }
}

export default App;
