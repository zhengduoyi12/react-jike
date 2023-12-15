import { request } from "@/utils"; 


export function getChannelListAPI(){
    return request({
        url:'/channels',
        method:'GET',
    })
}

export function handlePublishAPI(data){
    return request({
        url:'/mp/articles?draft=false',
        method:'POST',
        data,
    })
}
