import React from "react";


const Main =()=>{
    const dummy=[
    {    title: "글 제목",
            content : '글 내용',
            date:'5일전',
            user_profile:'img',
            user_name:'혜정',
            imageFile : 'https://item.kakaocdn.net/do/bef59207f5155a4eddd632c9a833e80d7154249a3890514a43687a85e6b6cc82'},
    {    title: "리액트",
            content : '공부',
            date:'10일전',
            user_profile:'img',
            user_name:'장호',
            imageFile : 'https://t1.daumcdn.net/cfile/blog/242DF8405509555D34'},
    {    title: "스프링",
            content : '공부',
            date:'15일전',
            user_profile:'img',
            user_name:'용성',
            imageFile : 'https://t1.daumcdn.net/cfile/tistory/12754A4A4E979E6E10'},             
        ]
    


    return(
        <div>
         {dummy.map(e=><div>
                        <h1>{e.title}</h1>
                        <img src={e.imageFile}></img>
                        <p>{e.content}</p>
                        <p>{e.date}</p>
                        <p>{e.user_profile}</p>
                        <p>{e.user_name}</p>  
                        </div>
         )}
        </div>
    )
};
export default Main;
