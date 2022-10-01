import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Album.module.scss';

const cx = classNames.bind(styles);

function Album({ data }) {
    return (
        <div key={data.encodeId} className={cx('wrapper')}>
            <Link className={cx('img-thumb')} to={data.link} state={{ id: data.encodeId }}>
                <span className={cx('play')}>
                    <FontAwesomeIcon icon={faPlay} />
                </span>
                <img src={data.thumbnailM || data.thumbnailR} alt={data.sortDescription} />
            </Link>
            <div className={cx('info')}>
                <div className={cx('title')}>{data.title}</div>
                <div className={cx('singers')}>
                    {data.artists ? (
                        data.artists.map((artist, index) => (
                            <span key={artist.id}>
                                <Link to={artist.link} state={{ artistName: artist.alias }} className={cx('name')}>
                                    {artist.name}
                                </Link>
                                {index + 1 === data.artists.length ? '' : ', '}
                            </span>
                        ))
                    ) : (
                        <span className={cx('artists')}>{data.artistsNames}</span>
                    )}
                </div>
                <span className={cx('date')}>{data.releaseDate}</span>
            </div>
        </div>
    );
}
export default Album;
