import React, { Component } from 'react';
import { } from 'antd';
import './App.css';
import {
  Layout,
  Menu,
  Icon,
  // Card,
  ConfigProvider
} from "antd";
import { Route, Switch, Link } from 'react-router-dom';
import { BankOutlined, RobotOutlined, PushpinOutlined } from '@ant-design/icons';
import {
  getsysmenu,
} from "./axios";


import warning from "./warning/warning";
import picture from "./picture/picture";
import video from "./video/video";
import equipment from "./equipment/equipment";
import user from "./user/user";
import adduser from "./adduser/adduser";
import hotel from "./hotel/hotel";
import addhotel from "./addhotel/addhotel";
import onlinevideo from "./onlinevideo/onlinevideo";
import camera from "./camera/camera";
import socket from "./socket/socket";
import parameter from "./parameter/parameter";
import blockchain from "./blockchain/blockchain";
import sitestatistics from "./sitestatistics/sitestatistics";
import areastatistics from "./areastatistics/areastatistics";
import cleaner from "./cleaner/cleaner";
import houseroom from "./houseroom/houseroom";
import addroom from "./addroom/addroom";
import cuplistpc from "./cuplistpc/cuplistpc";
import monthstatistics from "./monthstatistics/monthstatistics";
import hotelvideo from "./hotelvideo/hotelvideo";
import cinemavideo from "./cinemavideo/cinemavideo";
import hotelplace from "./hotelplace/hotelplace";
import scene from "./scene/scene";
import role from "./role/role";
import hotelreport from "./hotelreport/hotelreport";
import publicreport from "./publicreport/publicreport";
import power from "./power/power";
import socketdata from "./socketdata/socketdata";
import addargs from "./addargs/addargs";
import guestroomvideo from "./guestroomvideo/guestroomvideo";
import housereport from "./housereport/housereport";
import examine from "./examine/examine";
import interfaces from "./interfaces/interfaces";
import housereportdetail from "./housereportdetail/housereportdetail";
import erweima from "./erweima/erweima";
import sederweimalist from "./sederweimalist/sederweimalist";
import backvideo from "./backvideo/backvideo";

import Headers from './headers';
import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { Content, Sider, Header } = Layout;
const SubMenu = Menu.SubMenu;


class App extends Component {
  rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub6', 'sub7', 'sub10', 'sub11'];

  state = {
    // collapsed: true,
    mode: "inline",
    usertypenone: 'block',
    disnone: "none",
    data1: [],
    data2: [],
    data3: [],
    data4: [],
    data5: [],
    data6: [],
    openKeys: [localStorage.getItem("menuline")],
    // firstHide: false // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
  };

  componentwillMount = () => {


  }
  componentDidMount() {
    if (localStorage.getItem("type") !== '1') {
      this.setState({
        lsdis: 'none',
      })
    }
    getsysmenu().then(res => {
      if (res.data && res.data.message === "success") {
        this.setState({
          powerlist: res.data.data,
        }, function () {
          var arrs = this.state.powerlist
          var data1 = []
          var data2 = []
          var data3 = []
          var data4 = []
          var data5 = []
          var data6 = []
          for (var i in arrs) {
            if (arrs[i].id === 85 || arrs[i].id === 86 || arrs[i].id === 87 || arrs[i].id === 96 || arrs[i].id === 94) {
              data1.push(arrs[i])
            }
            if (arrs[i].id === 89 || arrs[i].id === 90 || arrs[i].id === 91 || arrs[i].id === 92 || arrs[i].id === 93 || arrs[i].id === 97) {
              data2.push(arrs[i])
            }
            if (arrs[i].id === 4 || arrs[i].id === 9 || arrs[i].id === 15 || arrs[i].id === 16) {
              data3.push(arrs[i])
            }
            if (arrs[i].id === 6 || arrs[i].id === 7) {
              data4.push(arrs[i])
            }
            if (arrs[i].id === 2 || arrs[i].id === 74) {
              data5.push(arrs[i])
            }
            if (arrs[i].id === 10) {
              data6.push(arrs[i])
            }
          }
          this.setState({
            data1: data1,
            data2: data2,
            data3: data3,
            data4: data4,
            data5: data5,
            data6: data6,
          })
        })
      }
    });


  }

  menuClick = e => {
    console.log(e)
    localStorage.setItem("menuid", e.key)
    localStorage.setItem("menuline", e.keyPath[1])

  };


  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    const powers1 = this.state.data1.map((province, id) => <Menu.Item key={province.id}><Link to={province.path}>
      <span> {province.name}</span>
    </Link></Menu.Item>)
    const powers2 = this.state.data2.map((province, id) => <Menu.Item key={province.id}><Link to={province.path}>
      <span> {province.name}</span>
    </Link></Menu.Item>)
    const powers3 = this.state.data3.map((province, id) => <Menu.Item key={province.id}><Link to={province.path}>
      <span> {province.name}</span>
    </Link></Menu.Item>)
    const powers4 = this.state.data4.map((province, id) => <Menu.Item key={province.id}><Link to={province.path}>
      <span> {province.name}</span>
    </Link></Menu.Item>)
    const powers5 = this.state.data5.map((province, id) => <Menu.Item key={province.id}><Link to={province.path}>
      <span> {province.name}</span>
    </Link></Menu.Item>)
    const powers6 = this.state.data6.map((province, id) => <Menu.Item key={province.id}><Link to={province.path}>
      <BankOutlined /><span>{province.name}</span>
    </Link></Menu.Item>)
    return (
      <ConfigProvider locale={zh_CN}>
        <div>
          <Header style={{ display: this.state.mobiledis }}>
            <Headers />
          </Header>
          <Layout>
            <Sider
              collapsed={this.state.collapsed}
              style={{ display: this.state.mobiledis }}
            >
              <Menu theme="dark"
                onClick={this.menuClick}
                mode="inline"
                defaultSelectedKeys={['85']}
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                selectedKeys={[localStorage.getItem("menuid")]}
              >
                {/* <Menu.Item key="0"
                >
                  <a href={"http://datav.aliyuncs.com/share/95aef6059199ee86ef8610153005e68e?Authorization=" + localStorage.getItem('authorization')} style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                    <Icon type="dashboard" /><span>仪表盘</span>
                  </a>
                </Menu.Item> */}


                <SubMenu
                  key="sub10"
                  title={
                    <span>
                      <Icon type="bar-chart" />
                      <span>运行概览</span>
                    </span>
                  }
                  // style={{ display: this.state.lsdis }}
                >
                  <Menu.Item key="100"
                  >
                    <Link to="/app/areastatistics">
                      <span>区域概览</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="102"
                  >
                    <Link to="/app/sitestatistics">
                      <span>酒店概览</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="103"
                  >
                    <Link to="/app/warning">
                      <span>报警监测</span>
                    </Link>
                  </Menu.Item>
                </SubMenu>




                <SubMenu
                  key="sub7"
                  style={{ display: this.state.usertypenone }}
                  title={
                    <span>
                      <Icon type="file-exclamation" />
                      <span>监测报告</span>
                    </span>
                  }
                >
                  {powers1}
                  {/* <Menu.Item key="37"
                    style={{ display: this.state.lsdis }}
                  >
                    <Link to="/app/publicreport">
                      <span>医废管理</span>
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="38"
                  >
                    <Link to="/app/hotelreport">
                      <span>酒店消毒</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="40" style={{ display: this.state.lsdis }}
                  >
                    <Link to="/app/fenzreport">
                      <span>分诊监控</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="41" style={{ display: this.state.lsdis }}
                  >
                    <Link to="/app/hotelreport">
                    <span>影院消毒</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="42" style={{ display: this.state.lsdis }}
                  >
                    <Link to="/app/hotelreport">
                    <span>医院消毒</span>
                    </Link>
                  </Menu.Item> */}
                </SubMenu>

                <SubMenu
                  key="sub6"
                  title={
                    <span>
                      <Icon type="video-camera" />
                      <span>视频监测</span>
                    </span>
                  }
                  style={{ display: this.state.usertypenone }}
                >
                  {powers2}
                </SubMenu>



                <Menu.Item key="49"
                >
                  <Link to="/app/socketdata">
                    <RobotOutlined />
                    <span>插座监测</span>
                  </Link>
                </Menu.Item>
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="home" />
                      <span>网点管理</span>
                    </span>
                  }
                  style={{ display: this.state.usertypenone }}
                >
                  {powers3}
                
                </SubMenu>



                {powers6}
              



                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="laptop" />
                      <span>设备管理</span>
                    </span>
                  }
                  style={{ display: this.state.usertypenone }}
                >
                  {powers4}
                 
                </SubMenu>




              



                {/* <Menu.Item key="59"
                  style={{ display: this.state.lsdis }}
                >
                  <Link to="/app/examine">
                    <PushpinOutlined />
                    <span>审核管理</span>
                  </Link>
                </Menu.Item> */}

                <SubMenu
                  key="sub3"
                  title={
                    <span>
                      <Icon type="user" />
                      <span>账号管理</span>
                    </span>
                  }
                  style={{ display: this.state.lsdis }}
                >
                  {powers5}
               
                </SubMenu>

              </Menu>
            </Sider>

            <Layout   >
              <Content id="Farmer">
                <Switch>
                  <Route exact path='/app' component={hotelreport} />
                  <Route path="/app/warning" component={warning} />
                  <Route path="/app/picture" component={picture} />
                  <Route path="/app/video" component={video} />
                  <Route path="/app/equipment" component={equipment} />
                  <Route path="/app/user" component={user} />
                  <Route path="/app/adduser" component={adduser} />
                  <Route path="/app/hotel" component={hotel} />
                  <Route path="/app/addhotel" component={addhotel} />
                  <Route path="/app/onlinevideo" component={onlinevideo} />
                  <Route path="/app/camera" component={camera} />
                  <Route path="/app/socket" component={socket} />
                  <Route path="/app/parameter" component={parameter} />
                  <Route path="/app/blockchain" component={blockchain} />
                  <Route path="/app/sitestatistics" component={sitestatistics} />
                  <Route path="/app/areastatistics" component={areastatistics} />
                  <Route path="/app/cleaner" component={cleaner} />
                  <Route path="/app/houseroom" component={houseroom} />
                  <Route path="/app/addroom" component={addroom} />
                  <Route path="/app/cuplistpc" component={cuplistpc} />
                  <Route path="/app/monthstatistics" component={monthstatistics} />
                  <Route path="/app/hotelvideo" component={hotelvideo} />
                  <Route path="/app/cinemavideo" component={cinemavideo} />
                  <Route path="/app/hotelplace" component={hotelplace} />
                  <Route path="/app/scene" component={scene} />
                  <Route path="/app/role" component={role} />
                  <Route path="/app/power" component={power} />
                  <Route path="/app/publicreport" component={publicreport} />
                  <Route path="/app/hotelreport" component={hotelreport} />
                  <Route path="/app/socketdata" component={socketdata} />
                  <Route path="/app/addargs" component={addargs} />
                  <Route path="/app/guestroomvideo" component={guestroomvideo} />
                  <Route path="/app/housereport" component={housereport} />
                  <Route path="/app/examine" component={examine} />
                  <Route path="/app/interfaces" component={interfaces} />
                  <Route path="/app/housereportdetail" component={housereportdetail} />
                  <Route path="/app/erweima" component={erweima} />
                  <Route path="/app/sederweimalist" component={sederweimalist} />
                  <Route path="/app/backvideo" component={backvideo} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </div>
      </ConfigProvider >



    )
  }
}

export default App;