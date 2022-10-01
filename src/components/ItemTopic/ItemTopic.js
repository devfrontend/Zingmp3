import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ItemTopic.module.scss';

const cx = classNames.bind(styles);

function ItemTopic({ data }) {
    return (
        <div key={data.encodeId} className={cx('wrapper')}>
            <Link to={data.link} state={{ id: data.encodeId }}>
                <img src={data.thumbnailM || data.thumbnailR} alt={data.sortDescription} />
            </Link>
        </div>
    );
}

export default ItemTopic;
