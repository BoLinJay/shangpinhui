import { v4 as uuidv4 } from 'uuid';
export const getUUID = () => {
    //  先获取本地存储中的UUID 
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 如果没有则生成新的
    if(!uuid_token) {
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}