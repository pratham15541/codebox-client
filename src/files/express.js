export const expressFiles = 
 {
    "index.js": {
      "file": {
        "contents": "\nconst express = require('express');\nconst app = express();\nconst port = 3111;\n\napp.get('/', (req, res) => {\n  res.send('Welcome to a WebContainers app! 🥳');\n});\n\napp.listen(port, () => {\n  console.log(`App is live at http://localhost:${port}`);\n});"
      }
    },
    "package.json": {
      "file": {
        "contents": "\n      {\n        \"name\":\"example-app\",\n        \"dependencies\":{\n           \"express\":\"latest\"\n        },\n        \"devDependencies\":{\n           \"nodemon\":\"latest\"\n        },\n        \"scripts\":{\n           \"start\":\"nodemon --watch './' index.js\"\n        }\n     }"
      }
    }
  }
