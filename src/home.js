// import { collection } from 'firebase/firestore';
import React,{useEffect, useRef, useState} from 'react';
import './home.css'
import {db, storage} from './firebase';
import {useLocation,useParams} from "react-router-dom";
import {getStorage} from 'firebase/storage'
import {ref,uploadBytes,listAll,getDownloadURL,upload} from 'firebase/storage'
import {v4} from 'uuid';
import {doc, collection, onSnapshot, addDoc, query,getDoc, orderBy, deleteDoc,getDocs, setDoc, where} from "firebase/firestore";
import { async } from '@firebase/util';

let amount= Number(0)
let amo=Number(0)
let trans = Number(0)
let bal=Number(0)
function Home() {
  const params=useParams();
  const {email}=params;
  const [startFilterDate,setStartFilterDate]=useState(null);
  const [endFilterDate,setEndFilterDate]=useState(null);
  

const [file, setFile]=useState(null);
const [imageUrl, setImageList]=useState([0]); 
const [userDetails,setUserDetails]=useState({});
const [showImage, setShowImage] = useState(false);
const [transactions,setTransactions]=useState([]);
const [expenseName,setExpenseName]=useState("");
const [credit,setCredit]=useState(0);
  const [debit,setDebit]=useState(0);
const [expenseAmount,setExpenseAmount]=useState(0);
const [date,setDate]=useState();

useEffect(()=>{
  (async()=>{
    const userRef=collection(db,"Expense");
    console.log(userRef);
    const userQuery=query(userRef,where("email","==",email));
    const data=await getDocs(userQuery);
    console.log(data)
      let user=[];
    data.forEach((doc)=>{
      console.log(doc.id,"=>",doc.data());
      user.push({...doc.data(),id:doc.id});
    })
    setUserDetails(user[0]);
    let transactionsFromDB=user[0].transactions;
    transactionsFromDB && setTransactions(user[0].transactions);
    console.log(email,userQuery);
    })();
},[]);
console.log(userDetails.transactions)

// const filterOperation=()=>{
//   let filteredArray=[];
//   for(let i=0;i<transactions.length;i++){
//     let convertedSecond=transactions[i].date["seconds"]+(transactions[i].date["nanoseconds"]/1000000);
    
//     if((convertedSecond>startFilterDate) && (convertedSecond<endFilterDate)){
//       filteredArray.push(transactions[i]);
//     }
//     // if(transactions[i])
//   }
//   setTransactions(filteredArray);
//   console.log(filteredArray)
// }

const imageListRef = ref(storage, "images/")
const uploadImage=() => 
{
  if (file == null) return
  const imageRef= ref(storage,  `images/ ${file.name +  v4()} `);
  console.log()
  uploadBytes(imageRef,file).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((url) => 
    {
      setImageList(url)
      alert('image upload')
    })
    })};

const [num1, setNumber1]=useState(0);
const [num2, setNumber2]=useState(0);
const [num3, setNumber3]=useState(0);
const [num4, setNumber4]=useState(0);
const [num5, setNumber5]=useState(0);
const [num6, setNumber6]=useState(0);

const [income,setIncome]=useState(0);
const[total,setTotal]=useState(0);
const[c_total,setc_Total]=useState(0);
const[d_total,setd_Total]=useState(0);

// function subThemTogether()
// {
//   setTotal(Number(income)-(Number(expenseAmount)));
// }
const seconds = 1650954924;
const addTransaction=async()=>{
  // console.ansalog(transactions)
  let newTransaction={
    income:income,
    expenseName:expenseName,
    expenseAmount:expenseAmount,
    credit:credit,
    debit:debit,
    date:date,
    // date:new Date(),
    image:imageUrl,
    total,
  }
  console.log(transactions)
  setTransactions([...transactions,newTransaction])
  addDocument({transactions:[...transactions,newTransaction]})
}
// console.log(transactions)
// const addIncome=async()=>{
//   addDocument({income:Number(income)})
// }

const addDocument=async(data)=>
{
  console.log(data)
  let userRef=doc(db,"Expense",userDetails.id);
  console.log(data)
  setDoc(userRef,data,{merge:true}) 
  console.log(useRef)
}
const[gridApi,setGridApi] = useState()
const getFilterType =() => {
  if(startFilterDate !== '' && endFilterDate !== '') return 'inRange';
  else if(startFilterDate !== '') return 'greaterThan'
  else if(endFilterDate !== '') return 'lessThan'
};
useEffect(()=> {
  if(gridApi){
    console.log(startFilterDate)
    var dateFilter=gridApi.api.getFilterInstance('date');
    dateFilter.setModel({
      type:'getFilterType',
      dateFrom:startFilterDate,
      dateTo:endFilterDate
    });
    gridApi.api.onFilterChanged();
  }
  console.log(startFilterDate,endFilterDate)
},[startFilterDate,endFilterDate])

console.log(transactions.filter(obj => obj.date>= startFilterDate&& obj.date<= endFilterDate))
const filter1 = () =>{
  if((startFilterDate && endFilterDate) == null ){
    
      return transactions
  }
  else if((startFilterDate && endFilterDate) != null){
    // console.log(transactions.filter(obj => obj.date>= startFilterDate))
console.log(startFilterDate,endFilterDate,'huhkl')
    return transactions.filter(obj => obj.date>= startFilterDate&& obj.date<= endFilterDate);
  }
  else if((endFilterDate ==null)){
console.log(startFilterDate,endFilterDate,'huhkl')

    console.log(transactions.filter(obj => obj.date>= startFilterDate))
      return transactions.filter(obj => obj.date>= startFilterDate)
  }
  else if((startFilterDate == null)){
console.log(startFilterDate,endFilterDate,'huhkl')
    return transactions.filter(obj => obj.date<= endFilterDate)
}
}

const Balance = () =>{
  console.log(transactions)
  let new_income = income
    transactions.map((data,index) =>
    {
     new_income = Number(c_total)-Number(data.expenseAmount)
     
    })
    setTotal(new_income);
    console.log(new_income)
    return new_income
}


const ctotal = () =>{
  let new_income = income
    transactions.map((data,index) =>
    {
     new_income = Number(new_income)+Number(c_total)
     
    })
    setc_Total(new_income);
    console.log(new_income)
    return c_total
}


const Expense = expelement =>{
  console.log(transactions)

  console.log(income)
  if(expelement.target.value =='credit'){
    amount+=Number(income)
  }else if(expelement.target.value =='debit'){
    amo +=Number(income)
  }
  console.log(amount)
  setCredit(amount)
  setDebit(amo)
  expelement.target.value =''
}

const Bal = balnce => {
  bal = credit-debit
  setTotal(bal)
}

// const subThemTogether =()=>{
//   console.log(transactions)
//   transactions.map(data,index)
//   {
//    income = Number(income)-Number(expenseAmount)
//   }
//   return income
// }
// return transactions.filter(obj => obj.date>= startFilterDate&& obj.uploadedDate<= endFilterDate);
  return (
    <div>
        <div> 
       Amount : <input type='number' name='income' placeholder='Enter Your Income' value={income} onChange={e => setIncome(e.target.value)}></input><br></br>
       {/* <button onClick={addIncome}>Add Income</button> */}
       <div>
        <label>Expense Name: <input type="text" value={expenseName} onChange={(e)=>setExpenseName(e.target.value)} /></label><br></br>
        
        {/* <label>Expense Amount: <input type="number" value={expenseAmount} onChange={(e)=>setExpenseAmount(e.target.value)} /></label><br></br> */}
        <label>Title: <select onChange={Expense}>
            <option value=''>Select Value</option>
            <option value='credit' >Credit</option>
            <h3>{console.log(income)}</h3>
            <option value='debit' >Debit</option>
          </select></label><br></br>
        <label>Date: <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} /></label><br></br>
        {console.log(date)}
       </div>
        <input type='file'  onChange={(event) => {setFile(event.target.files[0])}}></input><br></br>
        <br></br>
        {/* <button>Credit</button>
        <button>Debit</button><br></br> */}
        <br></br>
        <button onClick={uploadImage} className='btn'>Uplod File</button>
        <button onClick={addTransaction } className='btn'>Submit</button>  
        <button onClick={ctotal} className='btn' >Credit</button>
        {/* <button onClick={subThemTogether} className='btn' >Balance</button><br></br> */}
        <button onClick={Bal} className='btn' >balance</button><br></br>
        <br></br>
        {/* <table style={{marginLeft:"30%"}} border ="5px" width={"44%"}>
        <tr><th>Credit</th>
            <th>Debit</th>
            <th>Balance</th></tr>
          <tr>
            <td>
            <h3>{credit}</h3>
            </td>
            <td>
            <h3>{debit}</h3>
            </td>
            <td>
            <h3>{total}</h3>
            </td>
          </tr>
        </table> */}
        
       
        
        <p>Remaining Balance:</p>
        <h3>{total}
        </h3>
        
        <button onClick={() =>setShowImage(!showImage)}> Preview</button><br></br>
        
        {showImage && <img src={URL.createObjectURL(file)}/>}
        </div>
        <div>
          <label>From date: </label><input type='date' value={startFilterDate} onChange={ (e)=>setStartFilterDate(e.target.value)}></input>
          <label>To date: </label><input type='date' value={endFilterDate} onChange={(e)=>setEndFilterDate(e.target.value)}></input>
          <br></br>
          {console.log(startFilterDate,endFilterDate)}
          {/* <button onClick={filter1()}> Filter</button> */}
        </div>
        <div>
          <h4>transactions:</h4>
          <div>
          <table style={{marginLeft:"27%"}} border ="10px" width={"44%"}>
                    <tr>
                    <th>Date</th>
                      <th>Expense Name</th>
                      
                      <th>Credit</th>
                      <th>Debit</th>
                      <th>Total</th>
                    </tr>
            {
              filter1().map((data,index)=>{
                return(
                      <tr key={index} style={{margin:"10px 0px"}}>
                        <td><p><span>{data.date}</span></p></td>
                        <td><p><span>{data.expenseName}</span></p></td>
                         {/* <td><p><span>{data.income}</span></p></td> */}
                         <td><p><span>{data.credit}</span></p></td>
                         <td><p><span>{data.debit}</span></p></td>
                         <td><p><span>{data.total}</span></p></td>

                        </tr>
                )})
            }
            </table>
          </div>
        </div>
    </div>
  )}
export default Home;