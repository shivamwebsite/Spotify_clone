console.log("writting java")
let currentsong = new Audio();
let ham = document.querySelector(".hamburger");
ham.addEventListener("click", ()=>{
    document.querySelector(".left").style.left = "0px"
})

document.querySelector(".cross").addEventListener("click",()=>{
    document.querySelector(".left").style.left="-350px";
})


function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function  getsongs() {
    let a=await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}

const playMusic=(track,pause=false)=>{
    currentsong.src="/songs/"+track
    // track.play();
    if(!pause){
        currentsong.play();
        play.src="img/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML=decodeURI(track)
    document.querySelector(".songtime").innerHTML="00:00 / 00:00"
}
async function main() {
    let songs=await getsongs();
    console.log(songs) 

    // play
    // var audio = new Audio(songs[0]);
    playMusic(songs[1],true);
    // audio.play();

    play.addEventListener("click" , ()=>{
        if(currentsong.paused){
            currentsong.play();
            play.src="img/pause.svg";
        }
        else{
            currentsong.pause();
            play.src="img/play.svg";
        }
    })

    currentsong.addEventListener("timeupdate" ,()=>{
        console.log(currentsong.currentTime,currentsong.duration);
        document.querySelector(".songtime").innerHTML=`
        ${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`
        document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100+"%";
    })

        // Add an event listener to seekbar
        document.querySelector(".seekbaar").addEventListener("click", e => {
            let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
            document.querySelector(".circle").style.left = percent + "%";
            currentsong.currentTime = ((currentsong.duration) * percent) / 100
        })
}
main();
let button=document.querySelector(".change")
button.addEventListener('click',()=>{
    console.log("clicked change");
    let bg=prompt("backgroungcolor");
    let col=prompt("color");
    document.querySelector(".body").style.backgroundColor=`${bg}`;
    document.querySelector(".body").style.color=`${col}`;
    document.querySelector(".body").style.fontWeight="bold";
})