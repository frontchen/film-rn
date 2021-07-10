import React, {Component} from 'react';
import {
  TextInput,
  Animated,
  Easing,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';

import Icon from './Font/Icon';
import {screenWidth} from '../../styles/Index';
export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.value,
      placeholder: this.props.placeholder,
      opacity: new Animated.Value(0),
      left: new Animated.Value(screenWidth / 2),
    };
  }

  // check props
  static propTypes = {
    value: PropTypes.string,
    numberOfLines: PropTypes.number,
    placeholder: PropTypes.string,
  };

  // default props
  static defaultProps = {
    value: '',
    numberOfLines: 1, //输入框的行数
    placeholder: '100万影片任你搜索',
  };
  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1, // 目标值

      duration: 500, // 动画时间

      easing: Easing.linear, // 缓动函数
    }).start();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.inputValue) {
      return {
        inputValue: nextProps.value,
      };
    } else {
      return null;
    }
  }
  inputChange(value) {
    if (!value) {
      Animated.timing(this.state.left, {
        toValue: screenWidth / 2, // 目标值
        duration: 500, // 动画时间
        easing: Easing.linear, // 缓动函数
      }).start();
    } else {
      Animated.timing(this.state.left, {
        toValue: screenWidth - 32, // 目标值

        duration: 500, // 动画时间

        easing: Easing.linear, // 缓动函数
      }).start();
    }
    this.setState({inputValue: value});
    this.props.onChange && this.props.onChange(value);
  }
  onFocus = () => {
    Animated.timing(this.state.left, {
      toValue: screenWidth - 32, // 目标值

      duration: 500, // 动画时间

      easing: Easing.linear, // 缓动函数
    }).start();
  };
  onBlur = () => {
    let {inputValue} = this.state;
    if (!inputValue) {
      Animated.timing(this.state.left, {
        toValue: screenWidth / 2, // 目标值
        duration: 500, // 动画时间
        easing: Easing.linear, // 缓动函数
      }).start();
    }
  };
  onSearch = () => {
    let {inputValue} = this.state;
    this.props.onSubmitEditing && this.props.onSubmitEditing(inputValue);
  };
  onKeyPress = () => {
    let {inputValue} = this.state;
    this.props.onChange && this.props.onChange(inputValue);
  };
  onSubmitEditing = () => {
    let {inputValue} = this.state;
    // console.log(['ress', inputValue]);
    this.props.onSubmitEditing && this.props.onSubmitEditing(inputValue);
  };
  render() {
    const {placeholder, inputValue} = this.state;

    return (
      <Animated.View
        style={[
          styles.search,
          {
            opacity: this.state.opacity,
          },
        ]}>
        <TextInput
          style={styles.search_text}
          value={inputValue}
          placeholder={placeholder}
          placeholderTextColor={'#ccc'}
          onKeyPress={this.onKeyPress}
          onSubmitEditing={this.onSubmitEditing}
          underlineColorAndroid={'transparent'}
          clearButtonMode={'always'}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          returnKeyType={'search'}
          onChangeText={e => {
            this.inputChange(e);
          }}
        />
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: '50%',
              transform: [{translate: [3, 0, -3]}],
              left: this.state.left,
            },
          ]}>
          <TouchableHighlight onPress={this.onSearch}>
            <Icon name={'search'} style={styles.search_icon} />
          </TouchableHighlight>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    position: 'relative',
  },
  search_before: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E6E6EA',
  },
  search_icon: {
    fontSize: 20,
    color: '#B2B2B2',
  },
  search_text: {
    height: 36,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E6E6EA',
    paddingLeft: 10,
    paddingRight: 22,
    paddingVertical: 0,
    fontSize: 17,
    color: '#B2B2B2',
  },
});
