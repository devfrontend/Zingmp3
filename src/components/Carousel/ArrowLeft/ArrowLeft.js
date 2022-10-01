import classNames from 'classnames/bind';
import styles from './ArrowLeft.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ArrowLeft({ onClick }) {
    return (
        <Button cirlcel={true} onClick={onClick} className={cx('wrapper')}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
    );
}

export default ArrowLeft;
