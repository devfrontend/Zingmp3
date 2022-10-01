import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import Buttons from '../Button';

const cx = classNames.bind(styles);

function Item({ data }) {
    return (
        <div key={data.encodeId} className={cx('wrapper')}>
            <div className={cx('img-thumb')}>
                <Link to={data.link} state={{ id: data.encodeId }}>
                    <Buttons circlem className={cx('play')}>
                        <FontAwesomeIcon icon={faPlay} />
                    </Buttons>
                    <img src={data.thumbnailM || data.thumbnailR} alt={data.sortDescription} />
                </Link>
            </div>
            <div className={cx('info')}>
                <Link to={data.link} state={{ id: data.encodeId }}>
                    <h3 className={cx('name')}>{data.title}</h3>
                </Link>
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
            </div>
        </div>
    );
}

export default Item;
