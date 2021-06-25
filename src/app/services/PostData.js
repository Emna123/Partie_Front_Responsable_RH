import authAxios from './authAxios';
export function PostData(type,userData){

    return new Promise((resolve,reject)=>
    {
      try{
          const result= authAxios.get('Responsable_RH/414a0fd6-167b-4bb2-a992-7a1834ed12d4')
          resolve(result.data);
         }
      catch(err)
       {
      reject(err.message);

         }

    })}

        
        
 