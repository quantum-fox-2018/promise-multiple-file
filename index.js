const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(fileName) {
  // psst, the promise should be around here...
  return new Promise ((resolve,reject) => {
    fs.readFile(fileName, 'utf8',(err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data)
      }
    });
  })
}


function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)

  let raw_parent_data = readFilePromise(parentFileName)
  raw_parent_data.then(raw_data => {
    let parent_data = JSON.parse(raw_data);
    
    let raw_child_data = readFilePromise(childrenFileName)
    raw_child_data.then(raw_data => {
      let child_data = JSON.parse(raw_data);

      for (let i = 0; i < child_data.length; i++) {
        for (let j = 0; j < parent_data.length; j++) {
          if (parent_data[j].last_name == child_data[i].family) {
            parent_data[j].childrens.push(child_data[i].full_name)
          }
        }
      }

      console.log(parent_data);

    })
    .catch(err => {
      console.log(err);
    })

  })
  .catch(err => {
    console.log(err);
  })

}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');