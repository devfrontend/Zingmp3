import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import request from '~/utils/httpRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';
import Button from '~/components/Button';
import SongItem from '~/components/SongItem';
import { useNavigate } from 'react-router-dom';
import {
    setSongId,
    setInfoSongPlayer,
    setIsPlay,
    setLoop,
    setPlaylistSong,
    setIsRadioPlay,
    setPlaylistRandom,
} from '~/redux/audioSlice';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [disableBtn, setDisableBtn] = useState(true);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const inputRef = useRef();
    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        request
            .get(`/search`, {
                params: {
                    keyword: debouncedValue,
                },
            })
            .then((res) => {
                setSearchResult(res.data.songs || []);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setDisableBtn(true);
        setSearchResult([]);
        inputRef.current.focus();
    };
    const handleSearchClick = () => {
        localStorage.setItem('searchKeyWord', inputRef.current.value);
        setSearchValue(inputRef.current.value);
        setShowResult(false);
    };
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
            setDisableBtn(false);
        }
    };
    const handleKeyPress = (e) => {
        const searchValue = e.target.value;
        if (e.key === 'Enter') {
            localStorage.setItem('searchKeyWord', searchValue);
            setSearchValue(searchValue);
            setShowResult(false);
            navigate(`/search/${searchValue}`);
        }
    };
    const handlePlaySong = (song) => {
        dispatch(setIsRadioPlay(false));
        dispatch(setIsPlay(false));
        dispatch(setSongId(song.encodeId));
        dispatch(setInfoSongPlayer(song));
        dispatch(setPlaylistSong([song]));
        dispatch(setPlaylistRandom([song]));
        dispatch(setLoop(true));
    };
    return (
        <div className={cx('wrapper')}>
            <Tippy
                placement="bottom"
                visible={showResult}
                render={(attrs) =>
                    debouncedValue ? (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <h3 className={cx('search-title')}>Gợi ý kết quả</h3>
                            {searchResults.map((searchResult) => (
                                <SongItem
                                    type="mini"
                                    key={searchResult.encodeId}
                                    data={searchResult}
                                    onClick={() => handlePlaySong(searchResult)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <h3 className={cx('search-title')}>Đề xuất cho bạn</h3>
                        </div>
                    )
                }
                interactive
                onClickOutside={() => {
                    setShowResult(false);
                }}
            >
                <div className={cx('search-fields', showResult && 'bg')}>
                    <Button to={`/search/${searchValue}`} onClick={handleSearchClick}>
                        <FontAwesomeIcon
                            icon={faSearch}
                            className={cx('search-btn', (disableBtn || !searchValue) && 'disabled')}
                        />
                    </Button>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        spellCheck={false}
                        className={cx('search-input')}
                        placeholder="Tìm kiếm bài hát, nghệ sĩ , lời bài hát..."
                        onChange={handleChange}
                        onFocus={() => {
                            setShowResult(true);
                        }}
                        onKeyPress={handleKeyPress}
                    />
                    {!!searchValue && (
                        <Button className={cx('clear-btn')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </Button>
                    )}
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
