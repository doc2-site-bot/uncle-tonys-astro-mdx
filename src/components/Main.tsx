import { path } from '@stores/url';
import type { ComponentChildren } from 'preact';

type Props = {
    children: ComponentChildren;
}

export default function Main(props: Props) {
    const mainClass = path.get().slice(1);
    return <main class={mainClass ? mainClass : 'root'}>{props.children}</main>;
}
