const randomDateButton = document.querySelector('#randomDate')
const randomList = document.querySelector('#randomList')

const createDateList = (dates) => {
    randomList.innerHTML = ``
    const datecard = document.createElement('div')
    datecard.id = 'dateList'
    console.log('test')
    datecard.innerHTML = `
    <h4>${dates.name}</h4>
    <P>${dates.description}</P>
    `

    randomList.appendChild(datecard)
}
const randomListFunction = () => {
    axios.get('http://localhost:4747/randomList')
   .then((res) => {
       console.log(res.data)
           createDateList(res.data)
   })
    
}

randomDateButton.addEventListener('click', randomListFunction)