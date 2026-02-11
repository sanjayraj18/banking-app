import express from "express"
import {db} from "@repo/db/client"

const app = express()

app.post("/hdfcWebhook" , async (req,res) => {
    //we have to check the request is actually comes from hdfc bank
    const paymentInformation = {
        token : req.body.token,
        userId : req.body.user_identifier,
        amount : req.body.amount
    }
    try{
        //transaction will follow ACID principle, either all or none, because two should process at the same time
        await db.$transaction([
             db.balance.update({
                where:{
                    userId : Number(paymentInformation.userId)
                },
                data : {
                    amount :{
                        //if two request comes parallel , it will process one after the other 0+200 first and 200+200 second
                        //not 0+200, 0+400
                        increment : Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.update({
                where:{
                token : paymentInformation.token
                },
                data:{
                    status : "Success"
                }
            })
        ])
    }catch(e){
        throw e;
    }
    res.status(200).json({
        message : "captured hdfc bruh"
    })
    
})