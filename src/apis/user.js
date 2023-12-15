import { request } from "@/utils"; 

export function loginAPI(data){
    return request({
        url:'/authorizations',
        method:'POST',
        data:data
    })
}


export function getProfileAPI(){
    return request({
        url:'/user/profile',
        method:'GET',
    })
}
