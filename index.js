const fs = require('fs');
var sleep = require('sleep');

// function match_data(parent_file, children_file) {
//   // your code here...
//   fs.readFile(parent_file, (err, data) =>{
//     sleep.sleep(5)
//     let parentsData = JSON.parse(data)
//     fs.readFile(children_file, (err, myData) =>{
//       sleep.sleep(5)
//       let childrenData = JSON.parse(myData)
//       for (var i = 0; i < parentsData.length; i++) {
//           parentsData[i].children = []
//         for (var j = 0; j < childrenData.length; j++) {
//           if (parentsData[i].last_name === childrenData[j].family) {
//             parentsData[i].children.push(childrenData[j].full_name)
//           }
//         }
//       }
//       console.log(parentsData)
//     })
//   })
// }

function readDataPromise(fileName){
  return objPromise = new Promise(function(resolve, reject){
    fs.readFile(fileName, 'utf8',function(err, data){
      if (err) {
        reject(err)
      }else {
        resolve(data)
      }
    })
  })
}

function match_data(parentFile, childrenFile){
  readDataPromise(parentFile)
  .then(function(data){
    return data
  })
  .then(function(parentData){
    return readDataPromise(childrenFile)
    .then(function(childrenData){
      return [parentData, childrenData]
    })
  })
  .then(function(dataArr){
    let parents = JSON.parse(dataArr[0])
    let childrens = JSON.parse(dataArr[1])

    for (var i = 0; i < parents.length; i++) {
      parents[i].children = []
      for (var j = 0; j < childrens.length; j++) {
        if (parents[i].last_name === childrens[j].family) {
          parents[i].children.push(childrens[j].full_name)
        }
      }
    }
    console.log(parents)
  })
  .catch(function(err){
    console.log(err);
  })
}

match_data('./parents.json', './childrens.json')
console.log("Notification : Data sedang diproses !");
