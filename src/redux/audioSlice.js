import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import mobilelogo from '~/assets/img/mobilelogo.png';
const initialState = {
    isPlay: false,
    isRadioPlay: false,
    isMute: false,
    isExtendSidebar: false,
    isOpenSidebarRight: false,
    isOpenThemModal: false,
    isDisabled: JSON.parse(localStorage.getItem('disabled')) || false,
    songId: localStorage.getItem('songId') || '',
    playlistId: localStorage.getItem('playlistId') || '',
    currentIndexSong: localStorage.getItem('currentIndexSong') || 0,
    currentIndexSongRandom: localStorage.getItem('currentIndexSongRandom') || 0,
    infoSongPlayer: JSON.parse(localStorage.getItem('songInfo')) || {
        thumbnail: mobilelogo,
        thumbnailM: mobilelogo,
        title: 'Tên bài hát',
        artistsNames: 'artistsNames',
        duration: 0,
    },
    themeCurrent: JSON.parse(localStorage.getItem('themeCurrent')) || {
        color: {
            primaryBg: '#432275',
            layoutBg: '#170f23',
            sideBarPopupBg: '#2a213a',
            alphaLayoutBg: 'rgba(41, 21, 71, 0.8)',
            queueLayoutPopupBg: '#120822',
            blurQueueBg: 'rgba(30, 21, 47, 0.9019607843137255)',
            purplePrimary: '#7200a1',
            linkTextHover: '#c662ef',
            chartBgImgAlpha: 'rgba(32,19,53,0.9)',
            chartBoxBgAlpha: 'hsla(0, 0%, 100%, 0.05)',
            linkText: '#97939c',
            alphaActiveSidebar: 'hsla(0, 0%, 100%, 0.1)',
            white: '#fff',
            grey: '#333',
        },
    },
    srcAudio: '',
    srcRadio: JSON.parse(localStorage.getItem('srcRadio')) || '',
    currentTime: 0,
    duration: 0,
    volume: JSON.parse(localStorage.getItem('volume')) || 100,
    isLoop: JSON.parse(localStorage.getItem('loop')) || false,
    isRandom: JSON.parse(localStorage.getItem('random')) || false,
    autoPlay: false,
    playlistSong: JSON.parse(localStorage.getItem('playlistSong')) || [],
    playlistRandom: JSON.parse(localStorage.getItem('playlistRandom')) || [],
    prevSong: [],
    isLyric: false,
};

const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        setIsPlay: (state, action) => {
            state.isPlay = action.payload;
        },
        setIsRadioPlay: (state, action) => {
            state.isRadioPlay = action.payload;
        },
        setIsExtendSidebar: (state, action) => {
            state.isExtendSidebar = action.payload;
        },
        setIsOpenSidebarRight: (state, action) => {
            state.isOpenSidebarRight = action.payload;
        },
        setIsOpenThemModal: (state, action) => {
            state.isOpenThemModal = action.payload;
        },
        setIsDisabled: (state, action) => {
            state.isDisabled = action.payload;
            localStorage.setItem('disabled', JSON.stringify(action.payload));
        },
        changeIconVolume: (state, action) => {
            state.isMute = action.payload;
        },
        setSongId: (state, action) => {
            state.songId = action.payload;
            localStorage.setItem('songId', JSON.stringify(action.payload));
        },
        setPlaylistId: (state, action) => {
            state.playlistId = action.payload;
            localStorage.setItem('playlistId', JSON.stringify(action.payload));
        },
        setInfoSongPlayer: (state, action) => {
            state.infoSongPlayer = { ...action.payload };
            localStorage.setItem('songInfo', JSON.stringify({ ...action.payload }));
        },
        setThemeCurrent: (state, action) => {
            state.themeCurrent = { ...action.payload };
            localStorage.setItem('themeCurrent', JSON.stringify({ ...action.payload }));
        },
        setSrcAudio: (state, action) => {
            state.srcAudio = action.payload;
        },
        setSrcRadio: (state, action) => {
            state.srcRadio = action.payload;
            localStorage.setItem('srcRadio', JSON.stringify(action.payload));
        },
        setCurrentTime: (state, action) => {
            state.currentTime = action.payload;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
            localStorage.setItem('volume', JSON.stringify(action.payload));
        },
        setLoop: (state, action) => {
            state.isLoop = action.payload;
            localStorage.setItem('loop', JSON.stringify(action.payload));
        },
        setAutoPlay: (state, action) => {
            state.autoPlay = action.payload;
        },
        setPlaylistSong: (state, action) => {
            state.playlistSong = action.payload;
            localStorage.setItem('playlistSong', JSON.stringify(action.payload));
        },
        setPlaylistRandom: (state, action) => {
            state.playlistRandom = action.payload;
            localStorage.setItem('playlistRandom', JSON.stringify(action.payload));
        },
        setCurrentIndexSong: (state, action) => {
            state.currentIndexSong = action.payload;
            localStorage.setItem('currentIndexSong', JSON.stringify(action.payload));
        },
        setCurrentIndexSongRandom: (state, action) => {
            state.currentIndexSongRandom = action.payload;
            localStorage.setItem('currentIndexSongRandom', JSON.stringify(action.payload));
        },
        setOpenLyric: (state, action) => {
            state.isLyric = action.payload;
        },
        setPrevSong: (state, action) => {
            state.prevSong = action.payload;
        },
        setRandom: (state, action) => {
            state.isRandom = action.payload;
            localStorage.setItem('random', JSON.stringify(action.payload));
        },
    },
});

export const {
    setIsPlay,
    setIsDisabled,
    setIsExtendSidebar,
    setIsOpenSidebarRight,
    setIsOpenThemModal,
    changeIconVolume,
    setThemeCurrent,
    setSongId,
    setInfoSongPlayer,
    setCurrentTime,
    setDuration,
    setVolume,
    setLoop,
    setSrcAudio,
    setAutoPlay,
    setPlaylistSong,
    setCurrentIndexSong,
    setOpenLyric,
    setRandom,
    setPrevSong,
    setPlaylistId,
    setSrcRadio,
    setIsRadioPlay,
    setPlaylistRandom,
    setCurrentIndexSongRandom,
} = audioSlice.actions;
export default audioSlice.reducer;
