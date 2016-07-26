import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
    ProgressBarAndroid,
    ScrollView
} from 'react-native';
import {Actions } from 'react-native-router-flux'
import {connect} from 'react-redux'
import {fetchList} from '../action/video'
import styles from '../style/style'
import Loading from '../components/loading'
class List extends Component {

    static defaultProps = {
        videoList:[]
    }

    constructor(props) {
        super(props)
        this.state = {
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            opacity:0,
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchList())

    }

    renderRow(rowData) {
        return (
            <TouchableOpacity onPress={this._pressButton.bind(this)} style={styles.out}>
                <View style={styles.item}>
                    <Image style={styles.image} source={{uri:rowData.cover}}/>
                    <View style={styles.text}>
                        <Text>{rowData.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _pressButton() {
        Actions.detail()
    }

    handleScroll(e){
        const {y}=e.nativeEvent.contentOffset
        console.log(y/200)
        this.setState({
            opacity:y/200,
        })
    }

    render() {
        const {videoList}=this.props
        const {ds,opacity,top}=this.state
        const st={
            backgroundColor:"rgba(255,0,0,"+opacity+")",
            height:40,
            position:'absolute',
            top:40,
            left:0,
            right:0
        }
        return (
            <View style={styles.container}>
                {videoList.length==0&&<Loading />}
                <ScrollView
                    ref={(scrollView) => { _scrollView = scrollView; }}
                    automaticallyAdjustContentInsets={false}
                    onScroll={(e) => { this.handleScroll(e)}}
                    scrollEventThrottle={10}
                >
                <ListView
                    style={styles.list}
                    dataSource={ds.cloneWithRows(videoList)}
                    renderRow={(rowData) => this.renderRow(rowData)}
                />

                </ScrollView>
                <View style={st}></View>

            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        videoList: state.videoState.videoList
    }
}
export default connect(mapStateToProps)(List)
