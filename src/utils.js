const request = require('request')


const geocode = (address,callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +address + ".json?access_token=pk.eyJ1IjoiaGVsbG8xMjEiLCJhIjoiY2t2YjI4MDQ5MjUyMTJyb2t1Njg2eXlyayJ9.iwDT4iXdT58EqiCIZMYzHw"
    
    request({url, json : true},(error,{body})=>{
      
        if(error){
            callback('unable to access server',undefined)
        }
        else if(body.features.length===0){
            callback('please try with other location',undefined)
        }
        else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                Longitude : body.features[0].center[0],
                Location : body.features[0].place_name
            })
        }
    })
}



const forcast = (latitude,longitude,callback)=>{
    const url =  "https://api.darksky.net/forecast/fc2c3eb2d4eac475ff0a1dc66f9a6f89/"+encodeURIComponent(latitude)+','+ encodeURIComponent(longitude)+'?units=si'

    request({url , json:true},(error,{body})=>{
        if (error){
            callback('unable to access server',undefined)
        }
        else if(body.error){
            callback('The given location is invalid.',undefined)
        }
        else{
            // console.log(latitude,"  ",longitude)
            callback(undefined,'It is currently '+body.currently.temperature+' degrees out.There is '+body.currently.precipProbability+' chance of rain.')
        }
    })

}



module.exports = {
    geocode : geocode,
    forcast : forcast
}
