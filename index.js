const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise((resolve,reject)=>{
    fs.readFile(file,'utf8',(err,data)=>{
      if(err) reject(err)
      else resolve(data)
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..
  readFilePromise(parentFileName).then(dataParent=>{
    sleep.sleep(5)
    var getParent=JSON.parse(dataParent)
    var arrChildren=[]
    readFilePromise(childrenFileName).then(dataChildren=>{
      var getChildren=JSON.parse(dataChildren)
      for (let i = 0; i < getParent.length; i++) {
        for (let j = 0; j < getChildren.length; j++) {
          if(getParent[i].last_name===getChildren[j].family){
            arrChildren.push(getChildren[j].full_name)
            getParent[i]['childrens']=arrChildren
          }
        }
        arrChildren=[]
      }
      console.log(getParent);
    }).catch(err=>{
      console.log('Terjadi error pada proses pembacaan data');
    })
  }).catch(err=>{
    console.log('Terjadi error pada proses pembacaan data');
  })

}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
