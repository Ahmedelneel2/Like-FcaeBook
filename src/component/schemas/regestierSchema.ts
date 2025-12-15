 import * as z from "zod";
 
 export const schema =z.object({ 
     name: z.string().min(3 , "name must be at least 3 charachter ").max(20,"name must be at least 20 character "),
    email:z.email("enter valid email "),
    password:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"password invalid "),
    rePassword:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"rePassword invalid "),
    dateOfBirth:z.coerce.date("enter valiud date ").refine(function(value){
      const currentDate = new Date().getFullYear();
      const birthYear = value.getFullYear();
      const age = currentDate - birthYear;
      if(age < 18){
        return false
      } else{
        return true
      }
    }," you must be at least 18 year old "),
    gender:z.enum(["male", "female"])}).refine(function(values ){
      if(values.password === values.rePassword){
        return true
      }else{
        return false
      }
    }, {path:["rePassword"] , message: "password and repassword must  be the same "} )