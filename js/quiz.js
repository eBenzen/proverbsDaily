    /** Simple JavaScript Quiz
     * version 0.1.0
     * http://journalism.berkeley.edu
     * created by: Jeremy Rue @jrue
     *
     * Copyright (c) 2013 The Regents of the University of California
     * Released under the GPL Version 2 license
     * http://www.opensource.org/licenses/gpl-2.0.php
     * This program is distributed in the hope that it will be useful, but
     * WITHOUT ANY WARRANTY; without even the implied warranty of
     * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
     */


    //GLOBAL VARIABLES
    var quiztitle = "Proverbs Daily ";
    var book = "Proverbs";//Could make an input for future versions
    var dayOfMonth;
    var quiz = [];//defined from API on getdata.js

    
    /******* No need to edit below this line *********/
    var currentquestion = 0, submt=true, picked;

   
    /** HTML Encoding function for alt tags and attributes to prevent messy data appearing inside tag attributes.**/
    function htmlEncode(value){
      return $(document.createElement('div')).text(value).html();
    }

    /** This will add the individual choices for each question to the ul#choice-block
     *
     * @param {choices} array The choices from each question*/
    function addChoices(choices){
        if(typeof choices !== "undefined" && $.type(choices) == "array"){
            $('#choice-block').empty();
            for(var i=0;i<choices.length; i++){
                $(document.createElement('li')).addClass('btn btn-default choice choice-box').attr('data-index', i).append("<p>"+choices[i]+"</p>").appendTo('#choice-block');

            }
        }
    }
    
    /*** Resets all of the fields to prepare for next question*/
    function nextQuestion(){
        submt = true;
        $('#question').text(quiz[currentquestion]['question']);
        $('#pager').text('Verse ' + Number(currentquestion + 1) + ' of ' + quiz.length);
        addChoices(quiz[currentquestion]['choices']);
        setupButtons();
    }

    /**
     * After a selection is submitted, checks if its the right answer
     *
     * @param {choice} number The li zero-based index of the choice picked
     */
    function processQuestion(choice){
        if(quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']){
            //buildCompletedChapter();
            $('.choice').eq(choice).css({'background-color':'#50D943'});
            currentquestion++;

            //if correct procced as normal
            $('#submitbutton').html('Next Verse &raquo;').on('click', function(){
            if(currentquestion == quiz.length){
                endQuiz();
            } else {
                $(this).text('Check Answer').css({'color':'#222'}).off('click');
                nextQuestion();
            }
        })
        } else {//redo the same questions (this is not a competition)
            $('.choice').eq(choice).css({'background-color':'#D92623'});
            $('#submitbutton').html('Redo &raquo;').on('click', function(){
                $('#submitbutton').html('Check Answer');
                nextQuestion();//the "next question" is the same since the var currentquestion has not been ++'ed
            });
        }   
    }

    /**
     * Sets up the event listeners for each button.
     */
    function setupButtons(){
        /*$('.choice').on('mouseover', function(){
            $(this).css({'background-color':'#e1e1e1'});
        });
       $('.choice').on('mouseout', function(){
            $(this).css({'background-color':'#e1e1e1'});
        })*/
        $('.choice').on('click', function(){
            picked = $(this).attr('data-index');
            $('.choice').removeAttr('style').off('mouseout mouseover');
            $(this).css({'border-color':'#222','font-weight':700,'background-color':'#c1c1c1'});
            if(submt){
                submt=false;
                $('#submitbutton').css({'color':'#000'}).on('click', function(){
                    $('.choice').off('click');
                    $(this).off('click');
                    processQuestion(picked);
                });
            }
        })
    }
    
    /**
     * Quiz ends, display a message.
     */
    function endQuiz(){
        $('#frame').empty();
        $(document.createElement('h4')).text("Enjoy this wisdom today and see you tomorrow!").appendTo('#thankYou');
        $(document.createElement('p')).text("Scroll to the bottom or refresh to restart").appendTo('#restartMessage');
        //$('#question').empty();        $('#choice-block').empty();        $('#submitbutton').remove();
        $(document.createElement('h2')).text(book + dayOfMonth).appendTo('#finalChapterTitle');
        
        //add the restart button to redo the quiz
        restartButton();
    }

    //As the user completed the quiz, build the correct verses below
    function buildCompletedChapter(){
        $(document.createElement('p')).text((currentquestion+1)+". "+quiz[currentquestion]["question"]+" "+quiz[currentquestion]["correct"]).appendTo('#buildChapter');
    }

    /**
     * Runs the first time and creates all of the elements for the quiz
     */
    function init(){
        //add title
        if(typeof quiztitle !== "undefined" && $.type(quiztitle) === "string"){
            $(document.createElement('h2')).text(quiztitle).appendTo('#frame');
        } else {
            $(document.createElement('h4')).text("Quiz").appendTo('#frame');
        }

        //add pager and questions
        if(typeof quiz !== "undefined" && $.type(quiz) === "array"){
            //add pager
            $(document.createElement('p')).addClass('pager').attr('id','pager').text('Verse ' + currentquestion + ' of ' + quiz.length).appendTo('#frame');

            //add first question
            $(document.createElement('p')).addClass('question').attr('id', 'question').append(quiz[currentquestion]['question']+"...").appendTo('#frame');
                   
            //questions holder
            $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');
        
            //add choices
            addChoices(quiz[currentquestion]['choices']);
        
            //add submit button
            $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('Check Answer').css({'font-weight':700,'color':'#222','padding':'30px 0'}).appendTo('#frame');
        
            setupButtons();
        }
    }

    //Add start button once data is loaded
function startButton(quiz){
    $("#startButton").html("<a onclick=\"init(); clearForStart();\" class=\"btn btn-default btn-lg\"><i class=\"fa fa-play fa-fw\"></i> <span class=\"network-name\">Start</span></a>");
}


function clearForStart(){
  $('#start').empty();
}

function restart(){
  location.reload();
}

function restartButton(){
  document.getElementById("restartButton").innerHTML = "<button class=\"myButton\" onclick=\"restart();\">Click to Restart</button>"
}

