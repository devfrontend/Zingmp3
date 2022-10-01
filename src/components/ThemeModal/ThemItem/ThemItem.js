import styles from './ThemItem.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setThemeCurrent, themeCurrent } from '~/redux/audioSlice';

const cx = classNames.bind(styles);
export default function ThemItem(data) {
    const themeCurrent = useSelector((state) => state.audio.themeCurrent);
    const dispatch = useDispatch();
    const datareceived = data.data;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('img', datareceived.id === themeCurrent.id && 'active')}>
                <Button
                    roundeds
                    purple
                    className={cx('btn', 'btn-apply')}
                    state={datareceived.color}
                    onClick={() => {
                        dispatch(setThemeCurrent(datareceived));
                    }}
                >
                    Áp dụng
                </Button>
                <Button roundeds className={cx('btn')}>
                    Xem trước
                </Button>
                <img src={datareceived.link} alt="img" />
            </div>
            <div className={cx('title')}>{datareceived.title}</div>
        </div>
    );
}
