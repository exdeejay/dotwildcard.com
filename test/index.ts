import { compile } from "@mdx-js/mdx";
import { inspect } from 'unist-util-inspect';
import remarkFrontmatter from 'remark-frontmatter';
import {u} from 'unist-builder';

const source = `---
title: testing
publish: 2023-02-23
description: yo??
---

<Bro>

# A thing

welcome to \`Promise.any()\`! 

\`\`\`hlsl
float4 vert(float3 id: SV_VertexID): SV_Position {
    return float4(1.0);
}
\`\`\`

<Thing />

</Bro>

`;

async function main() {
    let file = await compile(source, {
        remarkPlugins: [remarkFrontmatter, () => (tree, file) => {
            console.log(tree.children[1].data);
            
            // tree.children = [
            //     u('mdxJsxFlowElement', {
            //         name: 'Wrapper',
            //         attributes: [],
            //         position:
            //     }, [tree.children])
            // ];
        }]
    });
}

main();
