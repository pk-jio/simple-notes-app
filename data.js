
const notesData = []
// localStorage.clear()
const data = localStorage.getItem('notesData')

if(data!=null) {
  notesData.push(...JSON.parse(data))
}

function saveNotesInStorage() {
  localStorage.setItem('notesData', JSON.stringify(notesData))
}

export function createNote(note) {
  notesData.push(note)

  saveNotesInStorage()
}

export function readNote(id) {
  return notesData.find(note => note.id==id)
}

export function readAllNotes() {
  return notesData
}

export function updateNote(note) {
  const index = notesData.findIndex(item => item.id==note.id)
  notesData[index].title = note.title
  notesData[index].body = note.body 

  saveNotesInStorage()
}

export function deleteNote(id) {
  const index = notesData.findIndex(note => note.id==id)
  notesData.splice(index, 1)

  saveNotesInStorage()
}






















// {
  //   id: 'abcde',
  //   title: 'untitled',
  //   body: ''
  // },
  // {
  //   id: 'bacde',
  //   title: 'untitled',
  //   body: ''
  // },
  // {
  //   id: 'cacde',
  //   title: '  hello    guyss',
  //   body: ''
  // }

const items = [
  // Animals
  "cat", "dog", "bird", "fish", "elephant",
  "lion", "tiger", "bear", "monkey", "dolphin",

  // Food
  "pizza", "pasta", "burger", "sushi", "salad",
  "sandwich", "soup", "fruit", "vegetable", "chocolate",

  // Objects
  "book", "phone", "computer", "car", "house",
  "chair", "table", "lamp", "pen", "paper",

  // Places
  "beach", "mountain", "forest", "river", "city",
  "country", "island", "desert", "ocean", "space",

  // Colors
  "red", "blue", "green", "yellow", "orange",
  "purple", "pink", "black", "white", "brown",

  // Activities
  "reading", "writing", "running", "swimming", "dancing",
  "singing", "playing", "cooking", "learning", "traveling"
];

const smallList = ["cat", "dog", "bird", "fish", "elephant",
"lion", "tiger", "bear", "monkey", "dolphin",]

export {smallList}

export default items;