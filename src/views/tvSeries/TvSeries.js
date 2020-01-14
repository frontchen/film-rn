import React, {Component} from 'react';
import {TouchableOpacity, SafeAreaView} from 'react-native';
import {Header, Icon} from '../../components/Index';
import {AppStyle} from '../../styles/Index';
import TabarDetail from '../tabarDetail/TabarDetail';
export default class TvSeries extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: '电视剧',
    header: null,
    tabBarIcon: ({focused, tintColor}) => {
      if (focused) {
        return (
          <Icon
            name={'tvSeriesActive'}
            style={{fontSize: 24, color: tintColor}}
          />
        );
      }
      return (
        <Icon name={'tvSeries'} style={{fontSize: 24, color: tintColor}} />
      );
    },
  };
  render() {
    return (
      <SafeAreaView style={AppStyle.container}>
        <Header
          style={AppStyle.headerStyle}
          title={'电视剧'}
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
        <TabarDetail title="电视剧" {...this.props}></TabarDetail>
      </SafeAreaView>
    );
  }
}
