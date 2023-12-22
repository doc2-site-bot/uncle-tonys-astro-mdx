import styles from './Menu.module.css';
import type { ComponentChildren } from 'preact';

type MenuProps = {
    children: ComponentChildren;
    sheet: string;
}

type MenuItemProps = {
    name: string;
    price: string;
    description?: string;
}

function MenuItem(props: MenuItemProps) {
    return (
        <div class={styles.menuItem}>
            <div>
                <span>{props.name}</span>
                <span>${props.price}</span>
            </div>
            {props.description && <p>{props.description}</p>}
        </div>
    );
}

export default function Menu(props: MenuProps) {
    const {keys, rows} : {
        rows: Array<{ [key: string]: string }>;
        keys: string[];
    } = JSON.parse(props.sheet);

    const isByType = keys.includes("type");
    const rowsByType: { [key: string]: Array<{ [key: string]: string }> } = {};
    if (isByType) {
        rows.forEach((row) => {
            if (!rowsByType[row.type]) {
                rowsByType[row.type] = [];
            }

            rowsByType[row.type].push(row);
        });
    }

    return (
        <div class={styles.menu}>
            <div>
                {props.children}
            </div>
            <div>
                {isByType
                    ? Object.keys(rowsByType).map((type) => {
                        return (
                            <div>
                                {rowsByType[type].length > 1 ? (
                                    <div class={styles.divider}>
                                        <strong>{type}</strong>
                                        {rowsByType[type].map((row) => (
                                            <MenuItem
                                                name={row.name}
                                                price={row.price}
                                                description={row.description}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <MenuItem
                                        name={type}
                                        price={rowsByType[type][0].price}
                                        description={rowsByType[type][0].name}
                                    />
                                )}
                            </div>
                        );
                    })
                    : rows.map((row) => {
                        const prices = Object.keys(row).filter((key) =>
                            key.startsWith("price")
                        );

                        if (prices.length > 1) {
                            return (
                                <div>
                                    <strong>{row.name}</strong>
                                    <p>{row.description}</p>
                                    <div class={styles.divider}>
                                        {prices.map((price) => (
                                            <MenuItem
                                                name={price.replace("price", "").replaceAll("-", " ")}
                                                price={row[price]}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <MenuItem
                                name={row.name}
                                price={row.price}
                                description={row.description}
                            />
                        );
                    })}
            </div>
        </div>
    );
}
