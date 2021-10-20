

function getInfo(){      
    loadJSON((response) => {
        // 3. parse JSON string into JSON Object
        const json = JSON.parse(response);
        // 4. render to your page    
        setAboutMe(json);
        setEducation(json);
        setSkills(json);
        setProjects(json);
    }); 
}

function setAboutMe(json){
    const text = json.aboutme;
    document.getElementById("#about-me").innerHTML = text;
}

function setEducation(json){
    const education = json.education;

    education.sort((a,b) => {return b.from - a.from;}).forEach(element => {
        document.getElementById("#education").innerHTML += "<li class='list-group-item'><div class='row'> <div class='col-md-9'> <h6>"+element.title+"</h6> "+ element.from +" - "+element.to+" <br> "+element.where+"<br>"+ element.finalMark+" <br> "+element.description+" </div> <div class='col-md-3'><img style='width: 45%' src="+element.logo+"></img> </div></div></li>"
    });
}
function setSkills(json){
    const skills = json.skills;
    skills.forEach(e => {
        //for each skill prints skill name and percentage
        document.getElementById("#skills").innerHTML +=  '<h6>'+e.name+'</h6>'
        document.getElementById("#skills").innerHTML += "<div class='progress'> \
        <div class='progress-bar bg-info' role='progressbar' style='width: "+e.level+"%' aria-valuenow="+e.level+" aria-valuemin='0' aria-valuemax='100'></div> </div> <br>"
    })
}

function setProjects(json){
    // "<li class='list-group-item'></li>"
    if (json.projects == null)
        return;
    var count = 0;
    const projects  = json.projects;
    projects.forEach( prog => {
        document.getElementById("#projects").innerHTML += "<li class='list-group-item' id='#project"+count+"'></li>"
        document.getElementById("#project"+count).innerHTML += "<h5>" +prog.name+ "</h5>"
        document.getElementById("#project"+count).innerHTML += "<p>" +prog.description+ "</p>"
        prog.link.forEach( link => {
            document.getElementById("#project"+count).innerHTML += "<a href="+link.url+"> >"+link.description+"</a> <br>";
        })
        //document.getElementById("#projects").innerHTML += "</li>"
        count += 1;
    })



}

const loadJSON = (callback) => {
    const xObj = new XMLHttpRequest();
    xObj.overrideMimeType("application/json");
    xObj.open('GET', './info.json', true);
    xObj.onreadystatechange = () => {
        if (xObj.readyState === 4 && xObj.status === 200) {
            // 2. call your callback function
            callback(xObj.responseText);
        }
    };
    xObj.send(null);

}



document.addEventListener("DOMContentLoaded", getInfo)