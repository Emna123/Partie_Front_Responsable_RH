export function SendCode(type,userData){
   
    return new Promise((resolve,reject)=>
    {
          
      fetch(" https://localhost:44392/weatherforecast/areaehirer.recrutement@gmail.com").then(res => res.json())
      .then((result)=>{resolve(result);})
      .catch((error)=>{
          reject(error);
      });
  });
      
  }
