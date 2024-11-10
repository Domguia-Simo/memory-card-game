import React ,{useState ,useEffect ,useMemo ,useCallback} from 'react'
import './assets/styles/styles.css'
import Grids from './Grids'

const card = ["user" ,"sun" ,"moon" ,"star" ,"cloud" ,"trash" ,"heart","dollar"]
const cardSet = [
    {name:'' ,}
]
// const 

const App = () => {

    const [level ,setLevel] = useState(1) 
    const [test ,setTest] = useState(0) 

    useMemo(()=>{
        setTest(prev => prev+1)
    } ,[level])

    

    return(
        <React.Fragment>
            <div className='main-container' >

                <h2 style={{textAlign:'center'}}>Welcome to the Memory card game</h2>

                <div style={{textAlign:'center'}}>
                    New GAME <button onClick={()=>setTest(prev => prev+1)} >Shuffle cards</button>
                </div><br/>

                <div className='level-section' >
                    <span onClick={()=>setLevel(1)} style={{color:level == 1 && 'black' ,backgroundColor:level == 1 && 'rgba(200,200,200,1)'}} >Weak</span>
                    <span onClick={()=>setLevel(2)} style={{color:level == 2 && 'black' ,backgroundColor:level == 2 && 'rgba(200,200,200,1)'}} >Normal</span>
                    <span onClick={()=>setLevel(3)} style={{color:level == 3 && 'black' ,backgroundColor:level == 3 && 'rgba(200,200,200,1)'}} >Strong</span>
                </div>

                    <Grids level={level} cards={card} shuffle={test}/>

            </div>
        </React.Fragment>
    )
} 

export default App