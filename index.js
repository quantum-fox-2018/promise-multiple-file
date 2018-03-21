const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(parentFileName, childrenFileName) {
  // psst, the promise should be around here...
  return new Promise(function(resolve, reject) {
    fs.readFile( parentFileName, 'utf8', function(err, parentDataStr){
      sleep.sleep(1);
      if(err){
        reject(err)
      }
      else{
        fs.readFile( childrenFileName,'utf8',function(err, childrenData){
          sleep.sleep(1);
          if(err){
            reject(err)
          }else{
            resolve([childrenData,parentDataStr])
          }

        })
      }
    })
  });
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)

  readFilePromise(parentFileName, childrenFileName)
  .then(function(objData){
    let parentDataStr = objData[1];
    let parentData = JSON.parse(parentDataStr);

      return readFilePromise(parentFileName, childrenFileName)
      .then(function(objData){
        let childrensDataStr = objData[0];
        let childrensData = JSON.parse(childrensDataStr);
        return {parentData:parentData, childrensData:childrensData};
      })
  })
  .then(function(objData){

    let data_parents = objData.parentData;
    let data_childrens = objData.childrensData;

    for(let i=0;i<data_parents.length;i++){
      let arrChildrens = []
      for(let j=0; j<data_childrens.length;j++){

        if(data_parents[i].last_name == data_childrens[j].family){
          arrChildrens.push(data_childrens[j].full_name);
        }
      }
      data_parents[i].childrens = arrChildrens
    }

    return data_parents;
  })
  .then(function(full_data){
    console.log(full_data);
  })
  .catch(function(error){
    console.log(error);
    let errMessage = `Terjadi error saat proses pembacaan data`;
    console.log(errMessage);
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
