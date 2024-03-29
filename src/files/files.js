export const expressFiles = 
{
  "index.js": {
    "file": {
      "contents": "const express = require('express');\nconst app = express();\nconst port = 3111;\n\napp.get('/', (req, res) => {\n  res.send('Welcome to a WebContainers app! 🥳');\n});\n\napp.listen(port, () => {\n  console.log(`App is live at http://localhost:${port}`);\n});"
    }
  },
  "package.json": {
    "file": {
      "contents": "\n      {\n        \"name\":\"example-app\",\n        \"dependencies\":{\n           \"express\":\"latest\"\n        },\n        \"devDependencies\":{\n           \"nodemon\":\"latest\"\n        },\n        \"scripts\":{\n          \"dev\":\"nodemon --watch './' index.js\",\n          \"start\":\"node index.js\"\n        }\n     }"
    }
  }
}

export const viteVanillaFiles = {
  "public": {
    "directory": {
      "vite.svg": {
        "file": {
          "contents": "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--logos\" width=\"31.88\" height=\"32\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 256 257\"><defs><linearGradient id=\"IconifyId1813088fe1fbc01fb466\" x1=\"-.828%\" x2=\"57.636%\" y1=\"7.652%\" y2=\"78.411%\"><stop offset=\"0%\" stop-color=\"#41D1FF\"></stop><stop offset=\"100%\" stop-color=\"#BD34FE\"></stop></linearGradient><linearGradient id=\"IconifyId1813088fe1fbc01fb467\" x1=\"43.376%\" x2=\"50.316%\" y1=\"2.242%\" y2=\"89.03%\"><stop offset=\"0%\" stop-color=\"#FFEA83\"></stop><stop offset=\"8.333%\" stop-color=\"#FFDD35\"></stop><stop offset=\"100%\" stop-color=\"#FFA800\"></stop></linearGradient></defs><path fill=\"url(#IconifyId1813088fe1fbc01fb466)\" d=\"M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z\"></path><path fill=\"url(#IconifyId1813088fe1fbc01fb467)\" d=\"M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z\"></path></svg>"
        }
      }
    }
  },
  ".gitignore": {
    "file": {
      "contents": "# Logs\nlogs\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\npnpm-debug.log*\nlerna-debug.log*\n\nnode_modules\ndist\ndist-ssr\n*.local\n\n# Editor directories and files\n.vscode/*\n!.vscode/extensions.json\n.idea\n.DS_Store\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?\n"
    }
  },
  "counter.js": {
    "file": {
      "contents": "export function setupCounter(element) {\n  let counter = 0\n  const setCounter = (count) => {\n    counter = count\n    element.innerHTML = `count is ${counter}`\n  }\n  element.addEventListener('click', () => setCounter(counter + 1))\n  setCounter(0)\n}\n"
    }
  },
  "index.html": {
    "file": {
      "contents": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/vite.svg\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Vite App</title>\n  </head>\n  <body>\n    <div id=\"app\"></div>\n    <script type=\"module\" src=\"/main.js\"></script>\n  </body>\n</html>\n"
    }
  },
  "javascript.svg": {
    "file": {
      "contents": "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" aria-hidden=\"true\" role=\"img\" class=\"iconify iconify--logos\" width=\"32\" height=\"32\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 256 256\"><path fill=\"#F7DF1E\" d=\"M0 0h256v256H0V0Z\"></path><path d=\"m67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371c7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259c-19.245 0-30.416-9.967-36.087-21.996m85.07-2.576l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607c9.969 0 16.325-4.984 16.325-11.858c0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257c0-18.044 13.747-31.792 35.228-31.792c15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31c-7.046 0-11.514 4.468-11.514 10.31c0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804c0 21.654-17.012 33.51-39.867 33.51c-22.339 0-36.774-10.654-43.819-24.574\"></path></svg>"
    }
  },
  "main.js": {
    "file": {
      "contents": "import './style.css'\nimport javascriptLogo from './javascript.svg'\nimport viteLogo from '/vite.svg'\nimport { setupCounter } from './counter.js'\n\ndocument.querySelector('#app').innerHTML = `\n  <div>\n    <a href=\"https://vitejs.dev\" target=\"_blank\">\n      <img src=\"${viteLogo}\" class=\"logo\" alt=\"Vite logo\" />\n    </a>\n    <a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript\" target=\"_blank\">\n      <img src=\"${javascriptLogo}\" class=\"logo vanilla\" alt=\"JavaScript logo\" />\n    </a>\n    <h1>Hello Vite!</h1>\n    <div class=\"card\">\n      <button id=\"counter\" type=\"button\"></button>\n    </div>\n    <p class=\"read-the-docs\">\n      Click on the Vite logo to learn more\n    </p>\n  </div>\n`\n\nsetupCounter(document.querySelector('#counter'))\n"
    }
  },
  "package.json": {
    "file": {
      "contents": "{\n  \"name\": \"httpswebcontainerexpresstrialo-jmwv\",\n  \"private\": true,\n  \"version\": \"0.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"preview\": \"vite preview\"\n  },\n  \"devDependencies\": {\n    \"vite\": \"^5.0.0\"\n  }\n}\n"
    }
  },
  "style.css": {
    "file": {
      "contents": ":root {\n  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;\n  line-height: 1.5;\n  font-weight: 400;\n\n  color-scheme: light dark;\n  color: rgba(255, 255, 255, 0.87);\n  background-color: #242424;\n\n  font-synthesis: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\na {\n  font-weight: 500;\n  color: #646cff;\n  text-decoration: inherit;\n}\na:hover {\n  color: #535bf2;\n}\n\nbody {\n  margin: 0;\n  display: flex;\n  place-items: center;\n  min-width: 320px;\n  min-height: 100vh;\n}\n\nh1 {\n  font-size: 3.2em;\n  line-height: 1.1;\n}\n\n#app {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 2rem;\n  text-align: center;\n}\n\n.logo {\n  height: 6em;\n  padding: 1.5em;\n  will-change: filter;\n  transition: filter 300ms;\n}\n.logo:hover {\n  filter: drop-shadow(0 0 2em #646cffaa);\n}\n.logo.vanilla:hover {\n  filter: drop-shadow(0 0 2em #f7df1eaa);\n}\n\n.card {\n  padding: 2em;\n}\n\n.read-the-docs {\n  color: #888;\n}\n\nbutton {\n  border-radius: 8px;\n  border: 1px solid transparent;\n  padding: 0.6em 1.2em;\n  font-size: 1em;\n  font-weight: 500;\n  font-family: inherit;\n  background-color: #1a1a1a;\n  cursor: pointer;\n  transition: border-color 0.25s;\n}\nbutton:hover {\n  border-color: #646cff;\n}\nbutton:focus,\nbutton:focus-visible {\n  outline: 4px auto -webkit-focus-ring-color;\n}\n\n@media (prefers-color-scheme: light) {\n  :root {\n    color: #213547;\n    background-color: #ffffff;\n  }\n  a:hover {\n    color: #747bff;\n  }\n  button {\n    background-color: #f9f9f9;\n  }\n}\n"
    }
  }
}

export const assemblyFiles = {
  "main.asm": {
    "file": {
      "contents": "section .text\n\nglobal _start\n\n_start:\n    mov     edx,len\n    mov     ecx,msg\n    mov     ebx,1\n    mov     eax,4\n    int     0x80\n\n    mov     eax,1\n    int     0x80\n\nsection .data\n\nmsg     db      'Hello, world!',0xa\nlen     equ     $ - msg\n"
    }
  }
}

export const atsFiles = {
  "main.dats": {
    "file": {
      "contents": "implement main0 () = {\n  val () = println! (\"Hello World!\")\n}\n"
    }
  }
}

export const bashFiles = {
  "main.sh": {
    "file": {
      "contents": "echo Hello World!"
    }
  }
}

export const cFiles = {
  "main.c": {
    "file": {
      "contents": "#include <stdio.h>\n\nint main() {\n    printf(\"Hello World!\");\n    return 0;\n}"
    }
  }
}

export const clispFiles = {
  "main.lsp": {
    "file": {
      "contents": "(format t \"Hello World!\")"
    }
  }
}

export const clojureFiles = {
  "main.clj": {
    "file": {
      "contents": "(println \"Hello World!\")"
    }
  }
}

export const cobolFiles = {
  "main.cob": {
    "file": {
      "contents": "       IDENTIFICATION DIVISION.\n       PROGRAM-ID. hello.\n\n       PROCEDURE DIVISION.\n           DISPLAY 'Hello World!'\n           GOBACK\n           .\n\n"
    }
  }
}

export const coffeescriptFiles = {
  "main.coffee": {
    "file": {
      "contents": "console.log \"Hello World!\""
    }
  }
}

export const cppFiles = {
  "main.cpp": {
    "file": {
      "contents": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello World!\";\n    return 0;\n}"
    }
  }
}

export const crystalFiles = {
  "main.cr": {
    "file": {
      "contents": "puts \"Hello World!\""
    }
  }
}

export const csharpFiles = {
  "main.cs": {
    "file": {
      "contents": "using System;\n\npublic class Program\n{\n    public static void Main()\n    {\n        Console.WriteLine(\"Hello World!\");\n    }\n}"
    }
  }
}

export const dFiles = {
  "main.d": {
    "file": {
      "contents": "import std.stdio;\n\nvoid main()\n{\n    writeln(\"Hello World!\");\n}"
    }
  }
}

export const dartFiles = {
  "main.dart": {
    "file": {
      "contents": "void main() {\n    print(\"Hello World!\");\n}"
    }
  }
}

export const elixirFiles = {
  "main.ex": {
    "file": {
      "contents": "IO.puts \"Hello World!\""
    }
  }
}

export const elmFiles = {
  "Main.elm": {
    "file": {
      "contents": "module Main exposing (main)\n\nimport Html exposing (..)\n\nmain =\n    text \"Hello World!\"\n"
    }
  }
}

export const erlangFiles = {
  "main.erl": {
    "file": {
      "contents": "% escript will ignore the first line\n\nmain(_) ->\n    io:format(\"Hello World!~n\").\n"
    }
  }
}

export const fsharpFiles = {
  "main.fs": {
    "file": {
      "contents": "printfn \"Hello World!\""
    }
  }
}

export const goFiles = {
  "main.go": {
    "file": {
      "contents": "package main\n\nimport (\n    \"fmt\"\n)\n\nfunc main() {\n    fmt.Println(\"Hello World!\")\n}\n"
    }
  }
}

export const groovyFiles = {
  "main.groovy": {
    "file": {
      "contents": "println \"Hello World!\""
    }
  }
}

export const guileFiles = {
  "main.scm": {
    "file": {
      "contents": "(display \"Hello World!\")"
    }
  }
}

export const hareFiles = {
  "main.ha": {
    "file": {
      "contents": "use fmt;\n\nexport fn main() void = {\n\tfmt::println(\"Hello World!\")!;\n};\n"
    }
  }
}

export const haskellFiles = {
  "main.hs": {
    "file": {
      "contents": "main = putStrLn \"Hello World!\""
    }
  }
}

export const htmlFiles = {
  "index.html": {
    "file": {
      "contents": "<html>\n  <head>\n    <title>Hello World!</title>\n  </head>\n  <body>\n    <h1>Hello World!</h1>\n  </body>\n</html>"
    }
  }
}

export const idrisFiles = {
  "main.idr": {
    "file": {
      "contents": "module Main\n\nmain : IO ()\nmain = putStrLn \"Hello World!\""
    }
  }
}

export const javaFiles = {
  "Main.java": {
    "file": {
      "contents": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World!\");\n    }\n}"
    }
  }
}

export const javascriptFiles = {
  "main.js": {
    "file": {
      "contents": "console.log(\"Hello World!\");"
    }
  }
}

export const juliaFiles = {
  "main.jl": {
    "file": {
      "contents": "println(\"Hello World!\")"
    }
  }
}

export const kotlinFiles = {
  "main.kt": {
    "file": {
      "contents": "fun main(){\n    println(\"Hello World!\")\n}\n"
    }
  }
}

export const luaFiles = {
  "main.lua": {
    "file": {
      "contents": "print(\"Hello World!\")"
    }
  }
}

export const mercuryFiles = {
  "main.m": {
    "file": {
      "contents": ":- module main.\n:- interface.\n:- import_module io.\n:- pred main(io::di, io::uo) is det.\n:- implementation.\nmain(!IO) :-\n    io.write_string(\"Hello World!\n\", !IO)."
    }
  }
}

export const nimFiles = {
  "main.nim": {
    "file": {
      "contents": "echo \"Hello World!\""
    }
  }
}

export const nixFiles = {
  "main.nix": {
    "file": {
      "contents": "let\n    hello = \"Hello World!\";\nin\nhello\n"
    }
  }
}

export const ocamlFiles = {
  "main.ml": {
    "file": {
      "contents": "print_endline \"Hello World!\""
    }
  }
}

export const pascalFiles = {
  "main.pp": {
    "file": {
      "contents": "Program Main;\n\nbegin\n  writeln('Hello World!');\nend.\n"
    }
  }
}

export const perlFiles = {
  "main.pl": {
    "file": {
      "contents": "print \"Hello World!\\n\";"
    }
  }
}

export const phpFiles = {
  "main.php": {
    "file": {
      "contents": "<?php\n    echo \"Hello World!\";\n?>"
    }
  }
}

export const plaintextFiles = {
  "main.txt": {
    "file": {
      "contents": "Hello World!"
    }
  }
}

export const pythonFiles = {
  "main.py": {
    "file": {
      "contents": "print(\"Hello World!\")"
    }
  }
}

export const rakuFiles = {
  "main.raku": {
    "file": {
      "contents": "say \"Hello World!\";"
    }
  }
}

export const rubyFiles = {
  "main.rb": {
    "file": {
      "contents": "puts \"Hello World!\""
    }
  }
}

export const rustFiles = {
  "main.rs": {
    "file": {
      "contents": "fn main() {\n    println!(\"Hello World!\");\n}"
    }
  }
}

export const sacFiles = {
  "main.sac": {
    "file": {
      "contents": "int main () {\n    StdIO::printf (\"Hello World!\");\n    return 0;\n}"
    }
  }
}

export const scalaFiles = {
  "main.scala": {
    "file": {
      "contents": "object Main extends App {\n    println(\"Hello World!\")\n}"
    }
  }
}

export const swiftFiles = {
  "main.swift": {
    "file": {
      "contents": "print(\"Hello World!\")"
    }
  }
}

export const typescriptFiles = {
  "main.ts": {
    "file": {
      "contents": "console.log(\"Hello World!\");"
    }
  }
}

export const zigFiles = {
  "main.zig": {
    "file": {
     "contents": "const std = @import(\"std\");\n\npub fn main() !void {\n    const stdout = std.io.getStdOut().writer();\n    try stdout.print(\"{s}\\n\", .{\"Hello World!\\n\"});\n}\n"
    }
  }
}
