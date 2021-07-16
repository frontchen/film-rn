import React, {Component} from 'react';
import {TouchableOpacity, View, SafeAreaView} from 'react-native';
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
      <View style={AppStyle.container}>
        <Header
          style={AppStyle.headerStyle}
          title={'电影'}
          leftStyle={AppStyle.header_btn_left}
          rightStyle={AppStyle.header_btn_right}
          headerRight={
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('SearchResult');
              }}>
              <Icon name={'search'} style={AppStyle.header_btn_icon} />
            </TouchableOpacity>
          }
        />
        <SafeAreaView style={{flex: 1}}>
          <TabarDetail title="电影" {...this.props} />
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    tabsData: state.account.tabsData,
  };
};
export default connect(mapStateToProps)(Film);
