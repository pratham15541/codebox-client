export const assembly = await import("ace-builds/src-min-noconflict/mode-assembly_x86")
export const ats = await import("ace-builds/src-min-noconflict/mode-plain_text")
export const bash = await import("ace-builds/src-min-noconflict/mode-batchfile")
export const c = await import("ace-builds/src-min-noconflict/mode-c_cpp")
export const clisp = await import("ace-builds/src-min-noconflict/mode-lisp")
export const clojure = await import("ace-builds/src-min-noconflict/mode-clojure")
export const cobol = await import("ace-builds/src-min-noconflict/mode-cobol")
export const coffescript = await import("ace-builds/src-min-noconflict/mode-coffee")
export const cpp = await import("ace-builds/src-min-noconflict/mode-c_cpp")
export const crystal = await import("ace-builds/src-min-noconflict/mode-crystal")
export const csharp = await import("ace-builds/src-min-noconflict/mode-csharp")
export const d = await import("ace-builds/src-min-noconflict/mode-d")
export const dart = await import("ace-builds/src-min-noconflict/mode-dart")
export const elixir = await import("ace-builds/src-min-noconflict/mode-elixir")
export const elm = await import("ace-builds/src-min-noconflict/mode-elm")
export const erlang = await import("ace-builds/src-min-noconflict/mode-erlang")
export const fsharp = await import("ace-builds/src-min-noconflict/mode-fsharp")
export const go = await import("ace-builds/src-min-noconflict/mode-golang")
export const groovy = await import("ace-builds/src-min-noconflict/mode-groovy")
export const guile = await import("ace-builds/src-min-noconflict/mode-scheme")
export const hare = await import("ace-builds/src-min-noconflict/mode-plain_text")
export const haskell = await import("ace-builds/src-min-noconflict/mode-haskell")
export const html = await import("ace-builds/src-min-noconflict/mode-html")
export const idris = await import("ace-builds/src-min-noconflict/mode-plain_text")
export const java = await import("ace-builds/src-min-noconflict/mode-java")
export const javascript = await import("ace-builds/src-min-noconflict/mode-javascript")
export const julia = await import("ace-builds/src-min-noconflict/mode-julia")
export const kotlin = await import("ace-builds/src-min-noconflict/mode-kotlin")
export const lua = await import("ace-builds/src-min-noconflict/mode-lua")
export const mercury = await import("ace-builds/src-min-noconflict/mode-plain_text")
export const nim = await import("ace-builds/src-min-noconflict/mode-nim")
export const nix = await import("ace-builds/src-min-noconflict/mode-nix")
export const ocaml = await import("ace-builds/src-min-noconflict/mode-ocaml")
export const pascal = await import("ace-builds/src-min-noconflict/mode-pascal")
export const perl = await import("ace-builds/src-min-noconflict/mode-perl")
export const php = await import("ace-builds/src-min-noconflict/mode-php")
export const plaintext = await import("ace-builds/src-min-noconflict/mode-plain_text")
export const python = await import("ace-builds/src-min-noconflict/mode-python")
export const raku = await import("ace-builds/src-min-noconflict/mode-raku")
export const ruby = await import("ace-builds/src-min-noconflict/mode-ruby")
export const rust = await import("ace-builds/src-min-noconflict/mode-rust")
export const sac = await import("ace-builds/src-min-noconflict/mode-sac")
export const scala = await import("ace-builds/src-min-noconflict/mode-scala")
export const swift = await import("ace-builds/src-min-noconflict/mode-swift")
export const typescript = await import("ace-builds/src-min-noconflict/mode-typescript")
export const zig = await import("ace-builds/src-min-noconflict/mode-plain_text")
export const json = await import("ace-builds/src-min-noconflict/mode-json")
export const css = await import("ace-builds/src-min-noconflict/mode-css")
export const svg = await import("ace-builds/src-min-noconflict/mode-svg")
export const yaml = await import("ace-builds/src-min-noconflict/mode-yaml")
export const hjson = await import("ace-builds/src-min-noconflict/mode-hjson")
export const handlebars = await import("ace-builds/src-min-noconflict/mode-handlebars")
export const ejs = await import("ace-builds/src-min-noconflict/mode-ejs")
export const gitignore = await import("ace-builds/src-min-noconflict/mode-gitignore")
export const jsx = await import("ace-builds/src-min-noconflict/mode-jsx")
export const markdown = await import("ace-builds/src-min-noconflict/mode-markdown")
export const xml = await import("ace-builds/src-min-noconflict/mode-xml")
export const dockerfile = await import("ace-builds/src-min-noconflict/mode-dockerfile")


export const languageMappings = {
  assembly: "assembly_x86",
  ats: "plain_text",
  bash: "batchfile",
  c: "c_cpp",
  clisp: "lisp",
  clojure: "clojure",
  cobol: "cobol",
  coffeescript: "coffee",
  cpp: "c_cpp",
  crystal: "crystal",
  csharp: "csharp",
  d: "d",
  dart: "dart",
  elixir: "elixir",
  elm: "elm",
  erlang: "erlang",
  fsharp: "fsharp",
  go: "golang",
  groovy: "groovy",
  guile: "plain_text",
  hare: "haskell_cabal",
  haskell: "haskell",
  html: "html",
  idris: "plain_text",
  java: "java",
  javascript: "javascript",
  julia: "julia",
  kotlin: "kotlin",
  lua: "lua",
  mercury: "plain_text",
  nim: "nim",
  nix: "nix",
  ocaml: "ocaml",
  pascal: "pascal",
  perl: "perl",
  php: "php",
  plaintext: "plain_text",
  python: "python",
  raku: "raku",
  ruby: "ruby",
  rust: "rust",
  sac: "sac",
  scala: "scala",
  swift: "swift",
  typescript: "typescript",
  zig: "plain_text",
};


export const languageExtension ={
  asm: "assembly_x86",
  dats: "plain_text",
  bat: "batchfile",
  sh:'batchfile',
  c: "c_cpp",
  lsp: "lisp",  
  clj: "clojure",
  cob: "cobol",
  coffee: "coffee",
  cpp: "c_cpp",
  cr: "crystal",
  cs: "csharp",
  d: "d",
  dart: "dart",
  ex: "elixir",
  elm: "elm",
  erl: "erlang",
  fs: "fsharp",
  go: "golang",
  groovy: "groovy",
  scm: "scheme",
  ha: "plain_text",
  hs: "haskell",
  html: "html",
  idr: "plain_text",
  java: "java",
  js: "javascript",
  jl: "julia",
  kt: "kotlin",
  lua: "lua",
  mercury: "plain_text",
  nim: "nim",
  nix: "nix",
  ml: "ocaml",
  pp: "pascal",
  pl: "perl",
  php: "php",
  txt: "plain_text",
  py: "python",
  raku: "raku",
  rb: "ruby",
  rs: "rust",
  sac: "sac",
  scala: "scala",
  swift: "swift",
  ts: "typescript",
  zig: "plain_text",
  json: "json",
  css:"css",
  svg:"svg",
  yaml:"yaml",
  hjson:"hjson",
  hbs:"handlebars",
  ejs : "ejs",
  gitignore: "gitignore",
  jsx:"jsx",
  md:"markdown",
  xml:"xml",
  dockerfile:"dockerfile",
}
