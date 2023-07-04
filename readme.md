# Cough Widget 😷 📱

## Objective

- **Stack:** this is a simple typescript react application with vanilla css.
- **Interactivity:**
    Upon loading the application will fetch data from the end point described in the .yaml file. Afterwards the widget should display a number of elements:
    - percentage of change
    - graph that displays the trend of change
    - a message that encapsulates the overall meaning of said change
- **Functionality:**
    - Clicking the 'x' button will prompt an alert and reset the values.
    - Clicking 'Refresh' button will fetch another dataset.
        - data will be randomized
        - fetch paramaters are current day and the 7th day prior. 
    - Site should be mobile friendly

----

## Future Considerations:
- Maybe adding some animations to elements to provide a smoother tranisition upon loading/refresh.
- adding loading state for cards
- accessiblity audit
- would have probably used SASS in production

## Notes:
I used Vite to build this react project because it is considerably faster/ more lightweight than `create react app` and does better with TypeScript. I also wanted to test out Figma's dev_mode and vscode extension, which provided a better work flow. I also wanted to approach this with a mobile first mindset and since there were no designs for the desktop view, I just left it pretty much untouched for larger viewports.

I debated on making the ellipse, triangle 'x' button from scratch in CSS but decided to speed up the build time (and I also didnt see much of a benefit to doing so) I just imported the svgs from Figma. 

Lastly, I know that the 'x' button would close this screen but since we are just building this screen alone, once you click it, the values reset to `0` and an alert triggers to let you know it registered the click. 

## Work environment

- clone the repo
- cd to main folder `cd hyfeai`
- install the dependencies: `npm install`
- start : `npm run dev`
- open http://localhost:5173/
