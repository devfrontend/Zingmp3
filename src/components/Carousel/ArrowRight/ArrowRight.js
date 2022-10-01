import classNames from 'classnames/bind';
import styles from './ArrowRight.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ArrowRight({ onClick }) {
    return (
        <Button cirlcel={true} onClick={onClick} className={cx('wrapper')}>
            <FontAwesomeIcon icon={faChevronRight} />
        </Button>
    );
}

export default ArrowRight;
