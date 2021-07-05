import React,{useContext,useState,useEffect} from 'react';

import {useHistory} from 'react-router-dom'
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext ,FirebaseContext} from '../../store/Context';


function Header() {
  const {user}=useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  const history=useHistory()
  
const [searchKey, setsearchKey] = useState('')
  const [products, setProducts] = useState([])
  const [filteredData, setfilteredData] = useState([])
  useEffect(() => {
    firebase.firestore().collection('products').get().then((snapshot)=>{
      const allPost=snapshot.docs.map((product)=>{
        return{
          ...product.data(),
         id: product.id,
        }
      })
     console.log(allPost)
      setProducts(allPost)
    })
   
  }, [])

  const handleChange=(e)=>{
setsearchKey(e.target.value)
console.log(searchKey)
console.log(products)
const newFilter= products.filter((value)=>{
  //console.log(value)
  return value.name.toLowerCase().indexOf(searchKey.toLowerCase())!==-1
})
//console.log(newFilter)

  setfilteredData(newFilter)
  console.log(filteredData)

  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search ></Search>
          <input type="text"  placeholder="India" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
         <input type='text' placeholder="find cars,mobile...." onChange={handleChange}/>
          
         {filteredData!==0 ? (filteredData.map((value)=>{
           return(
             <li>{value.name}</li>
           )
         })) :""}
        
          </div>
          <div className="searchAction">
            <Search color="#ffffff" ></Search>
          </div>
         </div>
          
        
        
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ? `Welcome ${user.displayName}` :'Login'}</span>
          <hr />
        </div>
        {user && <span onClick={()=>{
          firebase.auth().signOut();
          history.push('/login')
        }}>Logout</span>}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
