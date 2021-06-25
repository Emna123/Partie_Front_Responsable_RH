import React from "react";

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const AppProgress = () => {

  return (
    <div  style={{backgroundImage:"url("+"/assets/images/i1.jpg"+")",backgroundSize:90,backgroundRepeat:'no-repeat',borderRadius:'100%',width: 90, height: 90}}>

    <CircularProgressbar value={20} styles={{
// Customize the root svg element
root: {},
// Customize the path, i.e. the "completed progress"
path: {
// Path color
stroke: '#4A235A',
// Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
strokeLinecap: 'butt',
strokeWidth:4,
padding:-20,
// Customize transition animation
transition: 'stroke-dashoffset 5s ease 0s',
},
// Customize the circle behind the path, i.e. the "total progress"
trail: {
// Trail color
stroke: '#EBDEF0',
strokeWidth:4
},
// Customize the text

// Customize background - only used when the `background` prop is true

}}/>
  <div style={{backgroundColor:'#4A235A',color:'white',borderRadius:'25%',fontSize:'10px',padding:'2px',marginLeft:'36%',marginTop:'-3%',width:'33%',textAlign:'center'}}>90%</div>

    </div>
  );
};
export default AppProgress;
