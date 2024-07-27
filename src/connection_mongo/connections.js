const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://vatsal0909:vatsal0909@nfc.sebbf5a.mongodb.net/?retryWrites=true&w=majority&appName=NFC").then(()=>{console.log("databse connected to NFC mongodb atlas")}).catch((e)=>{console.log("error in connections wtih database "+ e)});