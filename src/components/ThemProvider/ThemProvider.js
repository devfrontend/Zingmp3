import { useSelector } from 'react-redux';
export default function ThemProvider({ children }) {
    const themeCurrent = useSelector((state) => state.audio.themeCurrent);
    console.log(themeCurrent);
    document.documentElement.style.setProperty('--primary-bg', themeCurrent.color.primaryBg);
    document.documentElement.style.setProperty('--layout-bg', themeCurrent.color.layoutBg);
    document.documentElement.style.setProperty('--sidebar-popup-bg', themeCurrent.color.sideBarPopupBg);
    document.documentElement.style.setProperty('--alpha-layout-bg', themeCurrent.color.alphaLayoutBg);
    document.documentElement.style.setProperty('--queue-player-popup-bg', themeCurrent.color.queueLayoutPopupBg);
    document.documentElement.style.setProperty('--blur-queue-bg', themeCurrent.color.blurQueueBg);
    document.documentElement.style.setProperty('--purple-primary', themeCurrent.color.purplePrimary);
    document.documentElement.style.setProperty('--link-text-hover', themeCurrent.color.linkTextHover);
    document.documentElement.style.setProperty('--chart-bg-img-alpha', themeCurrent.color.chartBgImgAlpha);
    document.documentElement.style.setProperty('--chart-box-bg-alpha', themeCurrent.color.chartBoxBgAlpha);
    document.documentElement.style.setProperty('--alpha-active-sidebar', themeCurrent.color.alphaActiveSidebar);
    document.documentElement.style.setProperty('--white', themeCurrent.color.white);
    document.documentElement.style.setProperty('--link-text', themeCurrent.color.linkText);
    document.documentElement.style.setProperty('--grey', themeCurrent.color.grey);

    if (themeCurrent.backgroundImg) {
        document.body.style.backgroundImage = `url('${themeCurrent.backgroundImg}')`;
    } else if (themeCurrent.backgroundImgLarge) {
        document.body.style.backgroundImage = `url('${themeCurrent.backgroundImgLarge}')`;
    } else {
        document.body.style.backgroundImage = 'none';
    }
    console.log(document.body.querySelector('#root'));
    return <div>{children}</div>;
}
