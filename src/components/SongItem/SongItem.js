import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines, faMusic, faPlay, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './SongItem.module.scss';
import images from '~/assets';
import { setIsPlay } from '~/redux/audioSlice';

const cx = classNames.bind(styles);

function SongItem({ serial, data, index, type, className, onClick, noticon, violet }) {
    const dispatch = useDispatch();
    const isPlay = useSelector((state) => state.audio.isPlay);
    const songId = useSelector((state) => state.audio.songId);
    const topClass = (index) => {
        if (index === 0) {
            return 'top-1';
        } else if (index === 1) {
            return 'top-2';
        } else if (index === 2) {
            return 'top-3';
        } else return;
    };

    return data ? (
        <div
            onDoubleClick={onClick}
            className={cx(
                'wrapper',
                type,
                (data.streamingStatus === 1 && data.isWorldWide === true) ||
                    data.type === 'livestream' ||
                    data.isWorldWide === true
                    ? ''
                    : 'vip',
                className,
                violet && 'violet',
                songId === data.encodeId && 'playing',
            )}
        >
            <div className={cx('content-left')}>
                {serial && <p className={cx('serial', topClass(index))}>{index + 1}</p>}
                <div className={cx('icon-gridline', noticon && 'hidden-icon')}>
                    {serial ? <FontAwesomeIcon icon={faGripLines} /> : <FontAwesomeIcon icon={faMusic} />}
                </div>
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
                        <span className={cx('name')}>{data.title}</span>
                        {(data.streamingStatus === 1 && data.isWorldWide === true) || data.type === 'livestream' ? (
                            ''
                        ) : (
                            <span className={cx('vip-label')}>
                                <img src={images.vipLabel} alt="vip" />
                            </span>
                        )}
                    </div>
                    <div className={cx('artists')}>
                        {data.artists ? (
                            data.artists.map((artist, index) => (
                                <span key={artist.id}>
                                    <Link
                                        to={artist.link}
                                        className={cx('singers')}
                                        state={{ artistName: artist.alias }}
                                    >
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
            <div className={cx('content-center')}>
                {data.album ? (
                    <Link className={cx('album')} to={data.album.link} state={{ id: data.album.encodeId }}>
                        {data.album.title}
                    </Link>
                ) : (
                    <></>
                )}
            </div>
            {data.type === 'livestream' ? (
                ''
            ) : (
                <div className={cx('content-right')}>
                    <p className={cx('song-time')}>
                        {Math.floor(data.duration / 60) < 10
                            ? '0' + Math.floor(data.duration / 60)
                            : Math.floor(data.duration / 60)}
                        :{data.duration % 60 < 10 ? '0' + (data.duration % 60) : data.duration % 60}
                    </p>
                </div>
            )}
        </div>
    ) : (
        <div className={cx('wrapper', type, 'no-content')}>
            <div className={cx('content-left')}>
                <div className={cx('icon')}>
                    <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                </div>
                <div className={cx('info')}>
                    <span className={cx('title')}>NAME</span>
                </div>
            </div>
            <div className={cx('content-center')}>
                <span className={cx('title')}>ALBUM</span>
            </div>
            <div className={cx('content-right')}>
                <p className={cx('title')}>THỜI GIAN</p>
            </div>
        </div>
    );
}

export default SongItem;
