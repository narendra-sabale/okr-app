
import React, { useEffect, useState } from 'react';
// import data1 from '../Utils/dummyData'
import Objective from '../Components/Objective'
import Header from '../Components/Header'
import { URL } from '../Constants/Constants'
import './Styles/Main.scss'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [activeCategory, setActiveCategory] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(()=>{
    fetch(URL)
      .then((res)=>res.json())
      .then(data=>{
        // console.log("DATA : ", data)
        processData(data.data)
        setIsLoading(false)
      })
      .catch((error)=>{
        // console.log("ERR : ", error)
        setErrorMsg('Please try again')
        setIsLoading(false)
      })
    // processData(data1)
  }, [])

  const getFilteredData = (data, category) => data.filter(obj => obj.category === category)
  
  const processData = (data) => {
    const categoryList = []
    const output = data.reduce((acc, curr)=>{
      if(!categoryList.includes(curr.category)){
        categoryList.push(curr.category)
      }
      if(!curr.parent_objective_id){
        curr.children = []
        acc.push(curr)
      } else {
        acc[acc.length-1].children.push(curr)
      }
      return acc
    }, [])
    
    const activeCategory = categoryList.length ? categoryList[0] : ''
    const filteredData = activeCategory ? getFilteredData(output, activeCategory) : []
   
    setData(output)
    setCategoryList(categoryList)
    setActiveCategory(activeCategory)
    setFilteredData(filteredData)
  }

  const handleCategorySelector = (category) => {
    const filteredData = getFilteredData(data, category)
    setActiveCategory(category)
    setFilteredData(filteredData)
  }

  const toggleView = (event) => {
    // console.log("EVENT :: ",event, event.target, event.target.parentNode.parentNode.children, event.currentTarget.children)
    
    let childrenEle = event.target.parentNode.parentNode.children
    if(childrenEle.length >= 2) {
      if(childrenEle[1].style.display === "none") {
        childrenEle[1].style.display = "block"
        event.target.style.transform = 'rotate(0deg)'
        event.target.style.top = '5px'
      } else {
        childrenEle[1].style.display = "none"
        event.target.style.transform = 'rotate(-90deg)'
        event.target.style.top = '0px'
      }
    }
  }

  return (
    <div className="mainContainer">
      <Header 
        showSelector={isLoading || errorMsg}
        activeCategory={activeCategory}
        categoryList={categoryList}
        handleCategorySelector={handleCategorySelector}/>
      {
        isLoading 
          ? <div className="loader">Loading...</div>
          : errorMsg 
            ? <div className="error">{errorMsg}</div>
            : <div className="bodyContainer">
                <div className="container">
                  {
                    filteredData.map((parent)=>{
                      return (
                        <div key={parent.id} className="parentWrapper">
                          <div className="parent">
                            <div className="arrow" onClick={toggleView}></div>
                            <Objective title={parent.title}/>
                          </div>
                          <div className="childrenWrapper">
                            {
                              parent.children && parent.children.map((child)=>{
                                return(
                                  <div className="children" key={child.id}>
                                    <div className="dot"></div>
                                    <Objective title={child.title}/>
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
      }
      {/* {
        true && <div className="model"></div>
      } */}
    </div>
  );
}

export default App;
