# Lecture  [video](https://course.masaischool.com/lectures/37843)

# Class Notes

`npx create-react-app <app_name>`


## useEffect

``` javascript
useEffect(()=>{
    //Logic
})
// The callback be trigger every-time the component  re-render 
// The component will re-render in only 2 scenarios;
// 1. when the state of the component change 
// 2. when the prop of the component change 
useEffect(()=>{
    //Logic
},[])
//the logic inside of  the callback be triggered only for the first time the component mounts.

useEffect(()=>{
    //Logic
},[value])
// This callback will get triggered , for the first time when the component mounts, and then every-time , when the value inside the array of dependency change ;

useEffect(() => {
  //Logic
  //in this we write side-effect code 
  return () => {
   //Logic
   //this cleanup function 
   // in this the side-effect code handle 
  };
}, [value]);
//☝️This is option  useEffect with cleaner function 

//if you want to see the example to handle this below statement see the example on 'counter.jsx' page  7 to 15 line code 👇

// In this we have facing some problem like any side-Effect || un-predictable out-put is not but smiler {sideEffect} || calling API [result -> 200,500,404,etc??] so we can handle with the help of useEffect with cleaner function  ✅


// useEffect is not a async but it can handle the async logic's

```




# Pure function 
- The React is a pure function because when we gave any input it will be the return on that bases that is called pure function [pure-function](https://blog.logrocket.com/what-are-react-pure-functional-components/#:~:text=A%20React%20component%20is%20considered,are%20treated%20as%20pure%20components.)

# HOF (Higher Order Function)

- **A function take another function as arguments**

# new thing to know 

```javascript

useLocation() => // this is for use when we have not using state and this wil work on **Navigate** component we pass the state on it and on other hand where we have to show or call the data write that pice of command **useLocation**

// i have been given the example on code refer it ir on **ReqAuth.jsx** and **login.jsx**

```