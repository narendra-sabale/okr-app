import React, { memo } from 'react';
import './Styles/CategoryFilter.scss'

const CategoryFilter = ({ showSelector, activeCategory, categoryList, handleCategorySelector }) => {

  const handleChart = (e) => {
    // console.log("VAL :: ", e.target.value)
    const activeCategory = e.target.value
    handleCategorySelector(activeCategory)
  }

  return(
    showSelector 
      ? null 
      : <div className="catogory-selector">
          <select value={activeCategory} onChange={handleChart}>
            {
              categoryList.map((category, index) => 
                <option key={`${category}_${index}`}>
                  {category}
                </option>
              )
            }
          </select>
        </div>
  )
}

export default memo(CategoryFilter)