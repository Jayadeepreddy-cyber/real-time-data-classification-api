const http=require('k6/http');
const {sleep}=require('k6');
const {check}=require('k6');
export const options={
    vus:8,
    duration:'1s'
};
export default function ()
{
    const url='http://127.0.0.1:8080/login';
    const body={
        "input":" count of jayadeep is lessthanequalto 1 in jayadeep reddy 123jhsdaad signzy"
    };
    
    let res=http.post(url , body);
    check(res,{
        'is status 200':(r)=>r.status===200,
    });
    
}