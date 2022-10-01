import Discover from '~/pages/Discover';
import Zingchart from '~/pages/Zingchart';
import Radio from '~/pages/Radio';
import NewMusic from '~/pages/NewMusic';
import Hub from '~/pages/Hub';
import Top100 from '~/pages/Top100';
import Artist from '~/pages/Artist';
import WeekChart from '~/pages/WeekChart';
import DetailHub from '~/pages/DetailHub';
import DetailPlaylist from '~/pages/DetailPlaylist';
import Search from '~/pages/Search';

// Public routes
const publicRoutes = [
    {
        path: '/',
        component: Discover,
    },
    {
        path: '/zing-chart',
        component: Zingchart,
    },
    {
        path: '/radio',
        component: Radio,
    },
    {
        path: '/newmusic',
        component: NewMusic,
    },
    {
        path: '/hub',
        component: Hub,
    },

    {
        path: '/top100',
        component: Top100,
    },
    {
        path: '/top100',
        component: Top100,
    },
    //
    {
        path: '/:weekchart/:area/:id',
        component: WeekChart,
    },
    {
        path: '/nghe-si/:name',
        component: Artist,
    },
    {
        path: '/:artist',
        component: Artist,
    },
    {
        path: '/hub/:name/:id',
        component: DetailHub,
    },
    {
        path: '/search/:keyword',
        component: Search,
    },
    {
        path: '/playlist/:name/:id',
        component: DetailPlaylist,
    },
    {
        path: '/album/:name/:id',
        component: DetailPlaylist,
    },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
