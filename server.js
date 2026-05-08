const express = require('express')
//express ek node.js framework h jiise hum server backend or web apps bana skte h ussse hi import kiya h 
const path = require('path')
//path ek built in module h files ke path ko indicate krta h 
const app = express()
// calling express for creating objects
const multer = require('multer')
// multer ek middleware h jo user ki uploaded files ko handle krta h 
const {mergePDF} = require('./merge')
// yaha hum destructuring ka use krke apne merge.jsfile ko import kr rhe h mergePDF isse voh function chalega jisse pdfs add honge
const upload = multer({dest : 'upload/' })
// yaha multer ki files ko upload folder me add kr raha h
app.use('/static', express.static('public'))
// yaha ek static path create kiya h taki public files ko hum browser me access kr ske browser pe
const port = 3000
// yaha hum ek path select kr rhe h jispe hamari application execute hogi
// means localhost:3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templetes/index.html"))
})
// yaha hum apna document(html) page server kr rhe h 

//  post request bhejta h pdf kesath merge route pr
// and then hum multer ki files ko upload folder me thi pdfs naam se unhe ek array me le rhe h 
// and then ek async function bana rhe h 
app.post('/merge', upload.array('pdfs' , 2) , async (req , res ,next)=>{
  // yaha jo request thi unki files ko print kr rhe h 
  console.log(req.files)
  // yah hum un requests ko await kara rahe h jo mergePdf me h “Do ya zyada paths ko jod ke ek correct full path banana”
  await mergePDF(path.join(__dirname , req.files[0].path) , path.join(__dirname , req.files[1].path ))
  // “User ko is URL par bhej rahe hain (redirect kar rahe hain)
  res.redirect(`http://localhost:3000/static/merger.pdf?t=${Date.now()}`)
    
    // res.send({data : req.files})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})