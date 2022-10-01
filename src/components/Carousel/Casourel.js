import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classNames from 'classnames/bind';
import styles from './Carousel.module.scss';
import CarouselItem from './CarouselItem';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';

const cx = classNames.bind(styles);

function Carousel({ data }) {
    const sliderItems = data.items;
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        swipeToSlide: true,
        styles: {
            backgroundColor: 'transparent',
        },
        nextArrow: <ArrowRight />,
        prevArrow: <ArrowLeft />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div className={cx('wrapper')}>
            <Slider {...settings}>
                {sliderItems.map((sliderItem) =>
                    sliderItem.type === 1 || sliderItem.type === 4 ? (
                        <CarouselItem key={sliderItem.encodeId} data={sliderItem} />
                    ) : (
                        ''
                    ),
                )}
            </Slider>
        </div>
    );
}

export default Carousel;
