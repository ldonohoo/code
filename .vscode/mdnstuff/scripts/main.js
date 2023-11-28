const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

let storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";

const insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
const insertY = ["the soup kitchen", "Disneyland", "the White House"];
const insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];



function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

randomize.addEventListener('click', result);

function result() {

    let newStory = storyText;
    let xitem = randomValueFromArray(insertX);
    let yitem = randomValueFromArray(insertY);
    let zitem = randomValueFromArray(insertZ);
   
    newStory = newStory.replaceAll(":insertx:", xitem);
    newStory = newStory.replaceAll(":inserty:", yitem);
    newStory = newStory.replaceAll(":insertz:", zitem);

    if(customName.value !== '') {
        const name = customName.value;
        newStory = newStory.replaceAll("Bob", name);   
    }

    if(document.getElementById("uk").checked) {
        
        const weight = Math.round(300/14) + " stone";
        const temperature =  Math.round((94-32)*(5/9)) + " Celcius";
        newStory = newStory.replace("300 pounds", weight);
        newStory = newStory.replace("94 fahrenheit", temperature);
    }

    story.textContent = newStory;
    story.style.visibility = 'visible';
    }