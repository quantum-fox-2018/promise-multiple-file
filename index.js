const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(fileName) {
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, 'utf8', (err,data)=>{

      if(data != undefined){
        let dataParse = JSON.parse(data)
        if(err){
          reject(`Terjadi error pada saat pembacaan data!`)
        } else {
          resolve(dataParse)
        }
      } else {
        reject(`Terjadi error pada saat pembacaan data!`)
      }
      
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  let parent_data;
  readFilePromise(parentFileName)
  .then(dataParent =>{
    let parent_data = dataParent
    
    readFilePromise(childrenFileName)
    .then(dataChildren =>{
      let children_data = dataChildren
      
      for(let i=0; i<parent_data.length; i++){
        let temp = [];
        for(let j=0; j<children_data.length; j++){
          if(parent_data[i].last_name == children_data[j].family){
            temp.push(children_data[j].full_name)
          }
        }
        parent_data[i].childrens = temp
      }

      console.log(parent_data)

    })
    .catch(err =>{
      console.log(err)
    })

  })
  .catch(err =>{
    console.log(err)
  })
  
}


matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses..");
sleep.sleep(1)

// // for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');