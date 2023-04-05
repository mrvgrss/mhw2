/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
function init(){
    for(const answer of aList){
        answer.addEventListener('click', changeValueCheckbox); 
        if(!statusAnswers[answer.dataset.questionId]){
            statusAnswers[answer.dataset.questionId] = {};
            answerSelectedQuestion[answer.dataset.questionId] = null;
        }
        statusAnswers[answer.dataset.questionId][answer.dataset.choiceId] = {"checkbox_status": false, "element": answer, "image": answer.querySelector('.checkbox')};
    }
    console.log(statusAnswers);
}
function resetCheckbox(){
    result.style.display = 'none';
    for(const q in answerSelectedQuestion){
        var nameAnswer = answerSelectedQuestion[q];
        answerSelectedQuestion[q] = null;
        st = statusAnswers[q][nameAnswer];
        st["checkbox_status"] = false;
        setAnswerStyle(st, false);
    }
    init();
}
function displayResult(contentResult){
    for(const cb of aList){
        cb.removeEventListener('click', changeValueCheckbox);
    }
    result.style.display = 'block';
    result.querySelector("h1").textContent = contentResult["title"];
    result.querySelector("p").textContent = contentResult["contents"];

}
function setAnswerStyle(answer, type){
    cb = answer["image"];
    el = answer["element"];
    cb.src = type === true ? SET_CHECKBOX_URL : UNSET_CHECKBOX_URL;
    if(type == true){
        el.style.backgroundColor = "#cfe3ff";
    }else{
        el.style.backgroundColor = "initial";
    }
}
function countMostSelected(){
    var count = 0;
    var answersCount = {}
    var mostSelected = null;
    for(const q in answerSelectedQuestion){
        var nameAnswer = answerSelectedQuestion[q];
        if(nameAnswer){
            count++;
            if(!answersCount[nameAnswer]){
                answersCount[nameAnswer] = 1;
            }else{
                //answersCount[answerSelectedQuestion[q]] += 1; VALID ONLY FOR 3 QUESTIONS.
                mostSelected = nameAnswer;
            }
        }
    }
    if(mostSelected == null){
        mostSelected = answerSelectedQuestion["one"];
    }
    return [count, mostSelected];
}
function changeValueCheckbox(event){

    const ct = event.currentTarget;
    const st = statusAnswers[ct.dataset.questionId][ct.dataset.choiceId];
    const asq = answerSelectedQuestion[ct.dataset.questionId];

    if(st["checkbox_status"] == true){
        return;
    }


    if(asq){
        st2 = statusAnswers[ct.dataset.questionId][asq];
        st2["checkbox_status"] = false;
        setAnswerStyle(st2, false);
    }
    st["checkbox_status"] = !st["checkbox_status"];
    setAnswerStyle(st, st["checkbox_status"]);
    answerSelectedQuestion[ct.dataset.questionId] = ct.dataset.choiceId;
    
    const cmsResult = countMostSelected();
    
    if(cmsResult[0] < 3){
        return;
    }

    const contentResult = RESULTS_MAP[cmsResult[1]];

    displayResult(contentResult);
}
const SET_CHECKBOX_URL = './images/checked.png';
const UNSET_CHECKBOX_URL = './images/unchecked.png';


const aList = document.querySelectorAll('.choice-grid div');
const result = document.querySelector('#result');
const resetButton = document.querySelector('#restartButton');
resetButton.addEventListener('click', resetCheckbox); 
const statusAnswers = {};
const answerSelectedQuestion = {};
init();