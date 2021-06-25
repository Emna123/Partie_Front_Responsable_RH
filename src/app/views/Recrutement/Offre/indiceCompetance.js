export const  suggestions = [
    { label: "Fort" },
      { label: "Expert" },
      { label: "Compétent" },
      { label: "Connaissance de base" },
      { label: "pas developpée" },
  
  ];
  
  
  
    export function indiceniveaucompetance(niveau) {
        var l=-1;
     for(var i=0; i<suggestions.length;i++)
     {
          if(suggestions[i].label===niveau){
            l=i
         }
     }
  
   return l;
  
    }
      