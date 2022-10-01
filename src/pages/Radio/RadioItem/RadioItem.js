import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPauseCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import images from '~/assets';
import styles from './RadioItem.module.scss';
import {
    setInfoSongPlayer,
    setSrcRadio,
    setSrcAudio,
    setIsPlay,
    setIsDisabled,
    setIsRadioPlay,
    setPlaylistId,
    setSongId,
    setPlaylistRandom,
    setPlaylistSong,
} from '~/redux/audioSlice';

const cx = classNames.bind(styles);

function RadioItem({ data }) {
    const dispatch = useDispatch();
    const songInfo = useSelector((state) => state.audio.infoSongPlayer);
    const isRadioPlay = useSelector((state) => state.audio.isRadioPlay);
    const handlePlayRadio = (data) => {
        dispatch(setIsPlay(false));
        dispatch(setSrcRadio(data.streaming));
        dispatch(setInfoSongPlayer(data));
        dispatch(setIsRadioPlay(true));
        dispatch(setIsDisabled(true));
        dispatch(setSongId(''));
        dispatch(setSrcAudio(''));
        dispatch(setPlaylistSong([]));
        dispatch(setPlaylistRandom([]));
        dispatch(setPlaylistId(''));
    };

    return (
        <div className={cx('wrapper')}>
            <img src={data.thumbnailH} className={cx('channel-bg')} alt={data.program.title} />
            <div className={cx('content')}>
                <div className={cx('avatar')}>
                    <div className={cx('thumb', isRadioPlay && songInfo.encodeId === data.encodeId && 'playing')}>
                        <img src={data.thumbnailM} alt={data.description} />
                        <img src={images.liveLabel} className={cx('label')} alt="label" />
                    </div>
                    {songInfo.encodeId !== data.encodeId && (
                        <div className={cx('action')} onClick={() => handlePlayRadio(data)}>
                            <FontAwesomeIcon icon={faPlayCircle} />
                        </div>
                    )}
                    {songInfo.encodeId === data.encodeId && isRadioPlay && (
                        <div className={cx('action')} onClick={() => dispatch(setIsRadioPlay(!isRadioPlay))}>
                            <FontAwesomeIcon icon={faPauseCircle} />
                        </div>
                    )}
                    {songInfo.encodeId === data.encodeId && !isRadioPlay && (
                        <div className={cx('action')} onClick={() => dispatch(setIsRadioPlay(!isRadioPlay))}>
                            <FontAwesomeIcon icon={faPlayCircle} />
                        </div>
                    )}
                </div>
                <div className={cx('info')}>
                    <h2 className={cx('name')}>{data.title}</h2>
                    <p className={cx('listening')}>{data.activeUsers} Người đang nghe</p>
                </div>
            </div>
        </div>
    );
}

export default RadioItem;
