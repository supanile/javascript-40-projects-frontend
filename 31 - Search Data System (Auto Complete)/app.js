const data = [
    "Angular",
    "Bootstrap",
    "C++",
    "Django",
    "Express.js",
    "Flutter",
    "Git",
    "HTML",
    "IntelliJ IDEA",
    "JavaScript",
    "Kotlin",
    "Linux",
    "MongoDB",
    "Node.js",
    "Oracle",
    "Python",
    "Qt",
    "React",
    "Swift",
    "TypeScript",
    "Ubuntu",
    "Vue.js",
    "WebStorm",
    "XML",
    "Yarn",
    "Zend Framework"
];
const search = document.getElementById("search")
const output = document.getElementById("output")

search.onkeyup=function(){
    let word = search.value 
    let result=[]
    if(word.length){
        result = data.filter((value)=>{
            return value.toLowerCase().includes(word.toLowerCase())
        })
    }
    if(result.length>0){
        const content = result.map((value)=>{
            return "<li onclick=selectChoice(this)>"+value+"</li>"
        })
        output.innerHTML="<ul>"+content.join("")+"</ul>"
    }else{
        output.innerHTML=""
    }
}
function selectChoice(word){
    search.value = word.innerHTML;
}