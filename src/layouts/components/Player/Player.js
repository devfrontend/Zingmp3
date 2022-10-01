import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Player.module.scss';
import Button from '../../../components/Button';
import request from '~/utils/httpRequest';
import ReactHlsPlayer from 'react-hls-player';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import {
    faShuffle,
    faBackwardStep,
    faForwardStep,
    faRepeat,
    faVolumeHigh,
    faVolumeMute,
    faMicrophone,
    faListOl,
    faClapperboard,
    faPlay,
    faPause,
} from '@fortawesome/free-solid-svg-icons';
import {
    setInfoSongPlayer,
    setCurrentTime,
    setSrcAudio,
    setIsPlay,
    setSongId,
    setRandom,
    setLoop,
    setVolume,
    setIsRadioPlay,
    setCurrentIndexSong,
    setCurrentIndexSongRandom,
    setIsOpenSidebarRight,
} from '~/redux/audioSlice';

const cx = classNames.bind(styles);

function Player() {
    const srcAudio = useSelector((state) => state.audio.srcAudio);
    const dispatch = useDispatch();
    const currentSongId = useSelector((state) => state.audio.songId);
    let currentIndexSong = useSelector((state) => state.audio.currentIndexSong);
    let currentIndexSongRandom = useSelector((state) => state.audio.currentIndexSongRandom);
    const songInfo = useSelector((state) => state.audio.infoSongPlayer);
    const isPlay = useSelector((state) => state.audio.isPlay);
    const isDisabled = useSelector((state) => state.audio.isDisabled);
    const isOpenSidebarRight = useSelector((state) => state.audio.isOpenSidebarRight);
    const isLoop = useSelector((state) => state.audio.isLoop);
    const isRandom = useSelector((state) => state.audio.isRandom);
    const playlistSong = [...useSelector((state) => state.audio.playlistSong)];
    const playlistRandom = [...useSelector((state) => state.audio.playlistRandom)];
    const currentTime = useSelector((state) => state.audio.currentTime);
    const volume = useSelector((state) => state.audio.volume);
    const srcRadio = useSelector((state) => state.audio.srcRadio);
    const isRadioPlay = useSelector((state) => state.audio.isRadioPlay);
    const audioRef = useRef();
    const volumeRef = useRef();
    const radioRef = useRef();

    const handlePlaySong = () => {
        if (!isDisabled) {
            if (isPlay) {
                dispatch(setIsPlay(false));
                if (audioRef) {
                    audioRef.current.pause();
                }
            } else {
                dispatch(setIsPlay(true));
                if (audioRef) {
                    audioRef.current.play();
                }
            }
        } else if (isDisabled) {
            if (isRadioPlay) {
                dispatch(setIsRadioPlay(false));
                if (radioRef) {
                    radioRef.current.pause();
                }
            } else {
                dispatch(setIsRadioPlay(true));
                if (radioRef) {
                    radioRef.current.play();
                }
            }
        }
    };
    const handleOpenRightSidebar = () => {
        dispatch(setIsOpenSidebarRight(!isOpenSidebarRight));
    };

    const handleOnEnd = () => {
        if (!isLoop) {
            dispatch(setCurrentTime(0));
            dispatch(setIsPlay(false));
            if (isRandom) {
                if (currentIndexSongRandom === playlistRandom.length - 1) {
                    dispatch(setCurrentIndexSongRandom(0));
                    dispatch(setInfoSongPlayer(playlistRandom[0]));
                    dispatch(setSongId(playlistRandom[0].encodeId));
                    dispatch(
                        setCurrentIndexSong(
                            playlistSong.findIndex((item) => item.encodeId === playlistRandom[0].encodeId),
                        ),
                    );
                    dispatch(setIsPlay(true));
                } else {
                    dispatch(setCurrentIndexSongRandom((currentIndexSongRandom += 1)));
                    dispatch(setSongId(playlistRandom[currentIndexSongRandom].encodeId));
                    dispatch(setInfoSongPlayer(playlistRandom[currentIndexSongRandom]));
                    dispatch(
                        setCurrentIndexSong(
                            playlistSong.findIndex(
                                (item) => item.encodeId === playlistRandom[currentIndexSongRandom].encodeId,
                            ),
                        ),
                    );
                    dispatch(setIsPlay(true));
                }
            } else {
                if (currentIndexSong === playlistSong.length - 1) {
                    dispatch(setCurrentIndexSong(0));
                    dispatch(setInfoSongPlayer(playlistSong[0]));
                    dispatch(setSongId(playlistSong[0].encodeId));
                    dispatch(setIsPlay(true));
                } else {
                    dispatch(setCurrentIndexSong((currentIndexSong += 1)));
                    dispatch(setInfoSongPlayer(playlistSong[currentIndexSong]));
                    dispatch(setSongId(playlistSong[currentIndexSong].encodeId));
                    dispatch(setIsPlay(true));
                }
            }
        }
    };

    const handleChangeProgressSong = (value) => {
        dispatch(setCurrentTime(value));
        audioRef.current.currentTime = value;
    };

    const handleNextSong = () => {
        if (
            currentIndexSong === playlistSong.length - 1 ||
            currentIndexSong >= playlistSong.length - 1 ||
            currentIndexSongRandom === playlistRandom.length - 1 ||
            currentIndexSongRandom >= playlistRandom.length - 1
        ) {
            return;
        } else {
            dispatch(setSrcAudio(''));
            dispatch(setCurrentTime(0));
            audioRef.current.currentTime = 0;
            if (isRandom) {
                dispatch(setCurrentIndexSongRandom((currentIndexSongRandom += 1)));
                dispatch(setInfoSongPlayer(playlistRandom[currentIndexSongRandom]));
                dispatch(setSongId(playlistRandom[currentIndexSongRandom].encodeId));
                dispatch(setCurrentIndexSong(playlistSong.indexOf(playlistRandom[currentIndexSongRandom])));
            } else {
                dispatch(setCurrentIndexSong((currentIndexSong += 1)));
                dispatch(setInfoSongPlayer(playlistSong[currentIndexSong]));
                dispatch(setSongId(playlistSong[currentIndexSong].encodeId));
            }
        }
    };

    const handleLoop = () => {
        dispatch(setLoop(!isLoop));
    };

    const handleRandom = () => {
        dispatch(setRandom(!isRandom));
    };

    const handlePrevSong = () => {
        if (currentTime >= 5) {
            dispatch(() => setCurrentTime(0));
            audioRef.current.currentTime = 0;
        } else {
            if (isRandom) {
                if (currentIndexSongRandom <= 0 || currentIndexSongRandom >= playlistRandom.length - 1) {
                    dispatch(() => setCurrentTime(0));
                    audioRef.current.currentTime = 0;
                } else {
                    dispatch(setCurrentIndexSongRandom((currentIndexSongRandom -= 1)));
                    dispatch(setInfoSongPlayer(playlistRandom[currentIndexSongRandom]));
                    dispatch(setSongId(playlistRandom[currentIndexSongRandom].encodeId));
                    dispatch(
                        setCurrentIndexSong(playlistSong.findIndex((item) => item.encodeId === songInfo.encodeId)),
                    );
                    dispatch(setSrcAudio(''));
                    dispatch(setCurrentTime(0));
                    dispatch(setIsPlay(true));
                }
            } else {
                if (currentIndexSong === 0 || currentIndexSong >= playlistSong.length - 1) {
                    dispatch(() => setCurrentTime(0));
                    audioRef.current.currentTime = 0;
                } else {
                    dispatch(setCurrentIndexSong((currentIndexSong -= 1)));
                    dispatch(setInfoSongPlayer(playlistSong[currentIndexSong]));
                    dispatch(setSongId(playlistSong[currentIndexSong].encodeId));
                    dispatch(setCurrentTime(0));
                    dispatch(setSrcAudio(''));
                    audioRef.current.currentTime = 0;
                    dispatch(setIsPlay(true));
                }
            }
        }
    };

    const handleVolume = () => {
        dispatch(setVolume(volumeRef.current.value));
        audioRef.current.volume = volumeRef.current.value / 100;
        radioRef.current.volume = volumeRef.current.value / 100;
    };

    const handleMute = () => {
        if (volume === 0) {
            dispatch(setVolume(20));
            audioRef.current.volume = 0.2;
            radioRef.current.volume = 0.2;
        } else {
            dispatch(setVolume(0));
            audioRef.current.volume = 0;
            radioRef.current.volume = 0;
        }
    };
    useEffect(() => {
        if (srcAudio !== '') {
            isPlay ? audioRef.current.play() : audioRef.current.pause();
        }
    }, [srcAudio, isPlay]);

    useEffect(() => {
        if (srcRadio !== '') {
            isRadioPlay ? radioRef.current.play() : radioRef.current.pause();
        }
    }, [srcRadio, isRadioPlay]);

    useEffect(() => {
        if (currentSongId !== null && currentSongId !== '') {
            request.get(`song/${currentSongId}`).then(async (res) => {
                if (res.data) {
                    dispatch(setSrcAudio(res.data[128]));
                } else {
                    dispatch(setIsPlay(false));
                    alert(res.msg);
                }
            });
        }
    }, [currentSongId, dispatch]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <img className={cx('img')} src={songInfo.thumbnail} alt={songInfo.alias} />
                <div className={cx('content')}>
                    <h3 className={cx('song-name')}>{songInfo.title || 'Tên bài hát'}</h3>
                    <p className={cx('artists')}>
                        {songInfo.artists
                            ? songInfo.artists.map((artist, index) => (
                                  <span key={artist.id}>
                                      <Link
                                          to={artist.link}
                                          className={cx('singers')}
                                          state={{ artistName: artist.alias }}
                                      >
                                          {artist.name}
                                      </Link>
                                      {index + 1 === songInfo.artists.length ? '' : ', '}
                                  </span>
                              ))
                            : songInfo.activeUsers
                            ? songInfo.activeUsers + ' người đang nghe'
                            : 'artistName'}
                    </p>
                </div>
            </div>
            <div className={cx('control')}>
                <div className={cx('handler')}>
                    <Button
                        circles="true"
                        className={cx(isRandom && 'active', isDisabled && 'disabled')}
                        onClick={handleRandom}
                    >
                        <FontAwesomeIcon icon={faShuffle} />
                    </Button>
                    <Button circles="true" onClick={handlePrevSong} className={cx(isDisabled && 'disabled')}>
                        <FontAwesomeIcon icon={faBackwardStep} />
                    </Button>
                    <Button circlem="true" className={cx('play')} onClick={handlePlaySong}>
                        {isPlay || isRadioPlay ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                    </Button>
                    <Button
                        circles="true"
                        className={cx(isDisabled && 'disabled')}
                        onClick={(playlistSong || playlistRandom) && handleNextSong}
                    >
                        <FontAwesomeIcon icon={faForwardStep} />
                    </Button>
                    <Button
                        circles="true"
                        className={cx(isLoop && 'active', isDisabled && 'disabled')}
                        onClick={handleLoop}
                    >
                        <FontAwesomeIcon icon={faRepeat} />
                    </Button>
                </div>

                {!isDisabled && (
                    <div className={cx('range')}>
                        <span className={cx('time')}>
                            {Math.floor(currentTime / 60) < 10
                                ? '0' + Math.floor(currentTime / 60)
                                : Math.floor(currentTime / 60)}
                            :{currentTime % 60 < 10 ? '0' + (currentTime % 60) : currentTime % 60}
                        </span>
                        <input
                            value={currentTime}
                            type="range"
                            className={cx('song-progress')}
                            min={0}
                            max={songInfo.duration}
                            onChange={(e) => handleChangeProgressSong(e.target.value)}
                        />
                        <span className={cx('time')}>
                            {Math.floor(songInfo.duration / 60) < 10
                                ? '0' + Math.floor(songInfo.duration / 60)
                                : Math.floor(songInfo.duration / 60)}
                            :{songInfo.duration % 60 < 10 ? '0' + (songInfo.duration % 60) : songInfo.duration % 60}
                        </span>
                    </div>
                )}
            </div>
            <div className={cx('option')}>
                <Button circles="true">
                    <FontAwesomeIcon icon={faClapperboard} />
                </Button>
                <Button circles="true">
                    <FontAwesomeIcon icon={faMicrophone} />
                </Button>
                <Button circles="true">
                    <FontAwesomeIcon icon={faWindows} />
                </Button>
                <div className={cx('volume')}>
                    <Button circles="true" onClick={handleMute}>
                        {volume === 0 ? (
                            <FontAwesomeIcon icon={faVolumeMute} />
                        ) : (
                            <FontAwesomeIcon icon={faVolumeHigh} />
                        )}
                    </Button>
                    <input
                        type="range"
                        className={cx('volume-progress')}
                        ref={volumeRef}
                        onChange={handleVolume}
                        min={0}
                        max={100}
                        value={volume}
                    />
                </div>
                <Tippy content="Danh sách phát">
                    <span className={cx('list-song', isOpenSidebarRight && 'active')} onClick={handleOpenRightSidebar}>
                        <FontAwesomeIcon icon={faListOl} />
                    </span>
                </Tippy>
            </div>
            <audio
                loop={isLoop}
                ref={audioRef}
                src={srcAudio}
                autoPlay={isPlay}
                onTimeUpdate={() => {
                    if (audioRef.current) {
                        dispatch(setCurrentTime(Math.floor(audioRef.current.currentTime)));
                    }
                }}
                onEnded={handleOnEnd}
            />
            <ReactHlsPlayer hidden src={srcRadio} autoPlay={isRadioPlay} playerRef={radioRef} volume={volume} />
        </div>
    );
}

export default Player;
