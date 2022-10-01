import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './CarouselItem.modul.scss';
import request from '~/utils/httpRequest';
import {
    setInfoSongPlayer,
    setIsPlay,
    setIsRadioPlay,
    setPlaylistId,
    setPlaylistRandom,
    setPlaylistSong,
    setSongId,
    setSrcAudio,
    setIsDisabled,
} from '~/redux/audioSlice';

const cx = classNames.bind(styles);

function CarouselItem({ className, data }) {
    const dispatch = useDispatch();
    const onClickItem = (id) => {
        request.get(`/song/info/${id}`).then((res) => {
            dispatch(setIsRadioPlay(false));
            dispatch(setSrcAudio(''));
            dispatch(setInfoSongPlayer(res.data));
            dispatch(setSongId(id));
            dispatch(setIsPlay(true));
            dispatch(setPlaylistId(''));
            dispatch(setPlaylistSong([]));
            dispatch(setPlaylistRandom([]));
            dispatch(setIsDisabled(false));
        });
    };

    return data.type === 4 ? (
        <Link key={data.encodeId} className={cx('wrapper')} to={data.link} state={{ id: data.encodeId }}>
            <img src={data.banner} alt={data.encodeId} className={cx('carousel-img')} />
        </Link>
    ) : (
        <div key={data.encodeId} className={cx('wrapper')} onClick={() => onClickItem(data.encodeId)}>
            <img src={data.banner} alt={data.encodeId} className={cx('carousel-img')} />
        </div>
    );
}

export default CarouselItem;
