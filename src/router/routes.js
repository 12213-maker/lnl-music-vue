//不懂可以去看看电商项目的p204

export default[
    {
        path: '/',
        redirect: '/home'
    },
    {
        path:'login',
        component:()=>import(/* WebpackChunkName: "individuation_index" */ '../views/login/Login')
    },
    {
        path:'/home',
        name:'Name',
        component:()=>import(/* WebpackChunkName: "home_index" */'../views/home/Home'),
        redirect:'/home/individuation',//先显示home中的这个组件
        children:[
            {
                path:'/home/individuation',//这里要把路径写完整不然不会显示
                component: () => import(/* WebpackChunkName: "individuation_index" */'../views/individuation/Individuation')
            },
            {
                path: '/home/playlist',
                component: () => import(/* WebpackChunkName: "playlist_index" */ '@/views/playlist/PlayList')
            },
            {
                path: '/home/songs',
                component: () => import(/* WebpackChunkName: "songs_index" */ '@/views/songs/Songs')
            },
            {
                path:'/home/mv',
                //不知道下面两个是干什么的
                // name: 'mv',
                // meta: { noTopNav: true },
                component:()=>import(/* WebpackChunkName: "mv_index" */'../views/Mv/MvIndex')
            },
            {
                path: '/home/leaderboard',
                // name: 'leaderboard',
                // meta: { noTopNav: true },
                component: () => import(/* WebpackChunkName: "leaderboard_index" */ '../views/leaderboard/LeaderBoard')
            },
            {
                path: '/home/singer',
                // name: 'singer',
                // meta: { noTopNav: true },
                component: () => import(/* WebpackChunkName: "singer_index" */ '../views/singer/SingerIndex')
            },
        ]
    },
]