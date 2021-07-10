import React, {Component} from 'react';
import {TouchableOpacity, SafeAreaView, View} from 'react-native';
import {Header, Icon} from '../../components/Index';
import {AppStyle} from '../../styles/Index';
import TabarDetail from '../tabarDetail/TabarDetail';
export default class Anime extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: '动漫',
    header: null,
    tabBarIcon: ({focused, tintColor}) => {
      if (focused) {
        return (
          <Icon name={'animeActive'} style={{fontSize: 24, color: tintColor}} />
        );
      }
      return <Icon name={'anime'} style={{fontSize: 24, color: tintColor}} />;
    },
  };
  render() {
    return (
      <View style={AppStyle.container}>
        <Header
          style={AppStyle.headerStyle}
          title={'动漫'}
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
        <SafeAreaView>
          <TabarDetail title="动漫" {...this.props} />
        </SafeAreaView>
      </View>
    );
  }
}
