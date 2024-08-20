console.log("writting java")
let ham = document.querySelector(".hamburger");
ham.addEventListener("click", ()=>{
    document.querySelector(".left").style.left = "0px"
})

document.querySelector(".cross").addEventListener("click",()=>{
    document.querySelector(".left").style.left="-350px";
})