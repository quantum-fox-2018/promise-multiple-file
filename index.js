const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file_name) {
  // psst, the promise should be around here...
  return new Promise((resolve, reject)=>{
    fs.readFile(file_name,'utf8',(err, data)=>{
      (!err) ? resolve(JSON.parse(data)) :reject(err);
    });
  });
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)

  readFilePromise(parentFileName)
  .then((data_parent)=>{
    sleep.sleep(5);
    return readFilePromise(childrenFileName)
    .then((data_children)=>{
      for(let indexParents in data_parent){
        data_parent[indexParents].childrens = [];
        for(let indexChildrens in data_children){
          if(data_parent[indexParents].last_name === data_children[indexChildrens].family){
            data_parent[indexParents].childrens.push(data_children[indexChildrens].full_name);
          }
        }
      }
      return data_parent;
    });
  })
  .then((data_parent)=>{
    console.log('Data berhasil di prosses');
    console.log(data_parent);
    console.log('');
  })
  .catch((err)=>{
    console.log('Terjadi error pada prosses pembacaan data');
    console.log(err);
    console.log('');
  });

}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
