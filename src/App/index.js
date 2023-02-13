import { useEffect, useState } from 'react';
import './Assets/index.css'
import axios from 'axios'
import Card from './Components/Card'
import moment from 'moment'

function App() {

  const [Users, setUsers] = useState([]);
  const [SearchValue, setSearchValue] = useState('');
  const [SortBy, setSortBy] = useState();

  const getUsers = (value) => {
    axios.get(`https://api.github.com/search/repositories?q=${value}`).then((response)=>{
      setUsers(response.data.items)
    }).catch(function (error) {
      console.log(error);
    })
  }

  useEffect(() => {
    if(SearchValue){
      getUsers(SearchValue)
    }
  }, [SearchValue]);

  let sortedusers = [...Users]
  if(SortBy&&SortBy!=='none'){
    if(SortBy==='stars'){
        sortedusers.sort((a,b)=>{
          return a.stargazers_count - b.stargazers_count
        })
    }
    if(SortBy==='count'){
        sortedusers.sort((a,b)=>{
          return a.watchers_count - b.watchers_count
        })
    }if(SortBy==='score'){
        sortedusers.sort((a,b)=>{
          return a.score - b.score
        })
    }
    if(SortBy==='name'){
        sortedusers.sort((a,b)=>{
          return a.name > b.name
        })
    }
    if(SortBy==='created'){
        sortedusers.sort((a,b)=>{
          return moment(a.created_at).valueOf() - moment(b.created_at).valueOf()
        })
    }
    if(SortBy==='updated'){
        sortedusers.sort((a,b)=>{
          return moment(a.updated_at).valueOf() - moment(b.updated_at).valueOf()
        })
    }
  }

  return (
    <div>
      <h1>GitHub Public Repos</h1>
      <div style={{marginTop:'20px'}}>
          <input onChange={e=>setSearchValue(e.target.value)} type='text' className='search-box' placeholder='Search'/>
          <select onChange={e=>setSortBy(e.target.value)} className='sort-menu'>
              <option value='none' selected>Sort By</option>
              <option value='stars'>Stars</option>
              <option value='count'>Watcher Count</option>
              <option value='score'>Score</option>
              <option value='name'>Name</option>
              <option value='created'>Created at</option>
              <option value='updated'>Updated at</option>
          </select>
      </div>
      <div className='cards-wrapper'>
        {
          sortedusers.map((user,index)=>{
            return <Card key={index} avatar={user.owner.avatar_url} Repo name={user.name} updateAt={user.updated_at} stars={user.stargazers_count} description={user.description} language={user.language} createdAt={user.created_at}/>
          })
        }
      </div>
    </div>
  );
}

export default App;
