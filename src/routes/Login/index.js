import React from "react";
import BGParticle from "../../utils/BGParticle";
import { notification } from "antd";
import "./style.css";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react/index";
import "animate.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

@withRouter
@inject("appStore")
@observer
class Login extends React.Component {
  state = {
    showBox: "login", //展示当前表单
    url:
      "https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/bg1.jpg?raw=true" //背景图片
  };

  componentDidMount() {
    const isLogin = this.props.appStore;
    if (isLogin) {
      this.props.history.go(1); //当浏览器用后退按钮回到登录页时，判断登录页是否登录，是登录就重定向上个页面
      // this.props.appStore.toggleLogin(false) //也可以设置退出登录
    }
    this.initPage();
  }
  //组件的卸载和数据的销毁
  componentWillUnmount() {
    this.particle && this.particle.destory();
    notification.destroy();
  }
  //载入页面时的一些处理
  initPage = () => {
    this.props.appStore.initUsers();
    this.particle = new BGParticle("backgroundBox");
    this.particle.init();
    notification.open({
      message: (
        <ul>
          <li>初始账号：admin</li>
          <li>初始密码：admin</li>
        </ul>
      ),
      duration: 0,
      className: "login-notification"
    });
  };
  //切换showbox
  switchShowBox = box => {
    this.setState({
      showBox: box
    });
  };

  render() {
    const { showBox } = this.state;
    return (
      <div id="login-page">
        <div>
          <div id="backgroundBox" style={styles.backgroundBox} />
          <div className="container">
            <LoginForm
              className={showBox === "login" ? "box showBox" : "box hiddenBox"}
              switchShowBox={this.switchShowBox}
            />
            <RegisterForm
              className={
                showBox === "register" ? "box showBox" : "box hiddenBox"
              }
              switchShowBox={this.switchShowBox}
            />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  backgroundBox: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    // backgroundImage: 'url(https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/bg5.jpg?raw=true)',
    backgroundImage:
      "url(https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/bg1.jpg?raw=true)",
    backgroundSize: "100% 100%",
    backgroundColor: "#565451",
    transition: "all .5s",
    background:
      "linear - gradient(230deg, rgb(0, 0, 0) 100 %), rgba(53, 57, 74, 0) 0 %"
  },
  focus: {
    // transform: 'scale(0.7)',
    width: "20px",
    opacity: 1
  },
  loadingBox: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  },
  loadingTitle: {
    position: "fixed",
    top: "50%",
    left: "50%",
    marginLeft: -45,
    marginTop: -18,
    color: "#000",
    fontWeight: 500,
    fontSize: 24
  }
};

export default Login;
