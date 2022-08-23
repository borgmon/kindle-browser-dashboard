var express = require('express');
var path = require('path');
var router = express.Router();
const fs = require('fs');

var ALBUM_PATH = 'images/album'
var INTERVAL = process.env.INTERVAL || 60000
INTERVAL = parseInt(INTERVAL)

var SHOW_HEADER = process.env.SHOW_HEADER || 'false'
SHOW_HEADER = Boolean(SHOW_HEADER)

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

var photoList = []

const listPhotos = () => {
  p = path.resolve('src/public', ALBUM_PATH)
  fs.readdir(p, (err, files) => {
    if (err) {
      console.log(err)
      return
    }
    photoList = shuffle(files)
  })
}

listPhotos()

router.get('/', async (req, res, next) => {
  nextPhoto = photoList.pop()
  if (photoList.length === 0) {
    listPhotos()
  }
  p = path.resolve('src/public', ALBUM_PATH, nextPhoto)

  res.render('album', {
    path: path.join(ALBUM_PATH, nextPhoto),
    img,
    interval: INTERVAL,
    showHeader: SHOW_HEADER,
    currentPage: "/album",
  });
});

module.exports = router;
