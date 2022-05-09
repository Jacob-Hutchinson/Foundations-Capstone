const randomDateButton = document.querySelector('#randomDate')
const randomList = document.querySelector('#randomList')
const cheapButton = document.querySelector('#cheapDate')
const mediumButton = document.querySelector('#mediumDate')
const priceyButton = document.querySelector('#priceyDate')

const baseURL = 'https://foundations-capstone-jh.herokuapp.com/'

const createDateList = (dates) => {
    randomList.innerHTML = ``
    const datecard = document.createElement('div')
    datecard.id = 'dateList'
    datecard.innerHTML = `
    <h4>${dates.name}</h4>
    <P>${dates.description}</P>
    `

    randomList.appendChild(datecard)
}
const randomListFunction = () => {
    axios.get(`${baseURL}randomList`)
   .then((res) => {
       console.log(res.data)
           createDateList(res.data)
   })
    
}
const cheapDate = () => {
    axios.get(`/cheapList`)
    .then((res) => {
        createDateList(res.data)
    })
}
const mediumDate = () => {
    axios.get(`/mediumDate`)
    .then((res) => {
        createDateList(res.data)
    })
}
const priceyDate = () => {
    axios.get(`/priceyDate`)
    .then((res) => {
        createDateList(res.data)
    })
}

randomDateButton.addEventListener('click', randomListFunction)
cheapButton.addEventListener('click', cheapDate)
mediumButton.addEventListener('click', mediumDate)
priceyButton.addEventListener('click', priceyDate)