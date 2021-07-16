import React, {Component} from 'react';
import {TouchableOpacity, SafeAreaView, View} from 'react-native';
import {Header, Icon} from '../../components/Index';
import {AppStyle} from '../../styles/Index';
import TabarDetail from '../tabarDetail/TabarDetail';
export default class Variety extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: '综艺',
    header: null,
    tabBarIcon: ({focused, tintColor}) => {
      if (focused) {
        return (
          <Icon
            name={'varietyActive'}
            style={{fontSize: 24, color: tintColor}}
          />
        );
      }
      return <Icon name={'variety'} style={{fontSize: 24, color: tintColor}} />;
    },
  };
  render() {
    return (
      <View style={AppStyle.container}>
        <Header
          style={AppStyle.headerStyle}
          title={'综艺'}
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
          <TabarDetail title="综艺" {...this.props} />
        </SafeAreaView>
      </View>
    );
  }
}
