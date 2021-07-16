import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeader: this.props.showHeader,
    };
  }
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    statusBarStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    headerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    leftStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    rightStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    title: PropTypes.string,
    headerLeft: PropTypes.element,
    headerCenter: PropTypes.element,
    headerRight: PropTypes.element,
    barStyle: PropTypes.string,
    showStatusBar: PropTypes.bool,
    showHeader: PropTypes.bool,
  };

  static defaultProps = {
    style: {backgroundColor: 'transparent'},
    statusBarStyle: {backgroundColor: '#597AEE'},
    headerStyle: {backgroundColor: '#597AEE'},
    title: '',
    barStyle: 'light-content',
    showStatusBar: true,
    showHeader: true,
  };
  static getDerivedStateFromProps(props) {
    return {
      showHeader: props.showHeader,
    };
  }
  // iPhone X、iPhone XS: 375 812
  // iPhone XR、iPhone XS Max: 414 896
  iphoneX() {
    let dimen = Dimensions.get('window');
    const iphoneDimen =
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896;
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      iphoneDimen
    );
  }

  statusBarHeight() {
    let height =
      Platform.OS === 'ios'
        ? this.iphoneX()
          ? 48
          : 20
        : StatusBar.currentHeight;
    if (Platform.OS === 'android' && Platform.Version < 21) {
      height = 0;
    }
    return height;
  }

  render() {
    const {
      headerLeft,
      headerRight,
      headerCenter,
      title,
      barStyle,
      showStatusBar,
      style,
      statusBarStyle,
      headerStyle,
      leftStyle,
      rightStyle,
    } = this.props;
    const {showHeader} = this.state;
    const barViewStyle = [
      {height: showStatusBar ? this.statusBarHeight() : 0},
      statusBarStyle,
    ];
    if (!showHeader) return null;
    return (
      <View style={style}>
        <StatusBar
          backgroundColor={'transparent'}
          translucent={true}
          barStyle={barStyle}
          hidden={!showStatusBar}
        />
        <View style={barViewStyle} />
        <View style={[styles.header, headerStyle]}>
          <View style={[styles.headerLeft, leftStyle]}>{headerLeft}</View>
          {headerCenter ? (
            <View style={styles.headerCenter}>{headerCenter}</View>
          ) : (
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
          )}
          <View style={[styles.headerRight, rightStyle]}>{headerRight}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#597AEE',
  },
  headerLeft: {
    justifyContent: 'flex-start',
  },
  headerCenter: {flex: 1},
  headerRight: {
    justifyContent: 'flex-end',
  },
  title: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
