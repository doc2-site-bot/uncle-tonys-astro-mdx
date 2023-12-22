import styles from './Hero.module.css';
import type { ComponentChildren } from 'preact';

type Props = {
    children: ComponentChildren;
}

export default function Hero(props: Props) {
    return <div class={styles.hero}>{props.children}</div>;
}
