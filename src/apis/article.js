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


export function getArticleAPI(data){
    return request({
        url:'/mp/articles',
        method:'GET',
        params:data,
    })
}

export function deleteArticleAPI(data){
    return request({
        url:`/mp/articles/${data}`,
        method:'DELETE',
    })
}

export function getArticleDetailAPI(data){
    return request({
        url:`/mp/articles/${data}`,
        method:'Get',
    })
}
