import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import {Platform, Alert, Linking} from 'react-native';
import {
  packageVersion,
  currentVersion,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
} from 'react-native-update';
import _updateConfig from '../update.json';
import actionTypes from './store/actionTypes';
// api
import api from './api/index';
import http from './services/Http';
global.api = api;
global.http = http;
//pages
import {TabNav, Pages} from './views/Views';
// 底部菜单路由
const tabNavigatorAttr = {
  initialRouteName: 'Film',
  tabBarComponent: BottomTabBar,
  tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
  swipeEnabled: true, // 是否可以左右滑动切换tab
  animationEnabled: true, // 切换页面时是否有动画效果
  lazy: true,
  tabBarOptions: {
    inactiveTintColor: '#808080',
    activeTintColor: '#597AEE',
    showIcon: true,
    labelStyle: {
      fontSize: 10,
    },
  },
};
const MainTabNavigator = createBottomTabNavigator(TabNav, tabNavigatorAttr);
// 程序主路由
const MainNavigator = createStackNavigator(
  {
    MainTab: {
      screen: MainTabNavigator,
    },
    ...Pages,
  },
  {
    initialRouteName: 'MainTab',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false, //手势控制页面切换
    },
  },
);
const AppContainer = createAppContainer(MainNavigator);

// 热更新key
const {appKey} = _updateConfig[Platform.OS];
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: [],
    };
  }

  async componentDidMount() {
    if (packageVersion !== currentVersion) {
      await this.checkUpdate();
    }

    if (!this.props.tabsData.length) {
      this.props.setUserInfo();
    }
  }
  doUpdate = async info => {
    try {
      const hash = await downloadUpdate(info);
      if(hash){
        Alert.alert('提示', '下载完毕,是否重启应用?', [
          {
            text: '是',
            onPress: () => {
              switchVersion(hash);
            },
          },
          {text: '否'},
          {
            text: '下次启动时',
            onPress: () => {
              switchVersionLater(hash);
            },
          },
        ]);
      }
    } catch (err) {
      Alert.alert('提示', '更新失败.');
    }
  };
  checkUpdate = async () => {
    // if (__DEV__) {
    //   // 开发模式不支持热更新，跳过检查
    //   return;
    // }
    let info;
    //没有苹果开发者账号 ios暂不支持热更新
    if(Platform.OS==='ios') return 
    try {
      info = await checkUpdate(appKey);
    } catch (err) {
      console.warn(err);
      return;
    }
    if (info.expired) {
      Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
        {
          text: '确定',
          onPress: () => {
            info.downloadUrl && Linking.openURL(info.downloadUrl);
          },
        },
      ]);
    } else if (info.update) {
      Alert.alert(
        '提示',
        '检查到新的版本' + info.name + ',是否下载?\n' + info.description,
        [
          {
            text: '是',
            onPress: () => {
              this.doUpdate(info);
            },
          },
          {text: '否'},
        ],
      );
    }
  };
  render() {
    return <AppContainer />;
  }
}

const mapStateToProps = state => {
  return {
    tabsData: state.account.tabsData,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    setUserInfo: () => {
      dispatch({
        type: actionTypes.REQ_START,
        loading: true,
      });
      api.get245BtHeader({}).then(
        res => {
          dispatch({
            type: actionTypes.REQ_SUCCESS,
            tabsData: res || [],
            loading: false,
          });
        },
        err => {
          dispatch({
            type: actionTypes.REQ_FAIL,
            loading: false,
          });
        },
      );
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
