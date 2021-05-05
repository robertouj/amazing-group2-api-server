# Information

## CURL Commands
`
curl -d '{"name": "cat", "latinName": "Felis catus", "idVideo": "ylZYirYSiFA", "img" : "//en.wikipedia.org/wiki/Cat#/media/File:Cat_poster_1.jpg", "url" : "//static.wikia.nocookie.net/jadensadventures/images/3/3c/Garfield_1924-480x360.jpg/revision/latest?cb=20121110075001"  }' -H "Content-Type: application/json" -X POST http://localhost:9000/animals

curl -d '{"name": "cat"}' -H "Content-Type: application/json" -X POST http://localhost:9000/animals

`