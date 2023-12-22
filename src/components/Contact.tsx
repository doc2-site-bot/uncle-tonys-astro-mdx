import styles from './Contact.module.css';
import { path } from '@stores/url';
import type { ComponentChildren } from 'preact';

type Props = {
    children: ComponentChildren;
    address: string;
}

const mapsKey = 'AIzaSyDVLquTAWKVDTDeJn9_HRK6OAemT_UOb14';

export default function Contact(props: Props) {
    const src = `https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${props.address.replaceAll(' ', '+')}`;

    return <div class={styles.contact}>
        {props.children}
        {path.get() && (
            <div>
                <iframe
                    title="Maps"
                    width="500"
                    height="500"
                    referrerpolicy="no-referrer-when-downgrade"
                    src={src} />
            </div>
        )}
    </div>;
}
