const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(FileName) {
  // psst, the promise should be around here...
  return new Promise((resolve, reject) => {
    fs.readFile(FileName, 'utf8', (err, Data) =>{
      if(err){
        reject(err);
      }else{
        resolve(JSON.parse(Data));
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then((ParentData) =>{
    readFilePromise(childrenFileName)
    .then((childernData) =>{
      for(let i = 0; i < ParentData.length; i++){
        let childerns = [];
        for(let j = 0; j < childernData.length; j++){
          if(ParentData[i].last_name == childernData[j].family){
            childerns.push(childernData[j].full_name);
          }
        }
        ParentData[i].childerns = childerns;
      }

      console.log(ParentData);
    })
  })
  .catch((err)=>{
    console.log(err);
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
