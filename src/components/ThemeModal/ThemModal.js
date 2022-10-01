import { useDispatch } from 'react-redux';
import styles from './ThemModal.module.scss';
import classNames from 'classnames/bind';
import ThemItem from './ThemItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { setIsOpenThemModal, setTheme } from '~/redux/audioSlice';
import { themeDynamics } from '~/data/Theme';
const cx = classNames.bind(styles);
export default function ThemModal() {
    const dispatch = useDispatch();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2>Giao Diện</h2>
                <span
                    className={cx('icon')}
                    onClick={() => {
                        dispatch(setIsOpenThemModal(false));
                    }}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </span>
            </div>
            <div className={cx('content')}>
                <div className={cx('section')}>
                    <div className={cx('grid')}>
                        {themeDynamics.map((theme, index) => (
                            <ThemItem data={theme} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
