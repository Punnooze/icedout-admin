import {NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { connectMongoDB } from '@/lib/mongodb';
import Admin from '@/models/adminModel';


export async function POST(request){
    try{
        const req = await request.json()
        await connectMongoDB();
        let adminRes = await Admin.findOne({name:req.name})
        
        if(adminRes && (await bcrypt.compare(req.password,adminRes.password))){
            console.log(true)
            const token = jwt.sign({
                data:req
            },process.env.JWT_SECRET,
            {expiresIn:'10d'})
            adminRes = adminRes._doc;
            adminRes = {
                ...adminRes,
                token: token
            }
            const resp = {
                success:true,
                data:adminRes
            }
            return NextResponse.json(resp)
        }
        const resp = {
            success:false,
            error:"Invalid Credentials"
        }
        
        return NextResponse.json(resp)
    }catch(err){
        console.log(err)
        const resp = {
            success:false,
            error:JSON.stringify(err)
        }
        return NextResponse.json(resp)
    }
}