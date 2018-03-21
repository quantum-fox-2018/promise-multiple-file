const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(input) {
  return new Promise(function(resolve, reject) {
    fs.readFile(input,'utf8',(err,data)=>{
      let result = JSON.parse(data)
      if(!err){
        resolve(result)
      } else {
        reject(err)
      }
    })
  });
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName)
  .then(parentsData=>{
    readFilePromise(childrenFileName)
    .then(childrensData=>{
      sleep.sleep(5)
      for(let i=0; i<parentsData.length; i++){
        let arrayOfChildren = []
        for(let j=0; j<childrensData.length; j++){
          if(parentsData[i].last_name==childrensData[j].family){
            arrayOfChildren.push(childrensData[j].full_name)
          }
        }
        parentsData[i].childrens = arrayOfChildren
      }
      // let newFormat = JSON.stringify(parentsData,null,2)
      // fs.writeFile(parentFileName,newFormat,function(err,data){
      //   if(err) throw err
      // })
      console.log(parentsData)
    })
    .catch(err=>{
      console.log(err)
    })
  })
  .catch(err=>{
    console.log(err)
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
