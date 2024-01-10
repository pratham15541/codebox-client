import Babel from "https://unpkg.com/prettier@3.1.1/plugins/babel.mjs";
import Estree from "https://unpkg.com/prettier@3.1.1/plugins/estree.mjs";
import Html from "https://unpkg.com/prettier@3.1.1/plugins/html.mjs";
import TypeScript from "https://unpkg.com/prettier@3.1.1/plugins/typescript.mjs";
import Markdown from "https://unpkg.com/prettier@3.1.1/plugins/markdown.mjs";
import Yaml from "https://unpkg.com/prettier@3.1.1/plugins/yaml.mjs";
import Css from 'https://unpkg.com/prettier@3.1.1/plugins/postcss.mjs'
import GraphQl from 'https://unpkg.com/prettier@3.1.1/plugins/graphql.mjs'



export const prettierPlugins = {
    js: [Babel,Estree,Html],
    ts:[TypeScript,Babel,Estree,Html],
    md: [Markdown],
    yaml: [Yaml],
    html: [Html,Babel,Estree],
    css:[Css],
    graphql:[GraphQl],
    gql:[GraphQl],

}

export const parsers = {
    js: "babel",
    ts: "babel",
    md: "markdown",
    yaml: "yaml",
    html: "html",
    css:"css",
    graphql:"graphql",
    gql:"graphql",

}