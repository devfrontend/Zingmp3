import { Link } from 'react-router-dom';
import styles from './Artist.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function SongItemShort({ data, onClick, active }) {
    return (
        <div onDoubleClick={onClick}>
            {data.artists[0] ? (
                <Link
                    to={data.artists[0].link}
                    state={{ artistName: data.artists[0].alias }}
                    className={cx('wrapper', active && 'bg')}
                >
                    <div className={cx('avatar')}>
                        <img src={data.artists[0].thumbnailM} alt={data.alias} />
                    </div>
                    <div className={cx('info')}>
                        <span className={cx('title')}>Nghệ sĩ</span>
                        <div className={cx('singers')}>{data.artists[0].name}</div>
                    </div>
                </Link>
            ) : (
                <span className={cx('artists')}>{data.artistsNames}</span>
            )}
        </div>
    );
}

export default SongItemShort;
