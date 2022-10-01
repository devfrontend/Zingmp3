import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    setIsRadioPlay,
    setIsPlay,
    setSongId,
    setInfoSongPlayer,
    setPlaylistSong,
    setPlaylistRandom,
    setLoop,
    setRandom,
    setSrcAudio,
    setCurrentTime,
    setIsDisabled,
} from '~/redux/audioSlice';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import request from '~/utils/httpRequest';
import SongItem from '~/components/SongItem';
import SongItemShort from '~/components/SongItemShort';
import Item from '~/components/Item';
import Loading from '../Loading';
import Artist from '~/components/Artist';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Search() {
    const location = useLocation();
    const keyword = localStorage.getItem('searchKeyWord');
    const [data, setData] = useState({});
    const [showAllTab, setShowAllTab] = useState(true);
    const [showSongTab, setShowSongTab] = useState(false);
    const [showAlbumTab, setShowAlbumTab] = useState(false);
    const [isLoading, setIsloading] = useState(true);
    const dispatch = useDispatch();

    const handlePlaySong = (song) => {
        dispatch(setIsDisabled(false));
        dispatch(setSrcAudio(''));
        dispatch(setCurrentTime(0));
        dispatch(setIsRadioPlay(false));
        dispatch(setSongId(song.encodeId));
        dispatch(setInfoSongPlayer(song));
        dispatch(setPlaylistSong([song]));
        dispatch(setPlaylistRandom([song]));
        dispatch(setIsPlay(true));
        dispatch(setLoop(true));
        dispatch(setRandom(false));
    };

    useEffect(() => {
        request.get(`/search?keyword=${keyword}`).then((res) => {
            setIsloading(false);
            setData(res.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword]);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('tab')}>
                    <h3 className={cx('title')}>Kết quả tìm kiếm </h3>
                    <span
                        className={cx('btn', showAllTab && 'active')}
                        onClick={() => {
                            setShowAllTab(true);
                            setShowSongTab(false);
                            setShowAlbumTab(false);
                        }}
                    >
                        TẤT CẢ
                    </span>
                    <span
                        className={cx('btn', showSongTab && 'active')}
                        onClick={() => {
                            setShowSongTab(true);
                            setShowAllTab(false);
                            setShowAlbumTab(false);
                        }}
                    >
                        BÀI HÁT
                    </span>
                    <span
                        className={cx('btn', showAlbumTab && 'active')}
                        onClick={() => {
                            setShowAlbumTab(true);
                            setShowSongTab(false);
                            setShowAllTab(false);
                        }}
                    >
                        PLAYLIST/ALBUM
                    </span>
                </div>
                {/* Show All  */}
                {showAllTab && (
                    <>
                        <span className={cx('header')}>
                            <span className={cx('title')}>Nổi Bật</span>
                        </span>
                        <div className={cx('grid-song')}>
                            <SongItemShort
                                large={true}
                                active={true}
                                onClick={() => handlePlaySong(data.songs[0])}
                                data={data.songs[0]}
                            />
                            <Artist active={true} onClick={() => handlePlaySong(data.songs[0])} data={data.songs[0]} />
                            <SongItemShort
                                large={true}
                                active={true}
                                onClick={() => handlePlaySong(data.songs[1])}
                                data={data.songs[1]}
                            />
                        </div>

                        <span className={cx('header')}>
                            <span className={cx('title')}>Bài hát</span>
                            <Button
                                className={cx('btn-all')}
                                onClick={() => {
                                    setShowSongTab(true);
                                    setShowAllTab(false);
                                    setShowAlbumTab(false);
                                }}
                            >
                                Tất cả
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </span>
                            </Button>
                        </span>
                        <div className={cx('song')}>
                            {data.songs.slice(0, 6).map((song) => (
                                <SongItem
                                    onClick={() => handlePlaySong(song)}
                                    key={song.encodeId}
                                    data={song}
                                    type="mini"
                                    className={cx('custom-song')}
                                />
                            ))}
                        </div>

                        <span className={cx('header')}>
                            <span className={cx('title')}>Playlist/Album</span>
                            <Button
                                className={cx('btn-all')}
                                onClick={() => {
                                    setShowAlbumTab(true);
                                    setShowSongTab(false);
                                    setShowAllTab(false);
                                }}
                            >
                                Tất cả
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </span>
                            </Button>
                        </span>
                        <div className={cx('grid')}>
                            {data.playlists.slice(0, 5).map((playlist, index) => (
                                <Item data={playlist} key={index} />
                            ))}
                        </div>
                    </>
                )}
                {/* Song tab */}
                {showSongTab && (
                    <>
                        <span className={cx('header')}>
                            <span className={cx('title')}>Bài Hát</span>
                        </span>
                        {data.songs.slice(0, 15).map((song) => (
                            <SongItem
                                noticon={true}
                                onClick={() => handlePlaySong(song)}
                                key={song.encodeId}
                                data={song}
                            />
                        ))}
                    </>
                )}
                {/* Album tab */}
                {showAlbumTab && (
                    <>
                        <span className={cx('header')}>
                            <span className={cx('title')}>Album/Playlist</span>
                        </span>
                        <div className={cx('grid')}>
                            {data.playlists.map((playlist, index) => (
                                <Item data={playlist} key={index} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default Search;
