import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import request from '~/utils/httpRequest';
import Loading from '../Loading';
import styles from './DetailHub.module.scss';
import Section from '~/components/Section';
import Item from '~/components/Item';

const cx = classNames.bind(styles);

function DetailHub() {
    const location = useLocation();
    const { id } = location.state;
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        request.get(`/category/${id}`).then((res) => {
            setData(res.data);
            setIsLoading(false);
        });
    }, [id]);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('banner')}>
                    <img src={data.cover} alt={data.link} />
                    <span className={cx('overlay')}></span>
                </div>
                <div className={cx('section')}>
                    {data.sections.map(
                        (section) =>
                            section.sectionType === 'playlist' && (
                                <Section key={section.title} title={section.title}>
                                    {section.items.map((item) => (
                                        <Item key={item.encodeId} data={item} />
                                    ))}
                                </Section>
                            ),
                    )}
                </div>
            </div>
        );
    }
}

export default DetailHub;
