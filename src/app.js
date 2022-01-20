const express = require('express')
const path = require('path')
const hbs = require('hbs')
const kando = require('./utils')

const app = express()

//setup handlebar engine and views location
app.set('views',path.join(__dirname,'../template/views'))
app.set('view engine','hbs')

const partial_path = path.join(__dirname, '../template/partials')
hbs.registerPartials(partial_path)
const mainurl = path.join(__dirname,'../public')

app.use(express.static(mainurl))

app.get('',(req,res)=>{
    res.render("index.hbs",{
        title : 'Weather App',
        name : 'AK47'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About',
        name : 'akshay'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : 'ERROR',
        kanda : '404 ERROR of help page '

    })
})

// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//         return res.send({
//             error:"u must provide search term"
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//             products : []
//     })
// })


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"address should be entered"
        })
    }
    kando.geocode(req.query.address,(error, { latitude, Longitude, Location } = {}) =>{
            if (error) {
                return res.send({error})
            }
            if(!latitude){
                return res.send()
            }

            kando.forcast(latitude, Longitude, (error, data) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    temperature: data,
                    location: Location,
                    address: req.query.address
                })


            })
        })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : 'ERROR',
        kanda : 'this is 404 of main'
    })
})







app.listen(3000,()=>{
   console.log('server is up on port 3000') 
})


// const helpurl = path.join(__dirname,'../public/help.html')

// app.use(express.static(helpurl))

// const abouturl = path.join(__dirname,'../public/about.html')
// app.use(express.static(abouturl))

// app.get('/help',(req,res)=>{
//     res.send('this is help page')
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })

