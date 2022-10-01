import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ChartSongs.module.scss';
import SongItem from '~/components/SongItem';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ChartSongs({ data, onClick }) {
    const [topSongs, setTopSongs] = useState(data.RTChart.items.slice(0, 10));
    const [isFullList, setIsFullList] = useState(false);
    const [contentBtn, setContentBtn] = useState('Xem top 100');

    const handleLists = () => {
        if (isFullList) {
            setTopSongs(data.RTChart.items.slice(0, 10));
            setIsFullList(!isFullList);
            setContentBtn('Xem top 100');
        } else {
            setTopSongs(data.RTChart.items);
            setIsFullList(!isFullList);
            setContentBtn('Thu gọn');
        }
    };

    return (
        <div className={cx('wrapper')}>
            {topSongs.map((song, index) => (
                <SongItem
                    key={index}
                    serial={true}
                    data={song}
                    index={index}
                    onClick={() => onClick(song, data.RTChart.items, data.RTChart.sectionId)}
                />
            ))}
            <div className={cx('option-btn')}>
                <Button roundedm onClick={handleLists}>
                    {contentBtn}
                </Button>
            </div>
        </div>
    );
}

export default ChartSongs;
