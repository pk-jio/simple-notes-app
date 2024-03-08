import { createNote, readNote, readAllNotes, updateNote, deleteNote } from './data.js';

window.btnAnim =  function(event, first, second) {
  event.target.style.backgroundColor = first;
  
  let interval = setTimeout(() => {
    clearInterval(interval)
    event.target.style.backgroundColor = second
  }, 150)
}

let activeId = '', prevActiveId = ''

const navbar = document.getElementsByClassName('navbar')[0]
navbar.addEventListener('click', showWelcome)

const newNoteBtn = document.getElementsByClassName('new-note')[0]
newNoteBtn.addEventListener('click', newUserNote)

const sideList = document.getElementsByClassName('side-list')[0]

const saveNoteBtn = document.getElementsByClassName('save-note')[0]
saveNoteBtn.addEventListener('click', saveUserNote)

const deleteNoteBtn = document.getElementsByClassName('delete-note')[0]
deleteNoteBtn.addEventListener('click', deleteUserNote)

const welcomeNote = document.getElementsByClassName('welcome-note')[0]
const content = document.getElementsByClassName('content')[0]

const noteTitle = document.getElementsByClassName('note-title')[0]
const noteBody = document.getElementsByClassName('note-body')[0]

function showWelcome() {
  welcomeNote.style.display = 'block'
  content.style.display = 'none'
}

function showEditor(){
  welcomeNote.style.display = 'none'
  content.style.display = 'flex'

  noteTitle.focus()
}

function getEle(id) {
  return document.getElementById(id)
}

function changeActiveId() {
  getEle(prevActiveId)?.classList.remove('active')
  getEle(activeId).classList.add('active')
}

function changeActiveNote(event) {
  if(event) {
    prevActiveId = activeId
    activeId = event.target.id
  }
  changeActiveId()
  showEditor()
  
  const note = readNote(activeId)
  // console.log('activeId', activeId, note)
  noteTitle.value = note.title=='untitled' ? '' : note.title
  noteBody.value = note.body
}

function newSideListItem(note) {
  const p = document.createElement('p')
  p.id = note.id
  p.textContent = note.title
  p.className = 'side-list-item'
  p.addEventListener('click', changeActiveNote)

  sideList.append(p)
}

function generateUniqueId() {
  return Math.random().toString(36).substring(2, 9);
}

function newUserNote() {
  // console.log('new note')
  showEditor()

  const note = {
    id: generateUniqueId(),
    title: 'untitled',
    body: ''
  }
  createNote(note)

  newSideListItem(note)
  prevActiveId = activeId
  activeId = note.id
  changeActiveNote()
}

function loadSideList() {
  readAllNotes().forEach(note => newSideListItem(note))
}
loadSideList()

const trimTitle = title => title.trim().substring(0, 15)

function saveUserNote() {
  const title = trimTitle(noteTitle.value) == '' ? 'untitled' : noteTitle.value
  const note = {
    id: activeId,
    title,
    body: noteBody.value
  }
  // console.log('activeId', activeId, note)
  updateNote(note)

  const p = document.getElementById(activeId)
  p.textContent = note.title
}


function deleteUserNote() {
  deleteNote(activeId)
  const p = document.getElementById(activeId)
  setTimeout(() => {
    p.remove()
    showWelcome()
  }, 800)
}