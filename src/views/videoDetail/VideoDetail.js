import React, {Component} from 'react';
import {View, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';
import {Header, Icon, Card} from '../../components/Index';
import {AppStyle} from '../../styles/Index';
import {connect} from 'react-redux';
import Toast from '../../components/Toast';
import Episode from '../episode/Episode'; //剧集列表
class VideoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: this.props.navigation.state.params,
      body: [],
      author: '',
      title: [],
    };
  }
  static navigationOptions = {
    title: '影片详情',
    header: null,
  };
  componentDidMount() {
    this._getDetailList();
  }
  _getDetailList = async () => {
    let {params, body, author, title} = this.state;
    let res = await global.api
      .get245BtListItem({path: params.path, search: params.search})
      .catch(err => {
        Toast.show('fail', err);
      });
    if (!res) {
      return false;
    }
    title = res.header.map(v => `${v.label} ${v.value}`) || [];
    body = res.body || [];
    author = res.author || '';
    // console.log([{body, author, title}]);
    this.setState({body, author, title});
  };
  playItemChange(item, indexs) {
    let {body,params} = this.state;
    let data = Object.assign({}, item, {
      list: [body[indexs.rowIndex]],
      search:params.search
    });
    // 跳转播放页
    this.props.navigation.navigate('PlayerList', data);
  }
  render() {
    let {params, title, author, body} = this.state;
    return (
      <View style={AppStyle.container}>
        <Header
          style={AppStyle.headerStyle}
          title={author || ''}
          leftStyle={AppStyle.header_btn_left}
          rightStyle={AppStyle.header_btn_right}
          headerLeft={
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Icon name={'arrowLeft'} style={{fontSize: 20, color: '#fff'}} />
            </TouchableOpacity>
          }
        />
        <SafeAreaView style={{flex: 1}}>
          <Card image={{path: params.imgPath}} columns={title} />
          <View style={styles.container}>
            <Episode
              data={body}
              onChange={(item, indexs) => {
                this.playItemChange({...item, name: author}, indexs);
              }}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    tabsData: state.account.tabsData,
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default connect(mapStateToProps)(VideoDetail);
