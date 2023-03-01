import { u } from 'unist-builder';
import { Parser } from 'acorn';
import acornJsx from 'acorn-jsx';

function makeEsmNode(source) {
  return u(
    'mdxjsEsm',
    {
      data: {
        estree: Parser.extend(acornJsx()).parse(source, {
          ecmaVersion: 2020,
          sourceType: 'module',
        }),
      },
    },
    source
  );
}

export default function remarkMdxDefaultLayout() {
  return (tree, file) => {
    tree.children.unshift(
      makeEsmNode("import { Page } from '@/components/Page'"),
      makeEsmNode(`
            export function getStaticProps() {
              if (process.env.NODE_ENV !== 'development' && ${file.data.matter.draft} === true) {
                return {
                  notFound: true
                }
              }
              return {
                props: {}
              };
            }

            export default function ({ children }) {
                return <Page title="${file.data.matter.title}">{children}</Page>;
            }
        `)
    );
  };
}
