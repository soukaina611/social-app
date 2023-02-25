export const LoginStart=(userCredentials)=>({
    type:"LOGIN_START",
});

export const LoginSuccess=(user)=>({
    type:"LOGIN_SUCCESS",
    payload:user
});

export const LoginFaillure =(err)=>({
    type:"LOGIN_FAILLURE",
    payload:err
});

export const Follow =(userId)=>({
    type:"FOLLOW",
    payload:userId
})
export const UnFollow =(userId)=>({
    type:"UNFOLLOW",
    payload:userId
})