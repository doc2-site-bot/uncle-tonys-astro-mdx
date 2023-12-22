import path from 'node:path';
import fs from 'node:fs';
import {toMdast} from 'hast-util-to-mdast';
import {toMarkdown} from 'mdast-util-to-markdown';
import {toHtml} from 'hast-util-to-html';
import {selectAll} from 'hast-util-select';
import {toText} from 'hast-util-to-text'

const project = '1yAR0vQ6Di6va7X4Rtd-004iajFdNSH_v';
const workspace = 'live';

(async () => {
    const reqDocs = await fetch(`https://api.doc2.site/v1/docs/search/${workspace}/${project}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: '[]',
            engine: 'JMESPath'
        })
    });

    if (!reqDocs.ok) {
        console.warn(reqDocs.status, await reqDocs.text());
        return;
    }

    const {data} = await reqDocs.json();

    for (const doc of data) {
        console.log(`Fetching "${doc.path}"`);

        const reqDoc = await fetch(`https://api.doc2.site/v1/docs/${workspace}/${project}?path=${doc.path}`);
        if (!reqDoc.ok) {
            console.warn(reqDoc.status, await reqDoc.text());
            continue;
        }

        console.log(`Writing "${doc.path}"`);

        const imports = [];
        const frontmatter = [
            `layout: '@layouts/BaseLayout.astro'`
        ];

        const {hast, components, references, meta} = await reqDoc.json();

        // Replace variables
        const variables = {
            year: {
                value: String(new Date().getFullYear()),
                href: "",
            },
            framework: {
                value: "Astro with MDX",
                href: "https://astro.build/",
            },
            host: {
                value: "Netlify",
                href: "http://netlify.com/",
            },
            repo: {
                value: "GitHub repository",
                href: "https://github.com/doc2-site-bot/uncle-tonys-astro-mdx",
            },
        };

        selectAll('var', hast).forEach((el) => {
            const variable = variables[toText(el)];

            if (variable) {
                if (variable.href) {
                    el.tagName = 'a';
                    el.properties = {
                        href: variable.href,
                        target: '_blank',
                        rel: 'noreferrer'
                    }
                }
                else {
                    el.tagName = 'span';
                }

                el.children[0].value = variable.value;
            }
        });

        // Header and Footer are handled in the BaseLayout
        const mainComponents = components.filter((component) => component !== 'web-header' && component !== 'web-footer');

        // Add metadata to frontmatter
        frontmatter.push(`title: ${meta.title}`);
        frontmatter.push(`description: ${meta.description}`);

        // Resolve sheets
        const resolvedSheets = [];
        const sheets = references.filter(ref => ref.type === 'spreadsheet');
        for (const sheet of sheets) {
            const reqSheet = await fetch(sheet.url);
            if (reqSheet.ok) {
                const {keys, rows} = await reqSheet.json();
                resolvedSheets.push({keys, rows, url: sheet.url});
            }
        }

        const toJSXComponent = (name) => {
            // Remove web namespace
            if (name.startsWith('web-')) {
                name = name.replace('web-', '');
            }

            name = name.split('-').map((s) => `${s[0].toUpperCase()}${s.slice(1).toLowerCase()}`).join('');

            // Fragment is already declared
            if (name === 'Fragment') {
                name = 'Frag';
            }

            return name;
        }

        const node2HTML = (state, node) => {
            // Convert content to markdown
            if (node.children.length) {
                const mdast = toMdast({
                    type: 'root',
                    children: [...node.children]
                });
                const content = toMarkdown(mdast);

                node.children = [{
                    type: 'text',
                    value: '\n'
                },
                {
                    type: 'text',
                    value: content
                },
                {
                    type: 'text',
                    value: '\n'
                }];
            }

            // Convert component name to JSX name
            node.tagName = toJSXComponent(node.tagName);

            if (node.tagName === 'Frag') {
                const {reference} = node.properties;
                const {searchParams} = new URL(reference);
                const importPath = searchParams.get('path').replace('/fragments/', '@fragments/');
                imports.push(`import {Content as Frag} from '${importPath}.mdx'`);
                delete node.properties.reference;
            }
            else if (node.tagName === 'Menu') {
                const {details} = node.properties;
                const sheet = resolvedSheets.find(({url}) => url === details);
                if (sheet) {
                    delete sheet.url;
                    node.properties.sheet = JSON.stringify(sheet);
                }
                delete node.properties.details;
            }

            const result = {type: 'html', value: toHtml(node)};

            state.patch(node, result);
            return result;
        }

        const handlers = {};
        mainComponents.forEach((tagName) => {
            handlers[tagName] = node2HTML;
        });

        // Import components
        mainComponents.filter(component => component !== 'fragment').forEach((component) => {
            const name = toJSXComponent(component);
            imports.push(`import ${name} from '@components/${name}'`);
        });

        const mdast = toMdast(hast, { handlers });
        const markdown = toMarkdown(mdast);

        // Write MDX file
        const isFragment = doc.path.startsWith('/fragments/');
        const dest = isFragment ? 'src/content' : 'src/pages';
        fs.mkdirSync(path.join(dest, path.dirname(doc.path)) , {recursive: true});

        const mdx = `${!isFragment && frontmatter.length ? `---\n${frontmatter.join('\n')}\n---\n\n` : ''}${imports.length ? `${imports.join('\n')}\n\n` : ''}${markdown}`;
        fs.writeFileSync(path.join(dest, `${doc.path === '/' ? 'index' : doc.path}.mdx`), mdx);
    }
})();


