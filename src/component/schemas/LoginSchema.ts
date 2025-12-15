 import * as z from "zod";
 
 export const LoginSchema =z.object({ 
    email:z.email("enter valid email "),
    password:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"password invalid ")
  })