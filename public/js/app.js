const button = document.getElementById('submit')
const forcast1 = document.querySelector('.forcast1')
const forcast2 = document.querySelector('.forcast2')



button.addEventListener('click',()=>{
    
    forcast1.textContent = "Loading...."
    const input = document.querySelector('input').value
    fetch('/weather?address='+input).then((response)=>{
    response.json().then((data)=>{
       if(data.error){
           return forcast1.textContent = data.error
       }

       forcast1.textContent = data.temperature
       forcast2.textContent =data.location
       
    })
})

    
})

