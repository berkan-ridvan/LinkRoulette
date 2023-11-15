import React from 'react'
import Profile from '../Profile/Profile'
import CategoryList from '../CategoryList/CategoryList'
import AddFilm from '../AddFilm/AddFilm'
import './MainComponent.scss'

const MainComponent = () => {
  return (

    <div className='main-component-container'>

      <div className="main-component-container-left">
        <div className="profile-container">
          <Profile/>
        </div>
        <div className="category-list-container">
          <CategoryList/>
        </div>
      </div>
      <div className="add-film-container">
        <AddFilm/>
      </div>

    </div>
  )
}

export default MainComponent