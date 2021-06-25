import authAxios from './authAxios';
   
export function GetOffre(){

  return new Promise((resolve,reject)=>
  {
    try{
       authAxios.get('Offre/getAllOffres/').then((res)=>{
       
          resolve(res.data);
       })
       
       }
    catch(err)
     {
    reject(err.message);

       }

  })}

    
    
