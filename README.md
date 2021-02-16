# musical-guiclone

[coucou](https://coconet.glitch.me/#) is a website which describes and provides access to 
experimentation with a neural network trained to provide completions of four-part harmofor melodic material that the user provides, via a clickable grid of buttons which the GUI exposes.

The main objectives of this project were to:
* work backwards from the original page and "reverse engineer" the essential functionality
* replace the code importing a pre-trained model with my own, simpler JavaScript for 
  providing completion of two-part harmony using a more rudimentary probabilistic approach
* experiment with different solutions for bringing in 3rd-party libraries as dependencies

## Essential functionality of the musical GUI

The main website element through which a user is able to interact with the pre-trained model
(loaded in coucou's `script.js`) is a 2-dimensional grid of buttons, where the height dimension
indicates pitch and the width dimension indicates time. 

I worked backwards from the `board.js` file which includes the definition for `Board` class,
in order to identify the essential aspects of the implementation for the sake of entering 
melodic material, playing it back, keeping track of user-input vs. infilled material, and serializing
the current board contents into a form usable in the site URL. 

This resulted in the definition of a class, `ButtonGrid`, with the following attributes:
* `data`, for storing the status of each square in the grid as a JSON object tracking an 
  `on` property (0 if off, 1 if clicked by user, and 2 if infilled by harmonizing logic.)
* `ui`, for storing a reference to the `id: container` div which is populated with rows of buttons
  upon initialization of a `ButtonGrid` instance (which calls the `reset()` method.)
* `grid_width`, `grid_height`, and `max_pitch`, which obtain values from global variables in the 
  `buttongrid.js` module, and which indicate the width of the grid, the height of the grid, and the 
  pitch to which the top row of the button grid corresponds, respectively.
  
As well, the `ButtonGrid` class has the following methods:
* `toggleCell(i, j, flag)` for flipping the state of user-clicked buttons between on vs. off, 
  as well as for updating the state of infilled buttons when the infill method is invoked
  - all updates are performed inside the `ButtonGrid` instance attributes, for the sake of 
    representing the current board state
* `updateHash()` for updating the hash that is included in the site URL upon changes to the state
  of any buttons
* `updateButton(btn, btnState)` for updating the HTML elements in tandem with changes to the board 
  state induced by user interactions or infilling, so that different styling will be applied to off 
  vs. clicked vs. infilled positions on the GUI
* `loadHash(s)` for parsing a hash into a `NoteSequence` object, for audio synthesis in browser 
  via the `magenta/music` library 
* `getNoteSequence()`, for obtaining a note sequence from the current board state

These methods are employed by the `index.js` for providing interactivity with an HTML button grid representing
a `ButtonGrid` instance, audio synthesis based upon the current board state for playback upon request, and infilling 
to harmonize the current melody based upon a probabilistic method.

## Basic infill for two-part harmony completion

The `infill2()` method 

## Bringing in 3rd-party libraries


