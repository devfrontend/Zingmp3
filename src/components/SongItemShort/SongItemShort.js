import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import styles from './SongItemShort.module.scss';
import images from '~/assets';
import { setIsPlay } from '~/redux/audioSlice';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SongItemShort({ data, className, onClick, active, large }) {
    const dispatch = useDispatch();
    const isPlay = useSelector((state) => state.audio.isPlay);
    const songId = useSelector((state) => state.audio.songId);
    return (
        <div
            onDoubleClick={onClick}
            className={cx(
                'wrapper',
                (data.streamingStatus === 1 && data.isWorldWide === true) ||
                    data.type === 'livestream' ||
                    data.isWorldWide === true
                    ? ''
                    : 'vip',
                className,
                songId === data.encodeId && 'playing',
                large && 'large',
                active && 'bg',
            )}
        >
            <div className={cx('avatar')}>
                <img src={data.thumbnail} alt={data.alias} />

                {songId === data.encodeId && isPlay ? (
                    <div onClick={() => dispatch(setIsPlay(false))} className={cx('song-play', 'gift')}></div>
                ) : (
                    ''
                )}
                {songId === data.encodeId && isPlay === false ? (
                    <div onClick={() => dispatch(setIsPlay(true))} className={cx('song-play')}>
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                ) : (
                    ''
                )}
                {songId !== data.encodeId ? (
                    <div onClick={onClick} className={cx('song-play')}>
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className={cx('info')}>
                <div className={cx('song-title')}>
                    <span className={cx('title')}>Bài hát</span>
                    <div className={cx('name')}>
                        <span>{data.title}</span>
                        {(data.streamingStatus === 1 && data.isWorldWide === true) || data.type === 'livestream' ? (
                            ''
                        ) : (
                            <span className={cx('vip-label')}>
                                <img src={images.vipLabel} alt="vip" />
                            </span>
                        )}
                    </div>
                </div>
                <div className={cx('artists')}>
                    {data.artists ? (
                        data.artists.map((artist, index) => (
                            <span key={artist.id}>
                                <Link to={artist.link} className={cx('singers')} state={{ artistName: artist.alias }}>
                                    {artist.name}
                                </Link>
                                {index + 1 === data.artists.length ? '' : ', '}
                            </span>
                        ))
                    ) : (
                        <span className={cx('artists')}>{data.artistsNames}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SongItemShort;
