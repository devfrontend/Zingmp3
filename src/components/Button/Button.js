import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    button = true,
    cirlcel = false,
    circlem = false,
    circles = false,
    roundedm = false,
    roundeds = false,
    purple = false,
    children,
    onClick,
    className,
    to,
    href,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx({
        [className]: className,
        button,
        cirlcel,
        circlem,
        circles,
        roundedm,
        roundeds,
        purple,
        className,
    });

    return (
        <Comp className={classes} onClick={onClick} {...props}>
            {children}
        </Comp>
    );
}
export default Button;
