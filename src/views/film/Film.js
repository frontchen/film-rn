import React, {Component} from 'react';
import {TouchableOpacity, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {Header, Icon} from '../../components/Index';
import {AppStyle} from '../../styles/Index';
import TabarDetail from '../tabarDetail/TabarDetail';
class Film extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: '电影',
    header: null,
    tabBarIcon: ({focused, tintColor}) => {
      if (focused) {
        return (
          <Icon name={'filmActive'} style={{fontSize: 24, color: tintColor}} />
        );
      }
      return <Icon name={'film'} style={{fontSize: 24, color: tintColor}} />;
    },
  };
  render() {
    return (
      <SafeAreaView style={AppStyle.container}>
        <Header
          style={AppStyle.headerStyle}
          title={'电影'}
          headerRight={
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('SearchResult');
              }}>
              <Icon name={'search'} style={AppStyle.header_btn_icon} />
            </TouchableOpacity>
          }
        />
        <TabarDetail title="电影" {...this.props}></TabarDetail>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    tabsData: state.account.tabsData,
  };
};
export default connect(mapStateToProps)(Film);
