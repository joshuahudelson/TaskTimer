


window.addEventListener("load", function(){
  var tasks = ["", "", "", "", ""];
  var minutes = [0, 0, 0, 0, 0];
  var currentTask = 0;
  var numTasks = 5;
  var startButtonValue = 0;  //0 = it's paused, 1 = it's running
  var task_array = ["Task1", "Task2", "Task3", "Task4", "Task5"];
  var taskdiv_array = ["TaskDiv1", "TaskDiv2", "TaskDiv3", "TaskDiv4", "TaskDiv5"];
  var minutes_array = ["Minutes1", "Minutes2", "Minutes3", "Minutes4", "Minutes5"];
  var task_timer = null;
  var anewvariable = document.getElementById("StartButton");
  var bnewvariable = document.getElementById("ResetButton");


  anewvariable.addEventListener('click', startTaskClicked, false);
  bnewvariable.addEventListener('click', resetTaskClicked, false);

  var audioctx = new (window.AudioContext || window.webkitAudioContext);


  function pull_data(e){
    for (let i=0; i<numTasks; i++){
      document.getElementById(taskdiv_array[i]).className = "TaskDiv-inactive";
      var temp_task = document.getElementById(task_array[i]).value;
      tasks[i] = temp_task;  //POINTLESS?  GET RID OF WHOLE ARRAY?
      temp_min = parseInt(document.getElementById(minutes_array[i]).value);
      minutes[i] = temp_min;
    }
  };


  function subtract_minute(){
    minutes[currentTask] -= 1;
    document.getElementById(minutes_array[currentTask]).value = minutes[currentTask];
    if (minutes[currentTask] <= 0){
      clearInterval(task_timer);
      unclickStart();
      play_bell();
    }
  };


  function play_bell(){
    var sine = audioctx.createOscillator();
    sine.connect(audioctx.destination);
    sine.start();
    window.setTimeout(function(){sine.disconnect();}, 400);
  }


  function get_current(){
    var temp_found = 0;
    for (let i=0; i<numTasks; i++){
      console.log(minutes[i]);
      if (minutes[i] > 0){
        currentTask = i;
        temp_found = 1;
        return 1;
      }
    }
    if (temp_found == 0){
      clearInterval(task_timer);
      unclickStart();
      return 0;
    }
  };


  function startTimer(){
    if (get_current()) {
    task_timer = setInterval(function(){subtract_minute()}, 60000);
    document.getElementById(taskdiv_array[currentTask]).className = "TaskDiv-active";
    console.log("startTimer ran");
    }
  };

  function pauseTimer(){
    clearInterval(task_timer);
  };


  function unclickStart(){
    var temp_text = document.getElementById("StartButton");
    temp_text.innerHTML = "START";
    startButtonValue = 0;
    pauseTimer();
  }


  function startTaskClicked(e){
    pull_data(e);
    var temp_text = document.getElementById("StartButton");
    if (startButtonValue == 0) {
      temp_text.innerHTML = "PAUSE";
      startButtonValue = 1;
      startTimer();
    }
    else{
      unclickStart();
    }
  };

  function resetTaskClicked(e){
    for (let i=0; i<numTasks; i++){
      document.getElementById(task_array[i]).value = "";
      document.getElementById(minutes_array[i]).value = "";
      document.getElementById(taskdiv_array[i]).className = "TaskDiv-inactive";
    }
    unclickStart();
  };

});
