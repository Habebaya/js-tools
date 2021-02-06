
import '../css/style.css'
export default function sub (){
    console.log("hello from sub js")
const text = document.createElement("h1");
text.classList.add('header')
text.innerText = "hello From sub h1"
document.body.appendChild(text);

}