import axios from "axios"
import { useState, useEffect } from "react"

function Search() {

    // initialize state to handle the value of the input box
    const [username, setUsername] = useState("")
    const [userData, setUserData] = useState(null)
    const [error, setError] =  useState("")
    const [loading, setLoading] =  useState(false)




    const changeUser = (e) => {
        setUsername(e.target.value)
    }

    // prevent the default form submission
    const onSubmission = async(e) => {
        e.preventDefault();  
        setLoading(true)
        try{
            const response = await axios.get(`https://api.github.com/users/${username}`)
            setUserData(response.data)
            console.log(userData)
        }catch(error){
            setError("User not found or API error")
            console.log('Error fetching user data: ', error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(userData){
            console.log(userData)
        }
    }, [userData])

  return (
    <div>
      <form id='search-form' onSubmit={onSubmission}>
        <input type="text" onChange={changeUser}/>
        <button>Search</button>
      </form>
      {loading && <p>Profile loading...</p>}
      {userData && (
        <div>
            <h1>{userData.name}</h1>
            <p>Created at: {userData.created_at}</p>
            <p>Bio: {userData.bio}</p>
            <p>Email: {userData.email}</p>
            <p>followers: {userData.followers}</p>
            <img src="https://avatars.githubusercontent.com/u/170793740?v=4" alt="" style={{borderRadius: '10cm', width: '100px'}}/>
        </div>
      )}

      {error && <p style={{color: 'red'}}>Error: {error}</p>}
    </div>
  )
}

export default Search
