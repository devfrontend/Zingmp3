import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import request from '~/utils/httpRequest';
import Carousel from '~/components/Carousel';
import Loading from '../Loading';
import Section from '~/components/Section';
import Item from '~/components/Item';
import Button from '~/components/Button';
import SongItemShort from '~/components/SongItemShort';
import Album from '../../components/Album';
import classNames from 'classnames/bind';
import styles from './Discover.module.scss';
import {
    setSrcAudio,
    setCurrentTime,
    setInfoSongPlayer,
    setSongId,
    setPlaylistSong,
    setIsPlay,
    setPlaylistId,
    setIsRadioPlay,
    setPlaylistRandom,
    setCurrentIndexSong,
    setCurrentIndexSongRandom,
    setIsDisabled,
} from '~/redux/audioSlice';

const cx = classNames.bind(styles);

function Decover() {
    const dispatch = useDispatch();

    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newReleaseSong, setNewReleaseSong] = useState(true);
    const [newReleaseAlbum, setNewReleaseAlbum] = useState(false);
    const isRandom = useSelector((state) => state.audio.isRandom);

    const shuffle = (sourceArray) => {
        for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));

            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];
            sourceArray[i] = temp;
        }
        return sourceArray;
    };

    const handleNewReleaseSong = () => {
        setNewReleaseSong(true);
        setNewReleaseAlbum(false);
    };

    const handleNewReleaseAlbum = () => {
        setNewReleaseSong(false);
        setNewReleaseAlbum(true);
    };

    const handlePlaySong = (song, playlist, id) => {
        dispatch(setIsRadioPlay(false));
        dispatch(setCurrentTime(0));
        dispatch(setSrcAudio(''));
        dispatch(setPlaylistId(id));
        let playlistCanPlay = [];
        if (song.streamingStatus === 1) {
            for (var i = 0; i < playlist.length; i++) {
                if (playlist[i].streamingStatus === 1) {
                    playlistCanPlay.push(playlist[i]);
                }
            }
            if (isRandom) {
                dispatch(setPlaylistRandom(shuffle([...playlistCanPlay])));
                dispatch(setSongId(song.encodeId));
                dispatch(setInfoSongPlayer(song));
                dispatch(setPlaylistSong(playlistCanPlay));
                dispatch(setCurrentIndexSong(playlistCanPlay.findIndex((item) => item.encodeId === song.encodeId)));
                dispatch(setCurrentIndexSongRandom(-1));
                dispatch(setIsPlay(true));
                dispatch(setIsDisabled(false));
            } else {
                dispatch(setCurrentIndexSongRandom(-1));
                dispatch(setInfoSongPlayer(song));
                dispatch(setSongId(song.encodeId));
                dispatch(setPlaylistSong(playlistCanPlay));
                dispatch(setCurrentIndexSong(playlistCanPlay.findIndex((item) => item.encodeId === song.encodeId)));
                dispatch(setIsPlay(true));
                dispatch(setIsDisabled(false));
            }
        } else {
            alert('This is vip song');
        }
    };

    useEffect(() => {
        request.get('/home').then((res) => {
            setIsLoading(false);
            setResult(res.data.items);
            document.title = 'ZingMP3 | Nghe tải nhạc chất lượng cao trên desktop, mobile và ...';
        });
    }, []);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <Carousel data={result[0]} />

                <div className={cx('new-release')}>
                    <h3 className={cx('title')}>{result[3].title}</h3>
                    <div className={cx('header')}>
                        <Button
                            roundeds={true}
                            className={cx('btn', newReleaseSong && 'active')}
                            onClick={handleNewReleaseSong}
                        >
                            Bài hát
                        </Button>
                        <Button
                            roundeds={true}
                            onClick={handleNewReleaseAlbum}
                            className={cx('btn', newReleaseAlbum && 'active')}
                        >
                            Album
                        </Button>
                    </div>
                    {newReleaseSong && (
                        <div className={cx('grid')}>
                            {result[3].items[0].song.slice(0, 12).map((song, index) => (
                                <SongItemShort
                                    key={index}
                                    data={song}
                                    index={index}
                                    onClick={() =>
                                        handlePlaySong(song, result[3].items[0].song, result[3].items[0].song.encodeId)
                                    }
                                />
                            ))}
                        </div>
                    )}
                    {newReleaseAlbum && (
                        <div className={cx('grid')}>
                            {result[3].items[0].album.slice(0, 9).map((album, index) => (
                                <Album key={album.encodeId} data={album} />
                            ))}
                        </div>
                    )}
                </div>

                {result.map(
                    (playlist, index) =>
                        playlist.sectionType === 'playlist' && (
                            <Section key={index} title={playlist.title}>
                                {playlist.items.map((item) => (
                                    <Item key={item.encodeId} data={item} />
                                ))}
                            </Section>
                        ),
                )}
            </div>
        );
    }
}

export default Decover;
