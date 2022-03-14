import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    // 共同的数据
    state: {

        // 是否登录 window.localStorage.getItem('userId')?true:
        isLogin: false,


        // 音乐的url
        musicId: '',
        // 音乐的播放状态
        isPlay: false,
        //当前播放音乐的全部信息
        currentmusic: '',

        // 歌单里面的所有歌曲
        musicList: [],
        // 当前播放歌单的id
        musicListId: '',


        // 当前播放音乐的索引(用于顺序播放的时候好找到对应的index,从而调用id)
        currentIndex: -1,

        // 音乐详情卡片的显隐
        isMusicDetailCardShow: false,
        // 实时播放时长(用于进度条)
        currentTime: 0,
        // 音乐是否在加载中
        isMusicLoad: false,
        // 在歌手详情保存的上一首歌曲信息
        currentRowInfo: {},
        // 用户喜欢的音乐列表
        likeMuiscList: [],
        // 已收藏的歌单
        // 已收藏的专辑
        subAlbumList: null,
        // 已收藏的歌手
        subSingerList: null,
        // 已收藏的video
        subVideoList: null,
        // 已收藏的歌单
        collectMusicList: [],
        // 用户创建的歌单
        createdMusicList: [],
        // 要下载的音乐信息
        downloadMusicInfo: {
            name: '',
            url: '',
        },
        // 已喜欢的视频
        likeVideoList: null,
    },
    // 共同的方法(第一个参数是state,第二个参数是用户传进来的值)
    // 然后在方法中赋值给state中的变量
    mutations: {
        // 更新音乐url
        updateMusicId(state, musicId) {
            state.musicId = musicId;
        },
        //更新登录的状态(flag=false)这个是默认设置
        updataLoginState(state, flag = false) {
            state.isLogin = flag
        },
        //保存用户创建的歌单
        setcreatedMusicList(state, value) {
            state.createdMusicList = value
        },
        //保存用户收藏的歌单
        setcollectMusicList(state, value) {
            state.collectMusicList = value
        },
        //更新歌单列表和歌单id
        updateMusicList(state, payload) {

            //歌单改变了,修改 歌曲的索引值 和 歌单列表
            if (state.musicListId != payload.musicListId) {
                //把歌曲的索引值置为顶部
                state.currentIndex = -1
                state.musicListId = payload.musicListId
            }

            //对歌单进行深拷贝再赋值 , 直接赋值是浅拷贝
            //一个是直接使用引用地址,一个是创建一个新的对象再赋值
            // 歌单是固定的死数据,而vuex中的musicList是动态的
            let musiclist = payload.musicList
            state.musicList = musiclist

        },
        //更新歌单(歌单包括所有的歌曲)
        updataMusicList(state, value) {
            state.musicList = value
        },
        setcurrentmusic(state, value) {
            state.currentmusic = value
        },
        updataisPlay(state, value) {
            // console.log('我是播放状态', value);
            state.isPlay = value
        },
        updateCurrentTime(state, currentTime) {
            state.currentTime = currentTime;
        },
        //切换音乐详情卡片的显影
        changeMusicDetailCardState(state){
            state.isMusicDetailCardShow = !state.isMusicDetailCardShow
        }
    }
})