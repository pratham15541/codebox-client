// export const javascript = await import('ace-builds/src-min-noconflict/worker-javascript?url')
// export const base = await import('ace-builds/src-min-noconflict/worker-base?url')
// export const coffee = await import('ace-builds/src-min-noconflict/worker-coffee?url')
// export const css = await import('ace-builds/src-min-noconflict/worker-css?url')
// export const html = await import('ace-builds/src-min-noconflict/worker-html?url')
// export const json = await import('ace-builds/src-min-noconflict/worker-json?url')
// export const lua = await import('ace-builds/src-min-noconflict/worker-lua?url')
// export const php = await import('ace-builds/src-min-noconflict/worker-php?url')
// export const xml = await import('ace-builds/src-min-noconflict/worker-xml?url')
// export const xquery = await import('ace-builds/src-min-noconflict/worker-xquery?url')
// export const yaml = await import('ace-builds/src-min-noconflict/worker-yaml?url')   


export const workerModules = {
    javascript: import('ace-builds/src-min-noconflict/worker-javascript?url'),
    base: import('ace-builds/src-min-noconflict/worker-base?url'),
    coffee: import('ace-builds/src-min-noconflict/worker-coffee?url'),
    css: import('ace-builds/src-min-noconflict/worker-css?url'),
    html: import('ace-builds/src-min-noconflict/worker-html?url'),
    json: import('ace-builds/src-min-noconflict/worker-json?url'),
    lua: import('ace-builds/src-min-noconflict/worker-lua?url'),
    php: import('ace-builds/src-min-noconflict/worker-php?url'),
    xml: import('ace-builds/src-min-noconflict/worker-xml?url'),
    xquery: import('ace-builds/src-min-noconflict/worker-xquery?url'),
    yaml: import('ace-builds/src-min-noconflict/worker-yaml?url'),
  };