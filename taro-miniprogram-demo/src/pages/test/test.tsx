import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import './test.scss'

type PageStateProps = {

}

interface Index {
    props: PageStateProps;
    [key: string]: any;
}

interface Subject {
    rating: Rating;
    genres: string[];
    title: string;
    casts: Cast[];
    durations: string[];
    collect_count: number;
    mainland_pubdate: string;
    has_video: boolean;
    checked?: boolean;
    original_title: string;
    subtype: string;
    directors: Cast[];
    pubdates: string[];
    year: string;
    images: Avatars;
    alt: string;
    id: string;
}

interface Cast {
    avatars: Avatars;
    name_en: string;
    name: string;
    alt: string;
    id: string;
}

interface Avatars {
    small: string;
    large: string;
    medium: string;
}

interface Rating {
    max: number;
    average: number;
    details: Details;
    stars: string;
    min: number;
}

interface Details {
    '1': number;
    '2': number;
    '3': number;
    '4': number;
    '5': number;
}
interface RootObject {
    count?: number;
    start?: number;
    total?: number;
    movieList: Subject[];
    title?: string;
}
//  函数类型的组件

class Index extends Component {
    state: RootObject = {
        movieList: []
    }
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: 'taro 测试页面'
    }

    componentWillMount() { }

    componentWillReact() {
        console.log('componentWillReact', this.state)
    }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() {
        console.log('componentDidShow', this.state)
        console.log('componentDidShow', this.props)

    }
    renderList(props) {
        console.log(props);

        return (<View>
            {props.map((v, index) => (<View key={v.id}
                className={v.checked ? 'active' : ''}
            >qq/{v.title}
            </View>))}
        </View>)
    }
    renderMovieItem(props) {
        console.log(props.title);
        const { title } = props
        return (<View>
            <Text>{props.index}</Text>
            <Text>{props.id}</Text>
            <Text>{title}</Text>
        </View>)
    }

    componentDidHide() { }
    getMovieList() {
        Taro.request({
            url: 'https://api.douban.com/v2/movie/top250?start=0&count=4000&apikey=0df993c66c0c636e29ecbb5344252a4a', //仅为示例，并非真实的接口地址
            data: {
                start: 0,
                count: 1000
            },
            header: {
                'content-type': 'json' // 默认值
            },
            success: (res) => {
                console.time('test');
                let start = performance.now()
                this.setState({
                    movieList: res.data.subjects
                })
                console.timeEnd('test');
                let end = performance.now()
                console.log(end - start);

            }
        })
    }
    handleChecked(e: string) {
        console.time('test');
        let start = performance.now()

        const checkedId = e
        const movieList = this.state.movieList
        // console.log(e, movieList);
        this.setState({
            movieList: movieList.map(v => {
                return v.id === checkedId ? { ...v, checked: !v.checked } : { ...v }
            })
        })
        console.timeEnd('test');
        let end = performance.now()
        console.log(end - start);
    }
    render() {
        const { movieList } = this.state
        return (
            <View>
                <Text className="title">taro test测试页面</Text>
                <Button type="primary" onClick={this.getMovieList}>test</Button>
                {/* {movieList.map((v, index) => (<View key={v.id} className={v.checked ? 'active' : ''} onClick={() => this.handleChecked(v.id)}>{index}、{v.title}</View>))} */}
                {movieList.map((v, index) => (<View key={v.id}
                    className={v.checked ? 'active' : ''}
                    onClick={this.handleChecked.bind(this, v.id)}
                >{this.renderMovieItem({ ...v, index })}
                </View>))}
                {this.renderList(movieList)}

                {movieList.map((v, index) => (<View key={v.id}
                    className={v.checked ? 'active' : ''}
                    onClick={this.handleChecked.bind(this, v.id)}
                >{index + 1}、{v.title}
                </View>))}
            </View>
        )
    }
}

export default Index as ComponentType
