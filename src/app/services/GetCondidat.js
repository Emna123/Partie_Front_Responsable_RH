import authAxios from './authAxios';
export function GetCondidat(id){
 
      return new Promise((resolve,reject)=>
      {
        try{
           authAxios.get('candidats/'+id).then((res)=>{
          
              resolve(res.data);

           })
           
           }
        catch(err)
         {
        reject(err.message);
  
           }
  
      })}
