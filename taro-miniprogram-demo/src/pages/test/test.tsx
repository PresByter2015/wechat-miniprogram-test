import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import './test.scss'

type PageStateProps = {

}

interface Index {
    props: PageStateProps;
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
    movelist: Subject[];
    title?: string;
}
class Index extends Component {
    state: RootObject = {
        movelist: []
    }
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: '测试页面'
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
                this.setState({
                    movelist: res.data.subjects
                })
            }
        })
    }
    handleChecked(e: string) {
        const checkedId = e
        const movelist = this.state.movelist
        console.log(e, movelist);
        this.setState({
            movelist: movelist.map(v => {
                return v.id === checkedId ? { ...v, checked: !v.checked } : { ...v }
            })
        })
    }
    render() {
        const { movelist } = this.state
        return (
            <View className='index'>
                <Text>test测试页面</Text>
                <Button type="primary" onClick={this.getMovieList}>test</Button>
                {movelist.map((v, index) => (<View key={v.id} className={v.checked ? 'active' : ''} onClick={() => this.handleChecked(v.id)}>{index}、{v.title}</View>))}
            </View>
        )
    }
}

export default Index as ComponentType
