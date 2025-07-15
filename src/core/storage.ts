
import config from "./config"


const setAuth = (token:string) =>
{
    try{
    localStorage.setItem(config.storage.baseTag+config.storage.router.auth,token)
    return true;
}catch(e){
    return ""
}
}

const getAuth = () =>
{
    try{
    return localStorage.getItem(config.storage.baseTag+config.storage.router.auth)
}catch(e){
    return ""
}
}

const setUserId = (token:string) =>
{
    try{
        localStorage.setItem(config.storage.baseTag+config.storage.router.user,token)
        return true;
    }catch(e){
        return ""
    }
}

const getUserId = () =>
{
    try{
        return localStorage.getItem(config.storage.baseTag+config.storage.router.user)
    }catch(e){
        console.error(e)
        return ""
    }
}
export{
    setAuth,
    getAuth,

    setUserId,
    getUserId,
}