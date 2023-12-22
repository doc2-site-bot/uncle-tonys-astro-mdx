# Uncle Tony's with Astro and MDX

An [Astro](https://astro.build/) project transforming Google Docs into [MDX](https://mdxjs.com/) via [doc2.site](https://doc2.site) bootstrapped with:

```sh
npm create astro@latest -- --template with-mdx
```

Uncle Tony's is a fictitious restaurant in San Francisco.

## Live demo

https://uncle-tonys-astro-mdx.netlify.app/

## Content source

List of all published content and corresponding source for Uncle Tony’s.

Project: https://drive.google.com/drive/folders/1yAR0vQ6Di6va7X4Rtd-004iajFdNSH_v

* Header fragment: [source](https://docs.google.com/document/d/1eI8oYDbwJJti_iDKieDLPVQQqR6UZsauwsslM8VRhOk/edit) | [live](https://api.doc2.site/v1/docs/live/1yAR0vQ6Di6va7X4Rtd-004iajFdNSH_v?path=/fragments/header)
* Footer fragment: [source](https://docs.google.com/document/d/1vMFAmGdksMvwagImT6uJFruOUi82wpSf24T7-xlhRac/edit) | [live](https://api.doc2.site/v1/docs/live/1yAR0vQ6Di6va7X4Rtd-004iajFdNSH_v?path=/fragments/footer)
* Contact fragment: [source](https://docs.google.com/document/d/1xszDWLDgmz73rL0UBFqUrtFaFpJGSlme9hak-Bo7HC8/edit) | [live](https://api.doc2.site/v1/docs/live/1yAR0vQ6Di6va7X4Rtd-004iajFdNSH_v?path=/fragments/contact)
* Home page: [source](https://docs.google.com/document/d/1e0qp65umpw48YH23wGJuUseWRm_49R5NmmhvnboDSag/edit) | [live](https://api.doc2.site/v1/docs/live/1yAR0vQ6Di6va7X4Rtd-004iajFdNSH_v?path=/)
* Location & hours page: [source](https://docs.google.com/document/d/1o0lWfMw81fMFtBlW5UhoM7tQDvJr4whdaKaYcZb04-Y/edit) | [live](https://api.doc2.site/v1/docs/live/1yAR0vQ6Di6va7X4Rtd-004iajFdNSH_v?path=/location-hours)
* Menu page: [source](https://docs.google.com/document/d/1B6Hm2GTmLcgSXRSG4fZ-pw11EH5Ji9jaNsfv2dNRIVE/edit) | [live](https://api.doc2.site/v1/docs/live/1yAR0vQ6Di6va7X4Rtd-004iajFdNSH_v?path=/menu)
* Menu pizzas sheet: [source](https://docs.google.com/spreadsheets/d/14J339wZvnOj4QSqiZGxrZun1R6Mta4bkEJmVMdJkkGw/edit#gid=0) | [live](https://api.doc2.site/v1/spreadsheets/live/1yAR0vQ6Di6va7X4Rtd-004iajFdNSH_v/14J339wZvnOj4QSqiZGxrZun1R6Mta4bkEJmVMdJkkGw/0)
* Menu custom pizzas sheet: [source](https://docs.google.com/spreadsheets/d/14J339wZvnOj4QSqiZGxrZun1R6Mta4bkEJmVMdJkkGw/edit#gid=728803939) | [live](https://api.doc2.site/v1/spreadsheets/live/1yAR0vQ6Di6va7X4Rtd-004iajFdNSH_v/14J339wZvnOj4QSqiZGxrZun1R6Mta4bkEJmVMdJkkGw/728803939)
* Menu appetizers sheet: [source](https://docs.google.com/spreadsheets/d/14J339wZvnOj4QSqiZGxrZun1R6Mta4bkEJmVMdJkkGw/edit#gid=741875796) | [live](https://api.doc2.site/v1/spreadsheets/live/1yAR0vQ6Di6va7X4Rtd-004iajFdNSH_v/14J339wZvnOj4QSqiZGxrZun1R6Mta4bkEJmVMdJkkGw/741875796)
* Menu beverages sheet: [source](https://docs.google.com/spreadsheets/d/14J339wZvnOj4QSqiZGxrZun1R6Mta4bkEJmVMdJkkGw/edit#gid=1592046842) | [live](https://api.doc2.site/v1/spreadsheets/live/1yAR0vQ6Di6va7X4Rtd-004iajFdNSH_v/14J339wZvnOj4QSqiZGxrZun1R6Mta4bkEJmVMdJkkGw/1592046842)


## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) with your browser to see the result.

## Importer

To run the [import](scripts/import.js) script, run the command:

```bash
npm run import
``` 

The importer retrieves all published docs in the live workspace and converts them into MDX files under [pages](src/pages) 
and puts doc fragments into the [Content Collection](https://docs.astro.build/en/guides/content-collections/) [fragments](src/content/fragments) folder. The fragment MDX files are
imported and reused in Preact components and MDX pages.

The [MDX base layout](https://docs.astro.build/en/guides/markdown-content/#frontmatter-layout) is defined under [layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) and referenced in the frontmatter of the MDX pages.

To share state between components in the MDX pages, a basic [Nano Store](https://docs.astro.build/en/core-concepts/sharing-state/) is used [here](src/stores/url.ts).  

## Deployment

The project deploys static (SSG) pages on [Netlify](https://www.netlify.com/).

## Resources

To learn more, take a look at the following resources:

- [doc2.site docs](https://doc2.site/documentation) - learn about doc2.site features for authors and developers.
- [Astro docs](https://docs.astro.build/) - learn about Astro features and API.
- [MDX](https://mdxjs.com/)  - learn Markdown for the component era.
- [Preact docs](https://preactjs.com/) - learn about Preact features and API.
