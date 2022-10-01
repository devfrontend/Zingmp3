import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import request from '~/utils/httpRequest';
import styles from './Top100.module.scss';
import Loading from '../Loading';
import Section from '~/components/Section';
import Item from '~/components/Item';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Top100() {
    const [data, setData] = useState([]);
    const themeCurrent = useSelector((state) => state.audio.themeCurrent);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        request.get('/top100').then((res) => {
            setIsLoading(false);
            setData(res.data);
            document.title = 'Top 100-Tuyển tập nhạc hay chọn lọc';
        });
    }, []);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('banner')}>
                    <h1 className={cx('title')}>TOP 100</h1>
                    {!themeCurrent.backgroundImg && !themeCurrent.backgroundImgLarge && (
                        <>
                            <div className={cx('bg-blur')}></div>
                            <div className={cx('bg-alpha')}></div>
                            <div className={cx('bg-alpha1')}></div>
                        </>
                    )}
                </div>
                {data.map((sections, index) => (
                    <Section key={index} title={sections.title}>
                        {sections.items.map((item) => (
                            <Item key={item.encodeId} data={item} />
                        ))}
                    </Section>
                ))}
            </div>
        );
    }
}

export default Top100;
