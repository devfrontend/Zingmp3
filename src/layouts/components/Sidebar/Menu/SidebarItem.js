import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './SidebarItem.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setIsExtendSidebar } from '~/redux/audioSlice';

const cx = classNames.bind(styles);

function SidebarItems({ title, to, icon, play, notactive, liveicon }) {
    const dispatch = useDispatch();
    const isExtendSidebar = useSelector((state) => state.audio.isExtendSidebar);
    const handleScaleSidebar = () => {
        dispatch(setIsExtendSidebar(false));
    };
    return (
        <NavLink
            className={(nav) =>
                cx('wrapper', isExtendSidebar && 'extend-sidebar', { active: nav.isActive }, notactive && 'not-active')
            }
            to={to}
            icon={icon}
            onClick={handleScaleSidebar}
        >
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('title', isExtendSidebar && 'show')}>{title}</span>
            {liveicon && (
                <img
                    src="https://zjs.zmdcdn.me/zmp3-desktop/dev/147506/static/media/live-tag.e25dd240.svg"
                    alt=""
                    className={cx('liveicon')}
                />
            )}
            {play && (
                <span className={cx('icon-play')}>
                    <FontAwesomeIcon icon={faCirclePlay} />
                </span>
            )}
        </NavLink>
    );
}
export default SidebarItems;
