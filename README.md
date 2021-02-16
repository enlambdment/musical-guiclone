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
  
As well, the `ButtonGrid` class includes the following methods:
* `toggleCell(i, j, flag)` for flipping the state of user-clicked buttons between on vs. off, 
  as well as for updating the state of infilled buttons when the infill method is invoked
  - all updates are performed inside the `ButtonGrid` instance attributes, for the sake of 
    representing the current board state
* `updateHash()` for updating the hash that is included in the site URL upon changes to the state
  of any buttons
* `updateButton(btn, btnState)` for updating the HTML elements in tandem with changes to the board 
  state induced by user interactions or infilling, so that different styling will be applied to off 
  vs. clicked vs. infilled positions on the GUI
* `getNoteSequence()`, for obtaining a note sequence from the current board state

These methods are employed by the `index.js` for providing interactivity with an HTML button grid representing
a `ButtonGrid` instance, audio synthesis based upon the current board state for playback upon request, and infilling 
to harmonize the current melody based upon a probabilistic method.

## Basic infill for two-part harmony completion

The `infill2()` method is designed to provide a second melodic voice that forms consonances with the initial
melodic voice provided by the user (via clicks made on the GUI grid.) There are two principles behind the simplified
model of musical motion (from one note in the musical infill to the next) implemented via this method:

* because we do not want the resulting line to be excessively static, we want to reduce any tendency
  for the next note to sound the same pitch as the current note, at each iteration 
* at the same time, the maximum possible size (measured in semitones) of an interval for the melody to
  leap from one note to the next should be reasonably limited, *e.g.* not larger than 15 semitones
  (size of an octave + a perfect fourth).
  
Therefore, the auxiliary function `getNextConsonantPitch(currentConsP, availConsP)` was defined in order
to perform the selection (from `availConsP`) of a subsequent pitch to follow `currentConsP` by sampling from
a bimodal distribution over all pitches in `availConsP` within that 15-semitone distance from `currentConsP`.
The bimodal distribution was made "by hand", by multiplying two left-skewed binomial distributions then renormalizing
(in order for the sum over all possible outcomes to equal 1.) 

By sampling from such a distribution, which is built so as to have a low frequency of sampling the note at the 
middle of the within-radius range (while having greatest frequency of sampling those notes which lie at a modest
distance from said center of the range), the two principles of melodic motion indicated above could be modelled 
in a simplified manner. At the same time, actually finding JS libraries from which to import the necessary frequency-distribution
and weighted-sampling behavior led to the challenge of how to mediate between different possible module syntax conventions.

## Bringing in 3rd-party libraries

While exploring available JS libraries via npm, I prioritized lightweight, easy-to-understand libraries in my search.
Eventually I came to realize that `probability-distributions` included a method for sampling from a given array of 
choices with an optional parameter for providing an array of "weights" (*i.e.* different frequencies per outcome), while
`simple-statistics` included methods for constructing the arrays corresponding to various standard probability distributions 
over a discrete variable, but neither provided both. Although `simple-statistics` could be imported without the need for additional
build tools by simply including a `script` element to retrieve the library contents via a content delivery network (CDN), the same is
not true for `probability-distribution` because (at the time of this writing) the main module uses CommonJS syntax (*i.e.* `require(..)`) 
that is foreign to the JS runtime for browsers, such as Chrome:

```
var crypto = require('crypto');
```

For the purpose of mediating between the different possible choices for JS module syntax in the source code of external dependencies
vs. the need for the final JS code to be usable with the standard JS runtime available via most browsers, I chose webpack for its ability
to build out a dependency graph starting from JS module(s) as entry point, and traversing the 3rd-party libraries in order to locate the 
methods leveraged from these, including them in the final JS bundle. The modules in question were downloaded from `npm` and the 
`package.json` was kept updated to reflect these dependencies. 