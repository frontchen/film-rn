import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
} from 'react-native';
import {Header, Icon, Card, SearchBar} from '../../components/Index';
import {
  AppStyle,
  colorMap,
  screenWidth,
  screenHeight,
  statusBarHeight,
  headerHeight,
  bottomHeight,
} from '../../styles/Index';
import {connect} from 'react-redux';
import Toast from '../../components/Toast';
import unit from '../../services/unit';
import Result from '../../components/Result';
function mapStateToProps(state) {
  return {
    tabsData: state.account.tabsData,
  };
}

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyWords: '',
      isLoading: false,
      flatListData: [],
      pageIndex: 1,
      isEndReachedLoading: false,
      hasMore: false, //是否还有更多内容
      height: screenHeight - headerHeight - statusBarHeight - bottomHeight - 20,
      onShow: true,
    };
  }
  static navigationOptions = {
    title: '搜索',
    header: null,
  };
  componentWillUnmount() {
    this.setState({onShow: false});
  }
  // 搜索栏模糊搜索
  querySearchBar = value => {
    this.setState({keyWords: value});
  };

  // 搜索栏搜索查询
  onSubmitEditing = () => {
    this.setState({pageIndex: 1}, () => {
      this._getList();
    });
  };

  // 拉取列表数据
  _getList = async () => {
    let vm = this;
    let {onShow, keyWords, pageIndex, flatListData} = vm.state;
    console.warn(keyWords, onShow);
    if (!keyWords || !onShow) {
      return false;
    }
    let params = {
      keyWords: keyWords,
      pageIndex: pageIndex,
    };
    console.warn(JSON.stringify(params));
    let res = await global.api.search245BtBykeywords(params).catch(err => {
      Toast.show('fail', err);
      vm._getList();
    });
    if (!res || !res.length) {
      return false;
    }
    console.log(['search', res]);
    let list = res.map(v => {
      let obj = {
        path: v.imgPath,
        title: v.title,
        item: v,
        columns: [
          {
            render: () => {
              return <Text style={styles.searchResultTitle}>{v.title}</Text>;
            },
          },
          ...v.desc.filter(v => Object.keys(v).length).map(v => v.title),
          {
            render: () => {
              return (
                <View style={[AppStyle.row, AppStyle.flex1]}>
                  <TouchableOpacity
                    onPress={() => {
                      this.clickBtn({
                        ...v.btn[0],
                        imgPath: v.imgPath,
                        name: v.title,
                      });
                    }}>
                    <Text style={styles.searchBtn}>{v.btn[0].title}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.clickBtn({
                        ...v.btn[1],
                        imgPath: v.imgPath,
                        name: v.title,
                      });
                    }}>
                    <Text style={[styles.searchBtn, {marginLeft: 12}]}>
                      {v.btn[1].title}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            },
          },
        ],
      };

      return obj;
    });

    if (pageIndex > 1) {
      list = unit.objectArrayReduce([...flatListData, ...list], 'title');
    }

    this.setState({
      flatListData: list,
      isLoading: false,
      isEndReachedLoading: false,
      hasMore: res
        ? Array.isArray(res) && res.length === 6
          ? true
          : false
        : false,
    });
  };
  _renderItem(data) {
    const item = data.item;
    console.warn(['data', data]);
    return (
      <TouchableOpacity
        onPress={() => {
          // 跳转详情页
          this.props.navigation.navigate(
            'VideoDetail',
            Object.assign(item.item, {
              path: item.item.btn[1].path,
              search: true, //从搜索页跳详情 为true
            }),
          );
        }}>
        <Card
          key={data.index}
          image={{path: item.path}}
          height={parseInt((screenWidth / 4) * 1.2)}
          columns={item.columns}
        />
      </TouchableOpacity>
    );
  }
  // 立即播放 查看详情
  clickBtn = item => {
    if (item.title === '播放') {
    }
    if (item.title === '详情') {
      // 跳转详情页
      item.search = true;
      this.props.navigation.navigate('VideoDetail', item);
    }
  };

  _genIndicator() {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          size={'small'}
          animating={this.state.isEndReachedLoading}
          color={'blue'}
        />
        <View>
          <Text style={styles.indicator}>正在加载更多</Text>
        </View>
      </View>
    );
  }

  //上拉滚动加载
  _onEndReachedloadData() {
    let {hasMore, onShow, pageIndex, keyWords} = this.state;
    if (!hasMore || !onShow || !keyWords || this.state.isLoading) {
      return false;
    }
    pageIndex += 1;
    this.setState(
      {
        isLoading: true,
        isEndReachedLoading: true,
        pageIndex,
      },
      () => {
        this._getList(this.state.pageIndex);
      },
    );
  }

  //下拉刷新
  loadData() {
    let {keyWords, onShow} = this.state;
    if (!onShow || !keyWords || this.state.isLoading) {
      return false;
    }
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this._getList(this.state.params.path);
      },
    );
  }

  render() {
    let {isLoading, height, flatListData, keyWords} = this.state;
    return (
      <View style={AppStyle.container}>
        <Header
          style={AppStyle.headerStyle}
          title={'搜索'}
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
        <SafeAreaView>
          <SearchBar
            onChange={this.querySearchBar}
            value={keyWords}
            onSubmitEditing={this.onSubmitEditing}
          />
          <View style={[styles.flatList, {height: height, marginVertical: 6}]}>
            {flatListData.length ? (
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={flatListData}
                renderItem={data => {
                  return this._renderItem(data);
                }}
                refreshControl={
                  <RefreshControl
                    title={'loading'}
                    colors={['blue']}
                    refreshing={isLoading}
                    onRefresh={() => {
                      this.loadData();
                    }}
                  />
                }
                ListFooterComponent={() => isLoading && this._genIndicator()}
                onEndReachedThreshold={0.1}
                onEndReached={() => {
                  this._onEndReachedloadData();
                }}
              />
            ) : (
              <Result />
            )}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flatList: {
    // 主轴方向
    // 侧轴方向// 必须设置,否则换行不起作用
    marginHorizontal: 10,
  },
  searchResultTitle: {
    color: colorMap.yellow[0],
    textAlign: 'left',
    flex: 1,
    flexDirection: 'row',
    fontSize: 16,
  },
  searchBtn: {
    borderWidth: 1,
    borderColor: colorMap.white[2],
    borderRadius: 2,
    paddingHorizontal: 4,
    height: 26,
    lineHeight: 26,
    color: colorMap.green[1],
  },
});
export default connect(mapStateToProps)(SearchResult);
