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
* `data`, for storing the status of each square in the grid as a 

## Basic infill for two-part harmony completion

## Bringing in 3rd-party libraries


