const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file_name) {
  // psst, the promise should be around here...
  return new Promise((resolve, reject) => {
    fs.readFile(file_name, 'utf8', (err, data) => {
      sleep.sleep(2)
      if (!err) {
        data = JSON.parse(data);
        resolve(data);
      } else {
        reject(`(!) Error: Wrong file type/path!`);
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(dataParent => {
    return readFilePromise(childrenFileName)
    .then(dataChildren => {
      for (let i in dataParent) {
        let arrChildren = [];
        for (let j in dataChildren) {
          if (dataParent[i].last_name == dataChildren[j].family) {
            arrChildren.push(dataChildren[j].full_name);
          }
        }
        dataParent[i].childrens = arrChildren;
      }
      console.log(dataParent);
    })
  })
  .catch(error => {
    console.log(error);
  })
}

// matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
