import sub from './sub.js'
import pic from'../images/1.jpg'


console.log('hello from index .js')
console.log('hello from index for wathc .js')
sub();


const img = document.createElement("img");
img.src=pic;
document.body.appendChild(img);