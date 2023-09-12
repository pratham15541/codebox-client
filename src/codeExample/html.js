const code =
  '<html style="color: green">\n  <!-- this is a comment -->\n  <head>\n    <title>Mixed HTML Example</title>\n    <style type="text/css">\n      h1 {font-family: comic sans; color: #f0f;}\n      div {background: yellow !important;}\n      body {\n        max-width: 50em;\n        margin: 1em 2em 1em 5em;\n      }\n    </style>\n  </head>\n  <body>\n    <h1>Mixed HTML Example</h1>\n    <script>\n      function jsFunc(arg1, arg2) {\n        if (arg1 && arg2) document.body.innerHTML = "achoo";\n      }\n    </script>\n  </body>\n</html>\n\n';
export default code;
