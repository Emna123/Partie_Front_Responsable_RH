    import axios from 'axios';
    import authAxios from './authAxios';

        export function GetAllCondidats(){
    
          return new Promise((resolve,reject)=>
          {
            try{
               authAxios.get('candidats').then((res)=>{
               
                  resolve(res.data);
               })
               
               }
            catch(err)
             {
            reject(err.message);
      
               }
      
          })}
    
            
            
     