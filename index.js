const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if(!err) {
        data = JSON.parse(data)
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(parentData => {
    sleep.sleep(2)
    console.log('proses membaca file Parent')
    readFilePromise(childrenFileName)
    .then(childrenData => {
      sleep.sleep(2)
      console.log('proses membaca file Children')
      
      sleep.sleep(2)
      for(let j=0; j<parentData.length; j++) {
        parentData[j].childrens = []
        for(let i=0; i<childrenData.length; i++) {
          if(childrenData[i].family == parentData[j].last_name) {
            parentData[j].childrens.push(childrenData[i].full_name)
          }
        }
      }

      console.log(parentData)
    })
    .catch(err => {console.log(err)})
  })
  .catch(err => {console.log(err)})
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');