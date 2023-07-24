// used for all user enspoints
import {object, string, TypeOf} from "zod"

export const createUserSchema = object({
    body: object({
        name: string({
            required_error:"Name is required"
        }),
        password: string({
            required_error:"Password is required"
        }).min(6, "Password is too short, should be 6 chars minimum"),
        passwordConfirmation: string({
            required_error:"Password confirmation is required"
        }),
        email:string({
            required_error:"Email is required"
        }).email("Not a valid email")
    }).refine((data)=> data.password === data.passwordConfirmation, {
        message:"Passwords do not match",
        path:["passwordConfirmation"], // trigger error for this field, property that should trigger validation
    })
})

export type CreateUserInput = TypeOf< typeof createUserSchema>