document.getElementById("travel").style.display = "block"
document.getElementById("time").style.display = "block"
document.getElementById("myinput").style.display = "block"
document.getElementById("mybtn").style.display = "block"
document.getElementById("rules").style.display = "block"
document.getElementById("resetBTN").style.display = "none"
document.getElementById("Loading").style.display="none"



document.getElementById("mybtn").onclick = async function(){
    const year=document.getElementById("myinput").value;
    if (Number(year)&&year<3000&&year>-5000){
        document.getElementById("rules").style.display = "none"
        document.getElementById("Loading").style.display="block"
        document.getElementById("travel").style.display = "none"
        document.getElementById("time").style.display = "none"
        document.getElementById("myinput").style.display = "none"
        document.getElementById("mybtn").style.display = "none"    
        document.getElementById("Loading").innerText = `Travelling to year ` + year +`...`
        fetch(`http://127.0.0.1:8000/events/${year}`)
            .then(res=>res.json())
            .then(data=>{
                document.getElementById("time").style.display = "block";
                document.getElementById("time").innerText="Successfuly traveled to year " + year
                document.getElementById("result").innerHTML = data.events.replace(/\n/g, '<br>');
                document.getElementById("result").style.display = "block";
                document.getElementById("resetBTN").style.display = "block";
                document.getElementById("Loading").style.display="none"          })
    }
    else {
        document.getElementById("Loading").style.display="block"
        document.getElementById("Loading").innerText = "Please enter the year before 3000 and after -5000"}
}

document.getElementById("resetBTN").onclick = function(){
    document.getElementById("rules").style.display = "block"
    document.getElementById("travel").style.display = "block";
    document.getElementById("time").style.display = "block";
    document.getElementById("time").innerText = "Enter the year you want to travel to below: (For B.C enter negative number.)";
    document.getElementById("myinput").style.display = "block";
    document.getElementById("myinput").value = "";
    document.getElementById("mybtn").style.display = "block";
    document.getElementById("result").innerHTML = "";
    document.getElementById("Loading").style.display = "none";
    document.getElementById("resetBTN").style.display = "none";
};


            