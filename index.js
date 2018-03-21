const fs = require('fs');
const sleep = require('sleep');

function readFilePromise(path) {
  // psst, the promise should be around here...
  return new Promise(function(resolve, reject) {
    fs.readFile(path, (err, data) => {
      if(!err) {
        resolve(JSON.parse(data));
      } else {
        reject(err);
      }
    });
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(function(dataParents) {
    sleep.sleep(3);
    console.log("Data parent selesai di proses");
    readFilePromise(childrenFileName)
    .then(function(dataChildrens) {
      sleep.sleep(3);
      console.log("Data children selesai di proses");
      for(let i in dataParents) {
        child = [];
        for(let j in dataChildrens) {
          if(dataParents[i].last_name == dataChildrens[j].family) {
            child.push(dataChildrens[j]);
          }
        }
        dataParents[i].childrens = child;
      }
      console.log(dataParents);
    })
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
