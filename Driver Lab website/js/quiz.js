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

    var quiztitle = "Learners Test Quiz";

    /**
    * Set the information about your questions here. The correct answer string needs to match
    * the correct choice exactly, as it does string matching. (case sensitive)
    *
    */
    var quiz = [
        {
            "question"      :   "Q1: IF YOU WANT TO ENTER THE DRIVING LANE FROM THIS PARKED POSITION, WHAT SHOULD YOU DO? ",
            /*"image"         :   "http://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/220px-Albert_Einstein_Head.jpg",*/
            "choices"       :   [
                                    "Yield to the cars in the driving lane",
                                    "Sound your horn before entering the driving lane",
                                    "Signal for a left turn and then enter the driving lane rapidly",
                                    "Pull out quickly"
                                ],
            "correct"       :   "Yield to the cars in the driving lane",
            "explanation"   :   "You must yield to the cars in the driving lane",
        },
        {
            "question"      :   "Q2: YOU PLAN TO ENTER TRAFFIC AHEAD. YOU SHOULD STOP ONLY IF? :",
            /*"image"         :   "http://upload.wikimedia.org/wikipedia/commons/thumb/9/94/US_%242_obverse-high.jpg/320px-US_%242_obverse-high.jpg",*/
            "choices"       :   [
                                    "Visibility is poor",
                                    "There is no opening in traffic",
                                    "Traffic is moving too fast",
                                    "There are no cars following you"
                                ],
            "correct"       :   "There is no opening in traffic",
            "explanation"   :   "You should stop ONLY if there is no opening in traffic.",
        },
        {
            "question"      :   "Q3: YOU SEE A FIRE TRUCK IN YOUR MIRROR AND HEAR A SIREN. WHAT SHOULD YOU DO?",
            /*"image"         :   "",*/
            "choices"       :   [
                                    "Slow, then go with caution",
                                    "Turn right to get out of the way",
                                    "Cross the intersection and stop close to the curb",
                                    "Stop where you are"
                                ],
            "correct"       :   "Cross the intersection and stop close to the curb",
            "explanation"   :   "You should always stop close to the curb and never block an intersection.",
        },
        {
            "question"      :   "Q4: YOU SEE THE TRUCK BESIDE YOU STOP SUDDENLY. WHAT SHOULD YOU DO?",
            /*"image"         :   "",*/
            "choices"       :   [
                                    "Slow down and be ready to stop quickly",
                                    "Maintain present speed but be ready to stop",
                                    "Stop where you are and then go ahead",
                                    "Sound your horn, then pass"
                                ],
            "correct"       :   "Slow down and be ready to stop quickly",
            "explanation"   :   "Slow down, be ready to stop if necessary and pass with caution.",
        },
        {
            "question"      :   "Q5: WHEN YOU SEE PEDESTRIANS IN A CROSSWALK AND THERE IS NO STOP SIGN, WHAT SHOULD YOU DO?",
            /*"image"         :   "",*/
            "choices"       :   [
                                    "Slow and inch your way through",
                                    "Stop and let the pedestrians cross ",
                                    "Go ahead and let the pedestrians wait",
                                    "Stop, and then go ahead into the crosswalk"
                                ],
            "correct"       :   "Stop and let the pedestrians cross",
            "explanation"   :   "You should stop and let them cross. They can be injured even in minor accidents.",
        },		

    ];


    /******* No need to edit below this line *********/
    var currentquestion = 0, score = 0, submt=true, picked;

    jQuery(document).ready(function($){

        /**
         * HTML Encoding function for alt tags and attributes to prevent messy
         * data appearing inside tag attributes.
         */
        function htmlEncode(value){
          return $(document.createElement('div')).text(value).html();
        }

        /**
         * This will add the individual choices for each question to the ul#choice-block
         *
         * @param {choices} array The choices from each question
         */
        function addChoices(choices){
            if(typeof choices !== "undefined" && $.type(choices) == "array"){
                $('#choice-block').empty();
                for(var i=0;i<choices.length; i++){
                    $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');                    
                }
            }
        }
        
        /**
         * Resets all of the fields to prepare for next question
         */
        function nextQuestion(){
            submt = true;
            $('#explanation').empty();
            $('#question').text(quiz[currentquestion]['question']);
            $('#pager').text('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
            if(quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != ""){
                if($('#question-image').length == 0){
                    $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
                } else {
                    $('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
                }
            } else {
                $('#question-image').remove();
            }
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
                $('.choice').eq(choice).css({'background-color':'#50D943'});
                $('#explanation').html('<strong>Correct!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
                score++;
            } else {
                $('.choice').eq(choice).css({'background-color':'#D92623'});
                $('#explanation').html('<strong>Incorrect.</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
            }
            currentquestion++;
            $('#submitbutton').html('NEXT QUESTION &raquo;').on('click', function(){
                if(currentquestion == quiz.length){
                    endQuiz();
                } else {
                    $(this).text('Check Answer').css({'color':'#222'}).off('click');
                    nextQuestion();
                }
            })
        }

        /**
         * Sets up the event listeners for each button.
         */
        function setupButtons(){
            $('.choice').on('mouseover', function(){
                $(this).css({'background-color':'#e1e1e1'});
            });
            $('.choice').on('mouseout', function(){
                $(this).css({'background-color':'#fff'});
            })
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
            $('#explanation').empty();
            $('#question').empty();
            $('#choice-block').empty();
            $('#submitbutton').remove();
            $('#question').text("You got " + score + " out of " + quiz.length + " correct.");
            $(document.createElement('h2')).css({'text-align':'center', 'font-size':'4em'}).text(Math.round(score/quiz.length * 100) + '%').insertAfter('#question');
        }

        /**
         * Runs the first time and creates all of the elements for the quiz
         */
        function init(){
            //add title
            if(typeof quiztitle !== "undefined" && $.type(quiztitle) === "string"){
                $(document.createElement('h1')).text(quiztitle).appendTo('#frame');
            } else {
                $(document.createElement('h1')).text("Quiz").appendTo('#frame');
            }

            //add pager and questions
            if(typeof quiz !== "undefined" && $.type(quiz) === "array"){
                //add pager
                $(document.createElement('p')).addClass('pager').attr('id','pager').text('Question 1 of ' + quiz.length).appendTo('#frame');
                //add first question
                $(document.createElement('h6')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
                //add image if present
                if(quiz[0].hasOwnProperty('image') && quiz[0]['image'] != ""){
                    $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
                }
                $(document.createElement('p')).addClass('explanation').attr('id','explanation').html('&nbsp;').appendTo('#frame');
            
                //questions holder
                $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');
            
                //add choices
                addChoices(quiz[0]['choices']);
            
                //add submit button
                $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('Check Answer').css({'font-weight':700,'color':'#222','padding':'30px 0'}).appendTo('#frame');
            
                setupButtons();
            }
        }
        
        init();
    });