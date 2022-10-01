import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Section.module.scss';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Section({ title, data, btn, children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3 className={cx('title')}>{title || 'Playlist/Album'}</h3>
                {btn && (
                    <Link to={data.link} state={{ id: data.encodeId }} className={cx('category-link')}>
                        <span className={cx('btn-all')}>Tất cả</span>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </span>
                    </Link>
                )}
            </div>
            <div className={cx('grid')}>{children}</div>
        </div>
    );
}

export default Section;
