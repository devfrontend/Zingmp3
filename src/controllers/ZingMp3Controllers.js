import { ZingMp3 } from 'zingmp3-api-full';
import { zing } from 'zingmp3-api-next';

const handleGetHome = async (req, res) => {
    let data = await zing.get_home();
    return res.json(data);
};

const handleGetSong = async (req, res) => {
    let data = await zing.get_song(req.params.id);
    return res.json(data);
};

const handleGetDetailPlaylist = async (req, res) => {
    let data = await zing.get_playlist(req.params.id);
    return res.json(data);
};

const handleGetChartHome = async (req, res) => {
    let data = await zing.get_home_chart();
    return res.json(data);
};

const handleGetNewReleaseChart = async (req, res) => {
    let data = await zing.get_new_release_chart();
    return res.json(data);
};

const handleGetInfoSong = async (req, res) => {
    let data = await zing.get_song_info(req.params.id);
    return res.json(data);
};

const handleGetArtist = async (req, res) => {
    let data = await zing.get_artist(req.params.name);
    return res.json(data);
};

const handleGetLyricSong = async (req, res) => {
    let data = await zing.get_song_lyric(req.params.id);
    return res.json(data);
};

const handleSearchAll = async (req, res) => {
    let data = await zing.search_all(req.query.keyword);
    return res.json(data);
};

const handleSearchByType = async (req, res) => {
    let data = await zing.search_by_type(req.query.keyword, req.params.type);
    return res.json(data);
};

const handleGetListMV = async (req, res) => {
    let data = await zing.get_list_mv(req.params.id, req.params.page, req.params.count);
    return res.json(data);
};

const handleGetCategoryMV = async (req, res) => {
    let data = await ZingMp3.getCategoryMV(req.params.id);
    return res.json(data);
};

const handleGetMV = async (req, res) => {
    let data = await ZingMp3.getVideo(req.params.id);
    return res.json(data);
};

const handleGetTop100 = async (req, res) => {
    let data = await zing.get_top_100();
    return res.json(data);
};

const handleGetWeekChart = async (req, res) => {
    let data = await zing.get_week_chart(req.params.id);
    return res.json(data);
};

const handleGetCategoryHome = async (req, res) => {
    let data = await zing.get_hub_home();
    return res.json(data);
};

const handleGetDetailCategory = async (req, res) => {
    let data = await zing.get_hub_detail(req.params.id);
    return res.json(data);
};

const handleGetRadio = async (req, res) => {
    let data = await zing.get_radio();
    return res.json(data);
};

const handleGetArtistSongs = async (req, res) => {
    let data = await ZingMp3.getListArtistSong(req.params.id, '1', '100');
    return res.json(data);
};

const handlePageError = async (req, res) => {
    return res.send('Sai đường dẫn!!! Vui lòng quay lại');
};

export const controllers = {
    handleGetHome,
    handleGetSong,
    handleGetArtist,
    handleGetCategoryMV,
    handleGetChartHome,
    handleGetDetailPlaylist,
    handleGetInfoSong,
    handleGetListMV,
    handleGetLyricSong,
    handleGetMV,
    handleGetNewReleaseChart,
    handleSearchAll,
    handleGetTop100,
    handleGetRadio,
    handleGetWeekChart,
    handleGetCategoryHome,
    handleGetDetailCategory,
    handleSearchByType,
    handleGetArtistSongs,
    handlePageError,
};
