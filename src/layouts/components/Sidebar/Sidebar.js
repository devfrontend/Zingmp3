import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import {
    faChartLine,
    faChevronLeft,
    faChevronRight,
    faCompactDisc,
    faIcons,
    faMusic,
    faPencil,
    faRadio,
    faStar,
} from '@fortawesome/free-solid-svg-icons';
import { SidebarItem } from './Menu';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import { setIsExtendSidebar } from '~/redux/audioSlice';
const cx = classNames.bind(styles);

function Sidebar() {
    const dispatch = useDispatch();
    const isExtendSidebar = useSelector((state) => state.audio.isExtendSidebar);
    const currentIndexSongRandom = useSelector((state) => state.audio.currentIndexSongRandom);
    const srcRadio = useSelector((state) => state.audio.srcRadio);
    const currentIndexSong = useSelector((state) => state.audio.currentIndexSong);
    const handleToggleExtend = () => {
        dispatch(setIsExtendSidebar(!isExtendSidebar));
    };
    const handleScaleSidebar = () => {
        dispatch(setIsExtendSidebar(false));
    };
    return (
        <div
            className={cx(
                'wrapper',
                isExtendSidebar && 'extend-sidebar',
                (currentIndexSongRandom || currentIndexSong || srcRadio) && 'fixed-height',
            )}
        >
            <div className={cx('sidebar-top')}>
                <Link className={cx('logo')} to="/" onClick={handleScaleSidebar} />
                <SidebarItem title="Khám phá" to="/" icon={<FontAwesomeIcon icon={faCompactDisc} />} />
                <SidebarItem
                    title="#zingchart"
                    to="/zing-chart"
                    play={true}
                    icon={<FontAwesomeIcon icon={faChartLine} />}
                />
                <SidebarItem
                    title="Radio"
                    to="/radio"
                    icon={<FontAwesomeIcon icon={faRadio} />}
                    liveicon={true}
                    play={true}
                />
            </div>
            <div className={cx('line')}>
                <div className={cx('inner-line')}></div>
            </div>
            <div className={cx('sidebar-bottom')}>
                <SidebarItem title="Nhạc mới" to="/newmusic" play={true} icon={<FontAwesomeIcon icon={faMusic} />} />
                <SidebarItem title="Thể loại" to="/hub" icon={<FontAwesomeIcon icon={faIcons} />} />
                <SidebarItem title="Top100" to="/top100" icon={<FontAwesomeIcon icon={faStar} />} />
                <div className={cx('box-update')}>
                    <div className={cx('title')}>Nghe nhạc không quảng cáo cùng kho nhạc VIP</div>
                    <div className={cx('btn-update')}>
                        <a href="https://www.google.com/">NÂNG CẤP VIP</a>
                    </div>
                </div>
                <div className={cx('library')}>
                    <div className={cx('library-title')}>
                        <span>THƯ VIỆN</span>
                        <Tippy content="Chỉnh sửa">
                            <span className={cx('pencil')}>
                                <FontAwesomeIcon icon={faPencil} />
                            </span>
                        </Tippy>
                    </div>
                </div>
            </div>
            <div className={cx('sidebar-button')}>
                <div className={cx('btn-addList')}>
                    <span className={cx('plus')}>+</span>
                    <span>Taọ playlist mới</span>
                </div>
                <div className={cx('btn-extend')}>
                    {isExtendSidebar ? (
                        <Button circlem={true} onClick={handleToggleExtend}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </Button>
                    ) : (
                        <Button circlem={true} onClick={handleToggleExtend}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Sidebar;
