import { useEffect, useState } from "react"
import styled from "styled-components"

const Div = styled.div`
 border :1px solid black;
  margin: 4%;
  padding : 2% ;
  dispaly : flex
`
const Formbox = styled.div`
 border :1px solid black;
  margin: 4%;
  padding : 2%;
  width : 200px
 
`

const Otherbox = styled.div`
 border :1px solid black;
  margin: 4%;
  padding : 2%;
  width : 900px;
  height : 10000px
  overflow: scroll;
`
const Mainshow = styled.div`
 border :1px solid black;
  margin: 4%;
  padding : 2%;
  display : flex;
  justify-content: space-between;

 & >div:nth-child(1){
     font-size : 32px
 }

 

`
export const Form =()=>{
const [formdata,setFormdata] = useState({})
const [show,setShow ] = useState([])

  useEffect(()=>{
      getRecepi()
  },[])
    const handleChange =(e)=>{
        // console.log(e.target.value,e.target.name)
         const {value ,name} = e.target

      setFormdata({...formdata , [name] : value})  

    }

    // const handleSubmit = (e)=>{
    //      e.preventDefault() 
    //      console.log(formdata)
    //      console.log("show",[...show, formdata])
    //      setShow([...show, formdata])
    // }

    const addRecepi =(e)=>{
        e.preventDefault()
        fetch("http://localhost:3001/show",{
            method: "POST",
            body: JSON.stringify(formdata),
            headers:{
                "content-type":"application/json"
            },
        }).then(()=>{
            getRecepi()
        })
    } 
  
     const getRecepi=()=>{
         fetch("http://localhost:3001/show").then((d)=>d.json()).then((res)=>{
             console.log(res)
             setShow(res)
            })
     }

    return(
        <>
        <Div >
                
             <Formbox >
                 <h1>ADD RECEPI</h1>
                <form  onSubmit={addRecepi}>
                    <label >title: </label>
                    <input name="title" type="text"  placeholder="Enter recepi name" onChange={handleChange}/>
                    <br/>
                    <br/>
                    <label > ingredients: </label>
                    <input name="ingredients" type="text" placeholder="Enter ingredients " onChange={handleChange} />
                    <br/>
                    <br/>
                    <label >time to cook: </label>
                    <input name="time to cook" type="text" placeholder="Enter time " onChange={handleChange}/>
                    <br/>
                    <br/>
                    <label >image URL: </label>
                    <input name="image" type="text" placeholder="Enter image "  onChange={handleChange}/>
                    <br/>
                    <br/>
                    <label >instructions: </label>
                    <input name="instructions"  type="text" placeholder="Enter instructions " onChange={handleChange}/>
                    <br/>
                    <br/>
                    <input  type="submit"  onChange={handleChange}/>
                </form>
        </Formbox>
               <br/>
               <br/>
               <br/>
            <Otherbox>
                    {show.map((el)=>(
                  <Mainshow>
                         <div>{el.title}</div>
                         <div>
                         <img src={el.image} /> 
                         </div>
                        

                  </Mainshow>
                  

                    ))}
            </Otherbox>   
              
         </Div>    
        </>

    )
}