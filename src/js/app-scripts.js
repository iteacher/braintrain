/* global google */
/* global firebase */

import { applyConfig } from './config.js';
import './firebaseInit.js';


document.addEventListener('DOMContentLoaded', function () {

    console.log("Page loaded");

   // Listen for the custom 'firebaseReady' event
   document.addEventListener('firebaseReady', function () {
    console.log("Firebase is ready");

        applyConfig(); // Apply cross-domain policies


        function setupGoogleSignIn() {
            const signInButton = document.getElementById('sign-in');
            const signOutButton = document.getElementById('sign-out');
            const status = document.getElementById('sign-in-status');

            // Ensure GoogleAuthProvider is accessed correctly
            const provider = new firebase.auth.GoogleAuthProvider();

            signInButton.addEventListener('click', () => {
                console.log("Sing-in button clicked");

                window.auth.signInWithPopup(provider)
                    .then(result => {
                        const user = result.user;
                        console.log("Signed in as", user);

                        status.textContent = `Signed in as ${user.displayName}`;
                        signInButton.style.display = 'none';
                        signOutButton.style.display = 'block';
                        document.getElementById('main-content').style.display = 'block';
                    })
                    .catch(error => {
                        console.error('Error signing in:', error);
                        status.textContent = `Sign-in failed: ${error.message}`;
                    });
            });

            signOutButton.addEventListener('click', () => {
                window.auth.signOut()
                    .then(() => {
                        status.textContent = 'Signed out';
                        signInButton.style.display = 'block';
                        signOutButton.style.display = 'none';
                        document.getElementById('main-content').style.display = 'none';
                    })
                    .catch(error => {
                        console.error('Error signing out:', error);
                        status.textContent = `Sign-out failed: ${error.message}`;
                    });
            });
        }

        setupGoogleSignIn();

        // Ensure Firebase is initialized before using it
        if (typeof firebase === 'undefined') {
            console.error('Firebase SDK not loaded');
            return;
        }

        //const auth = firebase.auth();
        //const database = firebase.database();
        //const ref = window.db.ref;
        //const update = window.db.update;

        //const db = firebase.database();

        window.addEventListener('load', function () {
            console.log("****************INIT FEDCM***************");
            try {
                initializeFedCM();
                console.log("****************COMPLETED FEDCM***************");
            } catch (error) {
                console.error("Error initializing FedCM:", error);
            }

        });


        console.log("SETTING setupInteractions");
        setupInteractions();

        console.log("SETTING UP drawPermanentLines");
        drawPermanentLines();

        console.log("SETTING UP setupLinkPrevention");
        setupLinkPrevention();

        console.log("SETTING UP updateLinkButton");
        updateLinkButton();

        console.log("SETTING UP setupGlobalClickListener");
        setupGlobalClickListener();

        console.log("SETTING UP setupInputListeners");
        setupInputListeners();

        console.log("SETTING UP setupScoreChangeListeners");
        setupScoreChangeListeners();

        console.log("SETTING UP setupBonusListeners");
        setupBonusListeners();

        console.log("SETTING UP setupResultsPopupListeners");
        setupResultsPopupListeners();

        console.log("SETTING UP setupResetTickboxesButton");
        setupResetTickboxesButton();

        console.log("SETTING UP setupMaxScoreButtons");
        setupMaxScoreButtons();

        console.log("SETTING UP setupSettingButton");
        setupSettingButton();

        console.log("SETTING UP setupNeuronListeners");
        setupNeuronListeners();

        console.log("SETTING UP loadAllNeuronData");
        loadAllNeuronData();

        console.log("SETTING UP updateNeuronFills");
        updateNeuronFills();

        //console.log("SETTING UP GOOGLE SIGN setupGoogleSignIn");
        //setupGoogleSignIn();

        console.log("CHECKING AUTH STATE");
        checkAuthState();

        console.log("****************FINISHED DOM LOAD***************");
    });
});

function setupInputListeners() {

    console.log("Setting up input listeners...");
    const inputs = document.querySelectorAll('.number-box');
    console.log(`Found ${inputs.length} input elements`);

    inputs.forEach(input => {
        console.log(`Setting listener for input: ${input.name || input.id}`);
        input.addEventListener('input', function () {
            console.log(`Input changed for ${this.name || this.id}:`, this.value);
            // Call your update function here
            handleNeuronUpdate(this.dataset.neuronId);
        });
    });

    const saveGameButton = document.getElementById('save-game');
    if (saveGameButton) {
        saveGameButton.addEventListener('click', saveGameState);
    }

    const loadGameButton = document.getElementById('load-game');
    if (loadGameButton) {
        loadGameButton.addEventListener('click', loadGameState);
    }

    const predictionInput = document.getElementById('predictionInput');
    const outputNeuronInput = document.querySelector('.circle.green:last-child .number-box.large');
    const computeButton = document.querySelector('button[name="compute"]');

    //enforce initial state, if values loaded from db.
    if (predictionInput && outputNeuronInput) {
        toggleComputeButton();
    }

    //listening for io changes to toggle compute button visiblity
    predictionInput.addEventListener('input', toggleComputeButton());
    outputNeuronInput.addEventListener('input', toggleComputeButton());

    //Event listener for computer button clicked
    computeButton.addEventListener('click', function () {

        //console.log('Compute button clicked');
        const predictionValue = parseFloat(predictionInput.value);
        const outputValue = parseFloat(outputNeuronInput.value);

        if (!predictionInput || !outputNeuronInput) {
            return;
        }

        if (isNaN(predictionValue) || isNaN(outputValue)) {
            return;
        }

        // Too high
        if (outputValue > predictionValue) {
            document.querySelectorAll('.circle.hidden-layer').forEach(neuron => {
                const neuronValue = parseFloat(neuron.querySelector('.number-box.large').value);
                if (neuronValue < outputValue) {
                    const checkbox = neuron.querySelector('input[type="checkbox"]');
                    checkbox.checked = true; // Show them
                    triggerCheckboxEvent(checkbox);
                }
            });
        }

        // Too low
        if (outputValue < predictionValue) {
            document.querySelectorAll('.circle.hidden-layer').forEach(neuron => {
                const neuronValue = parseFloat(neuron.querySelector('.number-box.large').value);
                if (neuronValue > outputValue) {
                    const checkbox = neuron.querySelector('input[type="checkbox"]');
                    checkbox.checked = true; // Show them
                    triggerCheckboxEvent(checkbox);
                }
            });
        }

        displayResults(); // Call this function to display results after computation
    });


    document.querySelectorAll('.score').forEach(scoreElement => {
        scoreElement.addEventListener('input', function () {
            const neuronId = this.closest('.circle').getAttribute('data-id');
            const scoreValue = parseInt(this.textContent) || 0; // Assuming the score is an integer
            updateScoreInDB(neuronId, scoreValue);
        });
    });


    document.getElementById('reset-scores').addEventListener('click', function () {
        if (window.confirm('Are you sure you want to reset all scores?\nThis action cannot be undone.')) {
            const neurons = Array.from(document.querySelectorAll('.circle')); // Convert NodeList to an array
            //const db = firebase.database();

            const updatePromises = neurons.map(neuron => {
                const neuronId = neuron.getAttribute('data-id');
                const neuronRef = window.db.ref('neurons/' + neuronId);
                return neuronRef.update({ score: '0', fill: '0' });  // Reset score and fill to zero
            });

            Promise.all(updatePromises)
                .then(() => {
                    console.log('All scores reset successfully');
                    neurons.forEach(neuron => {
                        const scoreElement = neuron.querySelector('.score');
                        scoreElement.textContent = '0'; // Reset the score text immediately

                        // Reset fill height in the UI immediately
                        const fillElement = neuron.querySelector('.fill');
                        if (fillElement) {
                            fillElement.style.height = '0%';
                        }
                    });
                    // Call updateNeuronFills to ensure UI reflects the changes
                    updateNeuronFills();
                })
                .catch(error => {
                    console.error('Error resetting scores:', error);
                });
        }
    });
}



function setupInteractions() {

    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

    for (let i = 1; i <= 11; i++) {
        listenForNeuronChanges('neuron' + i);
    }

    window.addEventListener('resize', resizeText);
    window.addEventListener('load', resizeText);

    document.querySelectorAll('.circle[data-id="2"], .circle[data-id="5"], .circle[data-id="8"]').forEach(circle => {
        circle.addEventListener('mouseenter', () => showPopup(document.querySelector('.popup')));
        circle.addEventListener('mouseleave', () => hidePopup(document.querySelector('.popup')));
    });

    document.querySelectorAll('.circle[data-id="3"], .circle[data-id="6"], .circle[data-id="9"], .circle[data-id="4"], .circle[data-id="7"], .circle[data-id="10"]').forEach(circle => {
        circle.addEventListener('mouseenter', () => showPopup(document.querySelector('.popup2')));
        circle.addEventListener('mouseleave', () => hidePopup(document.querySelector('.popup2')));
    });

    document.querySelectorAll('.circle[data-id="11"]').forEach(circle => {
        circle.addEventListener('mouseenter', () => showPopup(document.querySelector('.popup3')));
        circle.addEventListener('mouseleave', () => hidePopup(document.querySelector('.popup3')));
    });

    document.querySelectorAll('.circle[data-id="1"]').forEach(circle => {
        circle.addEventListener('mouseenter', () => showPopup(document.querySelector('.popup1')));
        circle.addEventListener('mouseleave', () => hidePopup(document.querySelector('.popup1')));
    });

    //const resultMessage = document.querySelector('.result-label');
    const linkButton = document.getElementById('linkButton');
    const checkboxes = document.querySelectorAll('.checkbox');
    const circles = document.querySelectorAll('.circle');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const circle = this.closest('.circle');
            const circleId = circle.getAttribute('data-id');
            circle.style.opacity = this.checked ? '0.3' : '1.0';
            const lines = document.querySelectorAll(`.line[data-pair-id*='${circleId}-'], .line[data-pair-id*='-${circleId}']`);
            lines.forEach(line => line.style.opacity = this.checked ? '0' : '1.0');
        });
    });

    circles.forEach(circle => {
        circle.addEventListener('click', function () {
            if (this.classList.contains('green')) {
                //console.log('Selection of green or hidden layer circles is disabled.');
                return;
            }


            if (this.classList.contains('highlighted')) {
                this.classList.remove('highlighted');
            } else if (document.querySelectorAll('.circle.highlighted').length < 2) {
                this.classList.add('highlighted');
            }


            updateLinkButton(); // Update the link button whenever a circle is clicked
        });
    });

    linkButton.addEventListener('click', () => {
        linkHandler();
    });

}

function setupGlobalClickListener() {

    // Global click to hide messages
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.no-hide-on-click, .result-label, .popup')) {
            hideTooHigh();
            hideTooLow();
        }
    });

    const resetButton = document.getElementById('reset');
    if (resetButton) {
        resetButton.addEventListener('click', function () {
            //console.log('Reset button clicked');
            // Confirm before resetting
            if (window.confirm("Are you sure you want to reset all settings\nand clear all connections?")) {
                resetNeuralNetwork();
                initializeNeuronDataInDB();
            }

        });
    }


    document.addEventListener('click', function (event) {
        if (!event.target.closest('.no-hide-on-click, .result-label')) {
            hideTooHigh();
            hideTooLow();
        }
    });
}

function resetNeuralNetwork() {
    // Reset logic goes here
    // Example: Clear all inputs, uncheck checkboxes, and reset any displayed messages or states
    document.querySelectorAll('.hidden-layer .number-box.large').forEach(input => {
        input.value = ''; // Clears all text and password inputs
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false; // Unchecks all checkboxes
        triggerCheckboxEvent(checkbox);
    });

    // Remove links
    document.querySelectorAll('.line').forEach(line => {
        line.remove(); // Assuming 'line' elements are used to show connections
        drawPermanentLines();
    });

    //deselect any circles
    document.querySelectorAll('.circle.highlighted').forEach(circle => {
        circle.classList.remove('highlighted');
    });

    hideTooHigh(); // Hide any messages if previously displayed
    hideTooLow();
    //console.log('Neural network has been reset');
}

function setupLinkPrevention() {
    // Assign a 'layer' data attribute to each neuron to identify which layer they belong to.
    const h1Neurons = document.querySelectorAll('.circle.hidden-layer[data-id="2"], .circle.hidden-layer[data-id="5"], .circle.hidden-layer[data-id="8"]');
    const h2Neurons = document.querySelectorAll('.circle.hidden-layer[data-id="3"], .circle.hidden-layer[data-id="6"], .circle.hidden-layer[data-id="9"]');
    const h3Neurons = document.querySelectorAll('.circle.hidden-layer[data-id="4"], .circle.hidden-layer[data-id="7"], .circle.hidden-layer[data-id="10"]');

    h1Neurons.forEach(neuron => {
        neuron.dataset.layer = 'h1'; // Assigning layer identifiers
    });
    h2Neurons.forEach(neuron => {
        neuron.dataset.layer = 'h2';
    });
    h3Neurons.forEach(neuron => {
        neuron.dataset.layer = 'h3';
    });
}

function linkHandler() {
    const highlighted = Array.from(document.querySelectorAll('.circle.highlighted'));
    if (highlighted.length === 2) {
        const layer1 = highlighted[0].dataset.layer;
        const layer2 = highlighted[1].dataset.layer;


        // Only link if neurons are from different layers
        if (layer1 !== layer2) {
            const ids = highlighted.map(circle => circle.dataset.id);
            const pairId = `${Math.min(...ids)}-${Math.max(...ids)}`;
            let existingLine = document.querySelector(`.line[data-pair-id="${pairId}"]`);


            if (existingLine) {
                existingLine.remove(); // Remove the line if it exists
            } else {
                drawLineBetweenCircles(highlighted[0], highlighted[1], pairId);
            }
        } else {
            //console.log('Linking within the same layer is not allowed.');
        }

        // Reset highlighting after attempting to link
        highlighted.forEach(circle => circle.classList.remove('highlighted'));

        updateLinkButton(); // Ensure the button text is updated after linking/unlinking


    }
}

function toggleComputeButton() {
    const predictionInput = document.getElementById('predictionInput');
    const outputNeuronInput = document.querySelector('.circle.green:last-child .number-box.large');
    const computeButton = document.querySelector('button[name="compute"]');

    if (!predictionInput.value.trim() || !outputNeuronInput.value.trim()) {
        // Hide button
        computeButton.style.opacity = '0.5';
        computeButton.disabled = true;
    } else {
        // Show button
        computeButton.style.opacity = '1';
        computeButton.disabled = false;
    }
}


function updateLinkButton() {

    const highlighted = document.querySelectorAll('.circle.highlighted');
    const linkButton = document.getElementById('linkButton');

    if (highlighted.length === 2) {
        const layer1 = highlighted[0].dataset.layer;
        const layer2 = highlighted[1].dataset.layer;
        const ids = Array.from(highlighted).map(h => h.dataset.id);
        const pairId = `${Math.min(...ids)}-${Math.max(...ids)}`;
        const existingLine = document.querySelector(`.line[data-pair-id="${pairId}"]`);

        if (layer1 !== layer2) {
            linkButton.textContent = existingLine ? 'Unlink' : 'Link';
            linkButton.disabled = false;
            linkButton.style.opacity = 1; // Button fully visible and active
        } else {
            linkButton.textContent = 'Link';
            linkButton.disabled = true;
            linkButton.style.opacity = 0.5; // Button disabled and faded out
        }
    } else {
        linkButton.textContent = 'Link';
        linkButton.disabled = true;
        linkButton.style.opacity = 0.5; // Button disabled and faded out when less than two neurons are highlighted
    }
}

// function areDifferentLayers(highlightedNodes) {
//     if (highlightedNodes.length === 2) {
//         return highlightedNodes[0].dataset.layer !== highlightedNodes[1].dataset.layer;
//     }

//     return false;
// }

function triggerCheckboxEvent(checkbox) {
    //console.log('Triggering checkbox change');
    var event = new Event('change', { 'bubbles': true });
    checkbox.dispatchEvent(event);
}

function drawPermanentLines() {
    //console.log("Attempting to draw permanent lines...");
    const inputGreenCircle = document.querySelector('.container .circle.green[data-id="1"]');
    const outputGreenCircle = document.querySelector('.container .circle.green[data-id="11"]');

    // Select hidden neurons for connection from the input neuron
    const inputTargetNeurons = document.querySelectorAll('.grid .circle.hidden-layer[data-id="2"], .grid .circle.hidden-layer[data-id="5"], .grid .circle.hidden-layer[data-id="8"]');
    // Select hidden neurons for connection from the output neuron
    const outputTargetNeurons = document.querySelectorAll('.grid .circle.hidden-layer[data-id="4"], .grid .circle.hidden-layer[data-id="7"], .grid .circle.hidden-layer[data-id="10"]');

    // Draw lines from the input neuron to its target hidden neurons
    inputTargetNeurons.forEach(circle => {
        drawLineBetweenCircles(inputGreenCircle, circle, `${inputGreenCircle.dataset.id}-${circle.dataset.id}`);
    });

    // Draw lines from the output neuron to its target hidden neurons
    outputTargetNeurons.forEach(circle => {
        drawLineBetweenCircles(outputGreenCircle, circle, `${outputGreenCircle.dataset.id}-${circle.dataset.id}`);
    });
}

function drawLineBetweenCircles(circle1, circle2, pairId) {
    const rect1 = circle1.getBoundingClientRect();
    const rect2 = circle2.getBoundingClientRect();
    const x1 = rect1.left + rect1.width / 2;
    const y1 = rect1.top + rect1.height / 2;
    const x2 = rect2.left + rect2.width / 2;
    const y2 = rect2.top + rect2.height / 2;
    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    const line = document.createElement('div');

    line.className = 'line';
    line.setAttribute('data-pair-id', pairId);
    line.style.width = `${length}px`;
    line.style.height = '6px'; // Ensure the line has visible thickness
    line.style.backgroundColor = '#086B10';
    line.style.position = 'absolute';
    line.style.top = `${y1}px`;
    line.style.left = `${x1}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.transformOrigin = '0 0';

    document.body.appendChild(line); // Append line to a visible container

    // Ensure the line is hidden if not logged in
    const isAuthenticated = !!window.auth.currentUser;
    line.style.display = isAuthenticated ? 'block' : 'none';

    updateLinkButton(); // Ensure button text updates after drawing a new line
}

function hidePopup(element) {
    if (element.classList.contains('active')) {
        element.style.animation = 'fadeOutScaleDown 0.5s forwards';
        element.addEventListener('animationend', function () {
            element.style.display = 'none';
            element.classList.remove('active');
            element.style.animation = ''; // Reset animation for next time
        }, { once: true });
    }
}

function hideTooHigh() {
    const message = document.getElementById('tooHighMessage');
    if (message && message.classList.contains('active')) {
        message.style.animation = 'fadeOutScaleDown 0.5s forwards';
        message.addEventListener('animationend', () => {
            message.style.display = 'none';
            message.classList.remove('active');
        }, { once: true });
    }
}

function hideTooLow() {
    const message = document.getElementById('tooLowMessage');
    if (message && message.classList.contains('active')) {
        message.style.animation = 'fadeOutScaleDown 0.5s forwards';
        message.addEventListener('animationend', () => {
            message.style.display = 'none';
            message.classList.remove('active');
        }, { once: true });
    }
}

function showPopup(element) {
    element.style.display = 'block';
    element.style.opacity = '1';
    element.style.transform = 'scale(1)';
    element.classList.add('active');
}

function setupScoreChangeListeners() {
    const increaseButtons = document.querySelectorAll('.score-change[up-id]');
    const decreaseButtons = document.querySelectorAll('.score-change[down-id]');

    // Increment the score
    increaseButtons.forEach(button => {
        button.addEventListener('click', function () {
            const scoreId = this.getAttribute('up-id');
            const scoreElement = document.querySelector(`.score[score-id="${scoreId}"]`);

            if (scoreElement) {
                let currentScore = parseInt(scoreElement.textContent) || 0;
                currentScore += 1;
                scoreElement.textContent = currentScore;
                updateScoreInDB(scoreId, currentScore);
            }
        });
    });

    // Decrement the score
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function () {
            const scoreId = this.getAttribute('down-id');
            const scoreElement = document.querySelector(`.score[score-id="${scoreId}"]`);

            if (scoreElement) {
                let currentScore = parseInt(scoreElement.textContent) || 0;
                currentScore -= 1;
                scoreElement.textContent = currentScore;
                updateScoreInDB(scoreId, currentScore);
            }
        });
    });
}

function setupBonusListeners() {
    const add3Button = document.getElementById('add3');
    // const add5Button = document.getElementById('add5');

    add3Button.addEventListener('click', function () {
        //console.log('+3 button clicked');
        applyBonusToAllScores(3);
    });

    document.getElementById('add5').addEventListener('click', function () {
        this.disabled = true; // Disable the button to prevent further clicks during processing
        applyBonusToAllScores(5, () => {
            this.disabled = false; // Re-enable the button after all operations are complete
        });
    });
}

function applyBonusToAllScores(bonus, completionCallback) {
    const scores = document.querySelectorAll('.score');
    let updatesPending = scores.length;

    scores.forEach(scoreElement => {
        let currentScore = parseInt(scoreElement.textContent) || 0;
        scoreElement.textContent = currentScore + bonus;

        const neuronId = scoreElement.closest('.circle').getAttribute('data-id');
        updateScoreInDB(neuronId, scoreElement.textContent, () => {
            updatesPending--;
            if (updatesPending === 0) {
                updateNeuronFills(); // Only update fills after all DB updates are complete
                if (completionCallback) completionCallback(); // Call the completion callback if provided
            }
        });
    });
}

function setupResultsPopupListeners() {
    const resultPopup = document.getElementById('resultPopup');
    const popupHeader = resultPopup.querySelector('.popup-header');
    const closeButton = resultPopup.querySelector('.close-btn');
    const resizeHandle = resultPopup.querySelector('.resize-handle');

    closeButton.addEventListener('click', function () {
        resultPopup.style.display = 'none';
    });

    // Dragging functionality
    popupHeader.onmousedown = function (event) {
        let shiftX = event.clientX - resultPopup.getBoundingClientRect().left;
        let shiftY = event.clientY - resultPopup.getBoundingClientRect().top;

        function movePopup(pageX, pageY) {
            resultPopup.style.left = pageX - shiftX + 'px';
            resultPopup.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            movePopup(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            document.onmouseup = null;
        };
    };

    popupHeader.ondragstart = function () {
        return false;
    };

    // Resize functionality
    resizeHandle.onmousedown = function (event) {
        event.preventDefault();
        let startX = event.clientX;
        let startY = event.clientY;
        let startWidth = parseInt(document.defaultView.getComputedStyle(resultPopup).width, 10);
        let startHeight = parseInt(document.defaultView.getComputedStyle(resultPopup).height, 10);

        function onMouseMove(event) {
            resultPopup.style.width = startWidth + event.clientX - startX + 'px';
            resultPopup.style.height = startHeight + event.clientY - startY + 'px';
        }

        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            document.onmouseup = null;
        };
    };
}

function displayResults() {
    const predictionInput = document.getElementById('predictionInput');
    const outputNeuronInput = document.querySelector('.circle.green:last-child .number-box.large');
    const predictionValue = parseFloat(predictionInput.value);
    const outputValue = parseFloat(outputNeuronInput.value);
    const neurons = document.querySelectorAll('.circle.hidden-layer');
    let resultsHtml = '<table><thead><tr><th>Name</th><th>Value</th><th>Status</th></tr></thead><tbody>';

    // Loop through each neuron and determine its status
    neurons.forEach(neuron => {
        const neuronValue = neuron.querySelector('.number-box.large').value;
        const neuronName = neuron.querySelector('.number-box.small').value;
        let status = 'ON PAR'; // Default status

        if (neuronValue > predictionValue) {
            status = 'TOO HIGH';
        } else if (neuronValue < predictionValue) {
            status = 'TOO LOW';
        }

        // Append row for each neuron in the results table
        resultsHtml += `<tr><td>${neuronName}</td><td>${neuronValue}</td><td>${status}</td></tr>`;
    });

    resultsHtml += '</tbody></table>';
    let overallStatus = ''; // or any initial value that suits your needs

    // Determine overall status based on output value
    if (outputValue > predictionValue) {
        overallStatus = 'Output: Too High';
    } else if (outputValue < predictionValue) {
        overallStatus = 'Output: Too Low';
    } else {
        overallStatus = 'Output: On Par';
    }

    // Update the overall status message
    document.getElementById('highLowMessage').textContent = overallStatus;

    // Update the HTML content of the results table container
    document.getElementById('resultsTableContainer').innerHTML = resultsHtml;

    // Show the result popup
    showPopup(document.getElementById('resultPopup'));
}

// function animateScore(scoreElement, newScore, callback) {
//     let currentScore = parseInt(scoreElement.textContent);
//     const duration = 500; // Duration of the animation in milliseconds
//     const frameRate = 10; // Duration between each update
//     const totalFrames = duration / frameRate;
//     const increment = (newScore - currentScore) / totalFrames;

//     let frame = 0;
//     const counter = setInterval(() => {
//         frame++;
//         currentScore += increment;
//         scoreElement.textContent = Math.floor(currentScore);
//         if (frame === totalFrames) {
//             scoreElement.textContent = newScore; // Ensures it ends on the exact value
//             clearInterval(counter);
//             scoreElement.classList.remove('score-animate');
//             if (callback) callback(); // Execute callback after animation completes
//         }
//     }, frameRate);

//     scoreElement.classList.add('score-animate');
// }

function resizeText() {
    const smallBoxes = document.querySelectorAll('.number-box.small');

    smallBoxes.forEach(box => {
        // Clone the box to measure the text width without affecting the original content
        const clone = box.cloneNode(true);
        clone.style.visibility = 'hidden'; // Hide the clone
        clone.style.position = 'absolute'; // Position it off-screen
        clone.style.left = '-9999px';
        document.body.appendChild(clone);

        // Measure the width of the text within the clone
        const cloneWidth = clone.offsetWidth;

        // Calculate the ratio between the box width and the clone width
        const ratio = box.offsetWidth / cloneWidth;

        // Calculate the new font size based on the ratio
        const fontSize = parseFloat(window.getComputedStyle(box).fontSize);
        const newFontSize = fontSize * ratio;

        // Apply the new font size to the original box
        box.style.fontSize = newFontSize + 'px';

        // Remove the clone from the document
        document.body.removeChild(clone);
    });
}

function setupResetTickboxesButton() {
    const resetTicksButton = document.getElementById('reset-ticks');
    if (resetTicksButton) {
        resetTicksButton.addEventListener('click', function () {
            const checkboxes = document.querySelectorAll('.checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                triggerCheckboxEvent(checkbox);
            });
        });
    }
}

function updateNeuronFills() {
    const neurons = document.querySelectorAll('.circle');
    const maxScore = parseInt(document.getElementById('score-range-max').textContent);

    neurons.forEach(neuron => {
        const scoreElement = neuron.querySelector('.score');
        const score = parseInt(scoreElement.textContent) || 0;
        const targetFillHeight = Math.min(100, (score / maxScore) * 100);

        // Immediately set fill height to 0% to reset it
        if (score === 0) {
            neuron.querySelector('.fill').style.height = '0%';
            return; // Skip further processing if score is zero
        }

        // Directly set the fill height without animation
        neuron.querySelector('.fill').style.height = `${targetFillHeight}%`;
    });
}

function setupMaxScoreButtons() {
    // Get the max score label and buttons
    const maxScoreLabel = document.getElementById('score-range-max');
    const incrementButton = document.getElementById('score-range-inc');
    const decrementButton = document.getElementById('score-range-dec');

    // Set initial max score
    let maxScore = 30; // Default max score
    maxScoreLabel.textContent = maxScore;

    // Increment max score
    incrementButton.addEventListener('click', () => {
        maxScore += 5;  // Increment by 5 or another value you deem appropriate
        maxScoreLabel.textContent = maxScore;
        updateNeuronFills();  // Update fills to reflect new max score
    });

    // Decrement max score
    decrementButton.addEventListener('click', () => {
        if (maxScore > 5) { // Prevent max score from going below a minimum value, e.g., 5
            maxScore -= 5;
            maxScoreLabel.textContent = maxScore;
            updateNeuronFills();  // Update fills to reflect new max score
        }
    });

}

function setupSettingButton() {
    const settingsIcon = document.getElementById('settings-icon');
    const buttonsToToggle = [
        document.getElementById('reset-scores'),
        document.getElementById('reset-ticks'),
        document.getElementById('score-range-max'),
        document.getElementById('score-range-dec'),
        document.getElementById('score-range-inc'),
        document.getElementById('save-game'),
        document.getElementById('load-game'),

    ];


    settingsIcon.addEventListener('click', function () {
        // Add wobble animation
        this.classList.add('wobble');
        setTimeout(() => {
            this.classList.remove('wobble');
        }, 500); // Match the duration of the animation

        // Toggle visibility of the buttons
        buttonsToToggle.forEach(button => {
            if (button.style.display === 'none') {
                button.style.display = ''; // Show the button if it was hidden
            } else {
                button.style.display = 'none'; // Hide the button if it was shown
            }
        });
    });

}


async function saveGameState() {
    // Define options for the save file picker
    const options = {
        types: [
            {
                description: 'Text Files',
                accept: { 'text/plain': ['.txt'] },
            },
        ],
    };

    // Data collection for input and output neurons
    const inputOutputNeurons = document.querySelectorAll('.circle.green');
    let line1 = '';
    inputOutputNeurons.forEach(neuron => {
        const smallInput = neuron.querySelector('.number-box.small') ? neuron.querySelector('.number-box.small').value : 'N/A';
        let largeInput = 'N/A';
        if (neuron.dataset.id === '1') { // Specific handling for input neuron with different class for large input box
            largeInput = neuron.querySelector('.secret-box.large') ? neuron.querySelector('.secret-box.large').value : 'N/A';
        } else { // General handling for other neurons, assuming output is similar to hidden ones
            largeInput = neuron.querySelector('.number-box.large') ? neuron.querySelector('.number-box.large').value : 'N/A';
        }
        const score = neuron.querySelector('.score') ? neuron.querySelector('.score').textContent : '0';
        line1 += `${smallInput}; ${largeInput}; ${score}; `;
    });

    // Data collection for hidden neurons with links
    const hiddenNeurons = document.querySelectorAll('.circle.hidden-layer');
    let line2 = '';
    hiddenNeurons.forEach(neuron => {
        const smallInput = neuron.querySelector('.number-box.small') ? neuron.querySelector('.number-box.small').value : 'N/A';
        const largeInput = neuron.querySelector('.number-box.large') ? neuron.querySelector('.number-box.large').value : 'N/A';
        const score = neuron.querySelector('.score') ? neuron.querySelector('.score').textContent : '0';
        // Logic to determine link IDs; adjust as per actual link handling
        const links = getLinks(neuron);
        line2 += `${smallInput}; ${largeInput}; ${score}; ${links.left}; ${links.right}; `;
    });

    // Combining the data into the final format
    const data = `${line1.trim()}\n${line2.trim()}`;

    // Attempt to save the file using the File System Access API
    try {
        const handle = await window.showSaveFilePicker(options);
        const writableStream = await handle.createWritable();
        await writableStream.write(data);
        await writableStream.close();
        alert('File saved successfully!');
    } catch (err) {
        console.error('Failed to save file:', err);
        alert('Failed to save file.');
    }
}

// TO DESIGN AND ADD - Example function to fetch link data, adjust based on actual link data management
function getLinks(neuron) {
    const links = { left: '', right: '' }; // Placeholder for link ids
    // Logic to populate links.left and links.right based on application's link handling
    return links;
}

function setLinks(neuron, leftId, rightId) {
    // Implement link setting logic based on application's requirements
}

async function loadGameState() {
    // Define options for the file picker
    const options = {
        types: [
            {
                description: 'Text Files',
                accept: { 'text/plain': ['.txt'] },
            },
        ],
    };

    try {
        const [fileHandle] = await window.showOpenFilePicker(options);
        const file = await fileHandle.getFile();
        const fileContent = await file.text();

        // Process the file content
        const lines = fileContent.split('\n'); // Split the file content into lines
        const inputOutputLine = lines[0].split(';').map(item => item.trim()); // Split first line into parts
        const hiddenNeuronsLine = lines[1].split(';').map(item => item.trim()); // Split second line into parts

        const inputOutputNeurons = document.querySelectorAll('.circle.green');
        inputOutputNeurons.forEach((neuron, index) => {
            const baseIndex = index * 3;
            if (neuron.dataset.id === '1') {
                neuron.querySelector('.number-box.small').value = inputOutputLine[baseIndex];
                neuron.querySelector('.secret-box.large').value = inputOutputLine[baseIndex + 1];
            } else {
                neuron.querySelector('.number-box.small').value = inputOutputLine[baseIndex];
                neuron.querySelector('.number-box.large').value = inputOutputLine[baseIndex + 1];
            }
            neuron.querySelector('.score').textContent = inputOutputLine[baseIndex + 2];
        });

        const hiddenNeurons = document.querySelectorAll('.circle.hidden-layer');
        hiddenNeurons.forEach((neuron, index) => {
            const baseIndex = index * 5;
            neuron.querySelector('.number-box.small').value = hiddenNeuronsLine[baseIndex];
            neuron.querySelector('.number-box.large').value = hiddenNeuronsLine[baseIndex + 1];
            neuron.querySelector('.score').textContent = hiddenNeuronsLine[baseIndex + 2];
            // TO BE ADDED - Presently assuming `setLinks` is a function to update neuron links visually or logically
            setLinks(neuron, hiddenNeuronsLine[baseIndex + 3], hiddenNeuronsLine[baseIndex + 4]);
        });

        alert('File loaded successfully!');
        loadAllNeuronData();

    } catch (err) {
        console.error('Failed to load file:', err);
        alert('Failed to load file.');
    }
}

function handleNeuronUpdate(neuronId) {
    const neuronElement = document.querySelector(`.circle[data-id="${neuronId}"]`);

    if (neuronElement) {
        const labelScoreElement = neuronElement.querySelector('.score');
        const numberBoxSmallElement = neuronElement.querySelector('.number-box.small');
        const numberBoxLargeElement = neuronElement.querySelector('.number-box.large');

        // Check if the score element is 'contenteditable' or a similar non-input element
        if (labelScoreElement) {
            const updateScore = () => setNeuronData(neuronId, 'labelScore', labelScoreElement.textContent || labelScoreElement.value);
            if (labelScoreElement.isContentEditable) {
                labelScoreElement.addEventListener('input', updateScore);
            } else {
                labelScoreElement.addEventListener('change', updateScore);
            }
        }

        if (numberBoxSmallElement) {
            numberBoxSmallElement.addEventListener('input', () => {
                setNeuronData(neuronId, 'small', numberBoxSmallElement.value);
            });
        }

        if (numberBoxLargeElement) {
            numberBoxLargeElement.addEventListener('input', () => {
                setNeuronData(neuronId, 'large', numberBoxLargeElement.value);
            });
        }
    } else {
        console.log(`Neuron with ID ${neuronId} not found in the DOM.`);
    }
}

// Listening for changes in neuron data
function listenForNeuronChanges(neuronId) {
    //const db = firebase.database();
    const neuronRef = window.db.ref('neurons/' + neuronId);
    neuronRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            updateNeuronDisplay(neuronId, data);  // Updates neuron display based on data
            updateNeuronFills();  // Ensures fill updates after data changes
        }
    });
}



// Function to update the DOM based on the neuron data
function updateNeuronDisplay(neuronId, data) {
    const neuronElement = document.querySelector(`.circle[data-id="${neuronId}"]`);
    if (!neuronElement) {
        console.error('Neuron with ID', neuronId, 'not found in the DOM.');
        return;
    }

    // Update large and small number inputs
    const largeInput = neuronElement.querySelector('input.number-box.large');
    const smallInput = neuronElement.querySelector('input.number-box.small');
    const scoreElement = neuronElement.querySelector('.score');
    const fillElement = neuronElement.querySelector('.fill'); // Ensure this selector matches HTML


    if (largeInput && data.large !== undefined) {
        largeInput.value = data.large;
    }
    if (smallInput && data.small !== undefined) {
        smallInput.value = data.small;
    }
    if (scoreElement && data.score !== undefined) {
        scoreElement.textContent = data.score;
    }
    if (data.fill !== undefined && fillElement) {
        fillElement.style.height = `${data.fill}%`; // Update fill based on the percentage stored in the database
    }
}

// function saveNeuronData(neuronId, data) {
//     const dbRef = window.db.ref('neurons/' + neuronId);
//     dbRef.set(data).then(() => {
//         console.log("Neuron data saved successfully!");
//     }).catch((error) => {
//         console.error("Error saving neuron data:", error);
//     });
// }

function setupNeuronListeners() {
    // Selects all neuron elements including input, hidden-layer, and output neurons
    document.querySelectorAll('.circle').forEach(neuron => {
        const neuronId = neuron.getAttribute('data-id');
        if (!neuronId) {
            console.error('Neuron element missing data-id', neuron);
            return;
        }

        // Listeners for number inputs (large and small)
        neuron.querySelectorAll('input.number-box').forEach(input => {
            input.addEventListener('input', function () {
                const inputType = this.classList.contains('large') ? 'large' : 'small';
                const inputValue = this.value.trim(); // Protect against empty strings

                // Only proceed if input value is not empty
                if (inputValue) {
                    updateNeuronData(neuronId, inputType, inputValue);
                }
            });
        });

        // Listener for score changes, assuming the score is directly editable or within an input/label
        const scoreElement = neuron.querySelector('.score');
        if (scoreElement) {
            new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'characterData' || mutation.type === 'childList') {
                        const score = parseInt(scoreElement.textContent || scoreElement.value, 10);

                        // Protect against NaN values
                        if (!isNaN(score)) {
                            updateNeuronData(neuronId, 'score', score);
                            //updateNeuronFills();
                        }
                    }
                });
            }).observe(scoreElement, { characterData: true, childList: true, subtree: true });

            //updateNeuronFills(); 
        }
    });
}


// Function to update neuron data in the database
function updateNeuronData(neuronId, inputType, inputValue) {
    //const db = firebase.database();
    const neuronRef = window.db.ref('neurons/' + neuronId);

    const updates = {};

    // Build the updates object dynamically based on the input type and value
    updates[inputType] = inputValue;

    // Perform the update
    neuronRef.update(updates)
        .then(() => console.log('Data updated successfully for neuron:', neuronId))
        .catch((error) => console.error('Failed to update data for neuron:', neuronId, error));
}

function loadAllNeuronData() {
    //const db = firebase.database();
    const neuronsRef = window.db.ref('neurons');

    neuronsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            Object.keys(data).forEach(neuronId => {
                console.log('Updating each neuron');
                const neuronData = data[neuronId];
                console.log('Done updating each neuron');

                updateNeuronDisplay(neuronId, neuronData);
            });
            updateNeuronFills(); // Ensure fill colors are updated after all data is loaded
        } else {
            console.log('No neuron data available');
        }
    });
}


function initializeNeuronDataInDB() {
    //const db = firebase.database();
    console.log('Have db', window.db);

    document.querySelectorAll('.circle').forEach(neuron => {
        const neuronId = neuron.getAttribute('data-id');
        const smallInput = neuron.querySelector('input.number-box.small').value.trim();
        const score = neuron.querySelector('.score').textContent.trim();

        // Construct the neuron data object
        const neuronData = {
            large: '',  // Use 'N/A' or similar if input is empty
            small: smallInput || 'N/A',  // Use 'N/A' or similar if input is empty
            score: score || '0'         // Default score to '0' if empty
        };

        // Set data in Firebase, overriding any existing data
        console.log('Accessing Firedb');
        set(window.db.ref('neurons/' + neuronId), neuronData);
        console.log('Done accessing Firedb');

    });
}

function updateScoreInDB(neuronId, newScore) {
    //const db = firebase.database();
    const neuronRef = window.db.ref('neurons/' + neuronId);
    const maxScore = parseInt(document.getElementById('score-range-max').textContent);
    const fillPercentage = Math.min(100, (newScore / maxScore) * 100);

    const updates = {
        score: newScore,
        fill: fillPercentage
    };

    neuronRef.update(updates)
        .then(() => {
            console.log('Score and fill updated successfully for neuron:', neuronId);
            updateNeuronFills(); // Ensure fill updates after score changes
        })
        .catch((error) => {
            console.error('Failed to update score and fill for neuron:', neuronId, error);
        });
}


// function updateScoreAndFill(neuronId, newScore) {
//     const maxScore = parseInt(document.getElementById('score-range-max').textContent);
//     const fillPercentage = Math.min(100, (newScore / maxScore) * 100);

//     const updates = {
//         score: newScore,
//         fill: fillPercentage
//     };

//     console.log('Accessing Firedb');


//     const neuronRef = window.db.ref('neurons/' + neuronId);
//     set(neuronRef, updates); // TO CHECK AND UPDATE
// }

// function applyNeuronDataFromDB(neuronId, data) {
//     const neuronElement = document.querySelector(`.circle[data-id="${neuronId}"]`);
//     if (!neuronElement) {
//         console.error("Neuron with ID", neuronId, "not found");
//         return;
//     }

//     const scoreElement = neuronElement.querySelector('.score');
//     const fillElement = neuronElement.querySelector('.fill'); // Ensure this selector matches your fill element

//     if (scoreElement && fillElement && data.fill !== undefined) {
//         scoreElement.textContent = data.score; // Update score text
//         fillElement.style.height = `${data.fill}%`; // Apply fill percentage from the database
//     }
// }

function checkAuthState() {
    const signInButton = document.getElementById('sign-in');
    const signOutButton = document.getElementById('sign-out');
    const status = document.getElementById('sign-in-status');
    const mainContent = document.getElementById('main-content');

    window.auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in
            console.log("checkAuthState: User is signed in");
            status.textContent = `Signed in as ${user.displayName}`;
            signInButton.style.display = 'none';
            signOutButton.style.display = 'block';
            mainContent.style.display = 'block';
        } else {
            // User is signed out
            status.textContent = 'Signed out';
            signInButton.style.display = 'block';
            signOutButton.style.display = 'none';
            mainContent.style.display = 'none';
            console.log("checkAuthState: User is signed out");
        }
    });
}

// Initialize the FedCM API with FedCM enabled
function initializeFedCM() {
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
        google.accounts.id.initialize({
            client_id: '786766490817-dr5go1indng9pokg2q7f1ghn93ubeoul.apps.googleusercontent.com',
            callback: handleCredentialResponse,
            use_fedcm_for_prompt: true // Enable FedCM
        });

        // Optionally, show the One Tap prompt automatically
        google.accounts.id.prompt();
        console.log("initializeFedCM: One Tap prompt automatically shown");

    } else {
        console.error('Google Identity Services library not loaded.');
    }
}

function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    // handle the credential, send it to backend for verification
}


// function toggleLinesVisibility(isVisible) {
//     const lines = document.querySelectorAll('.line');
//     lines.forEach(line => {
//         line.style.display = isVisible ? 'block' : 'none';
//     });
// }  

function setNeuronData(data) {
    // TO BE ADDED
}

function set(value) {
    // TO BE ADDED
}

console.log("apps-scripts loaded");
