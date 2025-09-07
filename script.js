const errorLabel = document.querySelector('.error');
const progressBar = document.querySelector('.progress-bar-value');
const completionStatus = document.querySelector('.progress-bar-value span');
const checkBox = document.querySelectorAll('.box input[type="checkbox"]');
const goalInput = document.querySelectorAll('.goal-input');
const raiseQuote = document.querySelector('.raise');



let completedGoals=0;


errorLabel.style.display="none";


loadDataFromLocalStorage();




checkBox.forEach((box,index)=>{

  box.addEventListener('change',() => {

    if(goalInput[index].value.trim() === ""){ 

      errorLabel.style.display="block";
      box.checked=false;
      return;
  }



   errorLabel.style.display="none";



  if(box.checked){
    completedGoals++;
  }
else if(completedGoals>0){
  completedGoals--;
}

if(box.checked){
  goalInput[index].style.textDecoration='line-through';
    goalInput[index].style.color='#48A300';
}

else{
     
      goalInput[index].style.textDecoration = 'none';
      goalInput[index].style.color = 'black';

}

saveDataToLocalStorage();
updateProgressBar();

 });
});


goalInput.forEach((input,index)=>{

  input.addEventListener('input',()=>{


    if(checkBox[index].checked){

      checkBox[index].checked=false;

      if(completedGoals>0){
  completedGoals--;
 } 

}

     
      goalInput[index].style.textDecoration = 'none';
      goalInput[index].style.color = 'black';
    
  


 saveDataToLocalStorage();
 updateProgressBar();

  })



});



function updateProgressBar(){

  const totalGoals=checkBox.length;
  const percent= (completedGoals / totalGoals) * 100;


  progressBar.style.width=`${percent}%`
  progressBar.style.backgroundColor="#48A300";



  completionStatus.textContent=completedGoals? `${completedGoals}/${totalGoals} completed` : " ";


  if(completedGoals===0) {
    raiseQuote.textContent = "Raise the bar by completing your goals!";

  } 
  
  else if (completedGoals === 1) {
    raiseQuote.textContent = "Well begun is half done!";
  }

  else if (completedGoals === 2) {
    raiseQuote.textContent = "Just a step away, keep going!";
  } 
  
  else {
    raiseQuote.textContent = "Whoa! You just completed all the goals, time for chill 😎";
  }
};




function saveDataToLocalStorage(){

const goals= Array.from(goalInput).map(input => input.value ); 
const checkedStates=Array.from(checkBox).map(box => box.checked ); 


localStorage.setItem('goals', JSON.stringify(goals));

localStorage.setItem('checked', JSON.stringify(checkedStates));


};



function loadDataFromLocalStorage(){


  const savedGoals=JSON.parse(localStorage.getItem('goals')) || [];
  const savedChecked=JSON.parse(localStorage.getItem('checked')) || [];



  goalInput.forEach((input,index) => {

    input.value= savedGoals[index] || "" ;

 });


    checkBox.forEach((box,index) => {

    box.checked= savedChecked[index] || false ;

      if (box.checked) {
      goalInput[index].style.textDecoration = 'line-through';

      goalInput[index].style.color = '#48A300';

    } 
    
    else {
      goalInput[index].style.textDecoration = 'none';
      goalInput[index].style.color = 'black';
    }

 });

 



completedGoals=Array.from(checkBox).filter(box => box.checked).length;

updateProgressBar();

}
















