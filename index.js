const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(filename) {
  // psst, the promise should be around here...
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if(!err){
        let dataJSON = JSON.parse(data)
        resolve(dataJSON)
      }
      else {
        reject({
          alert: `Read File ERROR...because has error in file ${filename}`,
          error: err.message
        })
      }
    })
  });
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)

  readFilePromise(parentFileName)
  .then((dataParent) => {
    readFilePromise(childrenFileName)
    .then((dataChildren) => {
      for(let i=0; i<dataParent.length; i++){
        let childrens = []
        for(let j=0; j<dataChildren.length; j++){
          if(dataParent[i].last_name == dataChildren[j].family){
            childrens.push(dataChildren[j].full_name)
          }
        }
        // console.log('====', childrens)
        dataParent[i].childrens = childrens
      }
      
      console.log(dataParent)
    })
    .catch((failed) => {
      console.log(failed)
    })
    
  })
  .catch((failed) => {
    console.log(failed)
  })
  
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");
sleep.sleep(3)

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./bukan_file.json', './also_not_a_real_file.json');