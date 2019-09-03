import service from "@/api/config/axios";

export function login(username,password) {
    return service({
        url: "/login",
        method: "post",
        data:{
            username,
            password
        }
    });
}

export function getInfo(token) {
    return service({
        url: "/getInfo",
        method: "get",
        params:{
            token
        }
    });
}