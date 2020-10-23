import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'antd-mobile/dist/antd-mobile.css';
import SignIn from "./SignIn/SignIn";
import SignIns from "./SignIns/SignIns";
import {
  ConfigProvider
} from "antd";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import moment from 'moment';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

function requireAuthentication(Component) {
  // 组件有已登陆的模块 直接返回 (防止重新渲染)
  if (Component.AuthenticatedComponent) {
    return Component.AuthenticatedComponent;
  }

  // 创建验证组件
  class AuthenticatedComponent extends React.Component {
    state = {
      flag: false
    };
    componentWillMount() {
      this.checkAuth();

    }
    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }
    checkAuth() {
      //判断缓存是否有token
      const token = localStorage.getItem("token");
      const reg = token ? true : null;
      if (reg) {
        //有token，重置flag
        this.setState({ flag: true });
      } else {
        let platform = localStorage.getItem('platform')
        console.log(platform)
        if (platform) {
          window.location.href = "/?" + platform;
          localStorage.removeItem('platform')
        } else {
          window.location.href = "/";
        }
      }
    }
    render() {
      return this.state.flag ? <Component {...this.props} /> : null;
    }
  }
  return AuthenticatedComponent;
}

// function SignupAuthentication(Component) {
//   // 组件有已登陆的模块 直接返回 (防止重新渲染)
//   if (Component.AuthSignupComponent) {
//     return Component.AuthSignupComponent;
//   }

//   // 创建验证组件
//   class AuthSignupComponent extends React.Component {
//     state = {
//       flag: false
//     };
//     componentWillMount() {
//       this.checkAuth();
//     }

//     componentWillReceiveProps(nextProps) {
//       this.checkAuth();
//     }

//     checkAuth() {
//       //判断缓存是否有token
//       const token = window.localStorage["token"];
//       const reg = token ? true : null;
//       if (!reg) {
//         //没有token转登录接口
//         this.setState({ flag: true });
//       } else {
//         window.location.href = "/app";
//       }
//     }

//     render() {
//       return this.state.flag ? <Component {...this.props} /> : null;
//     }
//   }
//   return AuthSignupComponent;
// }

ReactDOM.render(
  <Router>
    <ConfigProvider locale={zhCN}>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/SignIns" component={SignIns} />
        <Route path="/app" component={requireAuthentication(App)} />
      </Switch>
    </ConfigProvider>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
