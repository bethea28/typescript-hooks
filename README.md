## How to use
Madib App For Fun!

First, make sure you have a modern version of `node` and `yarn.`

Run `yarn install` before getting started.

Make your changes to these files, then run `yarn start` to run the compiler.

A new window should open; if not, you can visit your page at
http://127.0.0.1:3000/. Any changes to the project files should trigger a new
build, and a refresh.

## Thoughts
Architecturally, I broke the app down into resuable components that serve a single purpose. I made the decision to handle all of the core logic and state management on the Redux side instead of mixing it within the component's state. I also added the ability to use Redux thunks. CSS wise I utilized the BEM methodology http://getbem.com/.
Along the way I had to refresh my knowledge in Redux and React Prop types because they are not libraries that I typically use. Ultimately, there are better ways to solve the problem. 
