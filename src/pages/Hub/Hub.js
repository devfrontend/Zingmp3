import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import request from '~/utils/httpRequest';
import styles from './Hub.module.scss';
import Loading from '../Loading';
import Section from '~/components/Section';
import Item from '~/components/Item';
import ItemTopic from '~/components/ItemTopic';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Hub() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [topic, setTopic] = useState([]);
    const [isFullList, setIsFullList] = useState(false);
    const [contentBtn, setContentBtn] = useState('TẤT CẢ');

    const handleLists = () => {
        if (isFullList) {
            setTopic(data.topic.slice(0, 8));
            setIsFullList(!isFullList);
            setContentBtn('Xem Tất Cả');
        } else {
            setTopic(data.topic);
            setIsFullList(!isFullList);
            setContentBtn('Thu gọn');
        }
    };

    useEffect(() => {
        request.get('/category').then((res) => {
            setIsLoading(false);
            setData(res.data);
            setTopic(res.data.topic.slice(0, 8));
            document.title = 'Chủ Đề Nhạc Hot | Tuyển tập nhạc hay chọn lọc';
        });
    }, []);
    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('img')}>
                    <img
                        src="https://photo-zmp3.zmdcdn.me/cover/d/2/2/3/d223524cfa359d16b2c0d6e4497c126f.jpg"
                        alt=""
                    ></img>
                </div>
                <div className={cx('topic')}>
                    <h3 className={cx('title')}>Tâm Trạng Và Hoạt Động</h3>
                    <div className={cx('grid')}>
                        {topic.map((item) => (
                            <ItemTopic key={item.encodeId} data={item} type="topic" />
                        ))}
                    </div>
                    <Button roundedm onClick={handleLists} className={cx('btn-more')}>
                        {contentBtn}
                    </Button>
                </div>
                {data.genre.map((section) => (
                    <Section title={section.title} key={section.encodeId} data={section} btn={true}>
                        {section.playlists.slice(0, 5).map((playlist) => (
                            <Item key={playlist.encodeId} data={playlist} />
                        ))}
                    </Section>
                ))}
            </div>
        );
    }
}

export default Hub;
