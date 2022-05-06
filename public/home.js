
const dateList = document.querySelector('#dateList')
const dateForm = document.querySelector('#dateForm')
const deleteListButton = document.querySelector('#deleteList')
const editDateSection = document.querySelector('#editDate')

const getDates = () => {
    axios.get('http://localhost:4747/dateList')
    .then((res)=>{ 
        console.log(res)
        for(let i = 0; i < res.data.length; i++){
            createDateList(res.data[i])
        }
    })
}

const createDateList = (dates) => {
    // console.log(dates)
    const datecard = document.createElement('div')
    datecard.id = 'dateList'

    datecard.innerHTML = `
    <h4>${dates.name}</h4>
    <P>${dates.description}</P>
    <button  id="editDate${dates.id}">edit</button>
    <button onclick="deleteDate(${dates.id})">delete</button>
    `

    dateList.appendChild(datecard)

    // console.log(dates.id)
    
    const done = document.querySelector(`#editDate${dates.id}`)
    done.addEventListener('click', (e) => {
        editDate(dates)
})
}
// console.log(done)

const deleteDate = (dates) => {
    console.log(dates)
    axios.delete(`http://localhost:4747/deleteDate/${dates}`)
    .then((res) => {
        dateList.innerHTML = ``
        for(let i = 0; i < res.data.length; i++){
            createDateList(res.data[i])
        }
    })
}


const editDate = (date) => {
    console.log('editdate clicked')
    const editForm = document.createElement('form')

    
    editForm.innerHTML = `
        <input id='name-input' placeholder='name' value='${date.name}'/>
        <input id='description-input' placeholder='description' value='${date.description}' onclick="this.select()"/>
        <button>submit</button>

    `
    editDateSection.appendChild(editForm)


    editForm.addEventListener('submit', (e) => {
        
        e.preventDefault()
        let updateDate = {
            name: document.querySelector('#name-input').value,
            description: document.querySelector('#description-input').value
        }
        console.log(updateDate)
        axios.put(`/editDate/${date.id}`, updateDate)
        .then((res) => {
            dateList.innerHTML = ``
            for(let i = 0; i < res.data.length; i++){
                createDateList(res.data[i])
                editForm.remove()
            }
        })
    })

}

const submitHandler = (e) => {
    e.preventDefault()

    let nameInput = document.querySelector('#nameInput')
    let descriptionInput = document.querySelector('#descriptionInput')
    

    let bodyObj = { 
        name: nameInput.value,
        description: descriptionInput.value 
    }
    console.log(bodyObj)
    axios.post('/dateListPost', bodyObj)
    .then((res) => {
        console.log(res.data)
        dateList.innerHTML = ``
        for(let i = 0; i < res.data.length; i++){
            createDateList(res.data[i])
        }
    })

    nameInput.value = ''
    descriptionInput.value = ''
}


dateForm.addEventListener('submit', submitHandler)
getDates()
