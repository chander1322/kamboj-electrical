import mongoose from "mongoose";


export async function connectDB(){

console.log(
"URI:",
process.env.MONGODB_URI
);


try{

const conn = await mongoose.connect(
process.env.MONGODB_URI!
);


console.log(
"CONNECTED:",
conn.connection.host
);


}
catch(error:any){

console.log(
"ERROR:",
error.message
);

}

}