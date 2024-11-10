import React ,{useState ,useMemo ,useRef ,useEffect, useCallback} from 'react'
import './assets/styles/gridStyles.css'

 function Grids({level ,cards ,shuffle}){

    const [cardOne ,setCardOne] = useState(null)
    const [cardTwo, setCardTwo] = useState(null)
    const [grids ,setGrids] = useState([])
    const [discovered ,setDiscovered] = useState([])
    const grid_number = (level*2) * (level*2)

    const cardOneRef = useRef()
    const cardTwoRef = useRef()
    
    
    useEffect(()=>{
        
        let grid = []
        let memory = []

        const generateGrid = ()=>{
            for(let i=0;i<(grid_number/2);i++){
               let index = generateRandom()
               grid[randomIndex()] = cards[index]
               grid[randomIndex()] = cards[index]
        
            }
            // console.log("the length of the original grid: " ,grid);
            setGrids(()=>{
                let temp = grid.map(g => {
                    return {name:g, visible:false}
                })
                return temp
            })
        }

        function generateRandom(){
           let max=level+level ,min=0
           if(grid_number <= 4){max = 1}
           else if(grid_number <= 16){max = 4}
           else{max = 7}
           return Math.floor(Math.random() * (max - min+1))
        }
    
        function randomIndex(){
           let randomIndex = Math.floor(Math.random() * (grid_number ))
           while(memory.includes(randomIndex)){
               // return
               randomIndex = Math.floor(Math.random() * (grid_number ))
           }
           memory.push(randomIndex)
           return randomIndex
        }

        generateGrid()

    },[level ,shuffle])

     function openCard(index ,e){
         console.log(index);
         setGrids(prev => {
            let temp = prev.map((t ,idx) => {
                if(idx == index){
                    t.visible = true;
                }
                return t;
            })
            return temp
         })
        if(cardOne == null){
            setCardOne(index);
        }
        else{
            setCardTwo(index);
            verifyCards(cardOne ,index)
        }
     }

     async function verifyCards(one ,two){
        console.log(grids[one].name +"=="+ grids[two].name);
        if(grids[one].name == grids[two].name){
                setDiscovered(prev => {
                    let temp = prev
                    temp.push(one)
                    temp.push(two)
            return temp

                })
            console.log("okay");

        }else{
            console.log("not okay");
            await setTimeout(()=>{
                closeAllCard(one ,two)
            },500)
        }
        setCardOne(null)
        setCardTwo(null)

     }

     function closeAllCard(one ,two){
        console.log("closing cards" ,one ,two);
        setGrids(prev => {
            let temp = prev.map((t ,idx) => {
                if(idx == one || idx == two){
                    t.visible = false
                }
                return t
            })
            return temp
        })
     }



     console.log(cardOne+ " " + cardTwo)
     
     console.log(discovered)
     
     console.log(grids)

     return(
        <React.Fragment>
            <div className='grid-container' style={{gridTemplateColumns:`repeat(${Math.sqrt(grid_number)} ,auto)`}} >
                {
                    grids.map((box ,index) => {
                        return (
                        <div 
                            key={index} 
                            style={{backgroundColor:box.visible?'':'rgba(50,50,50 ,1)' ,color:'rgba(50,50,50 ,1)'}} 
                            onClick={(e)=>openCard(index,e)}
                            className={`fas fa-${box.name}`}
                        >
                        </div>
                             )
                    })
                }
            </div>
        </React.Fragment>
    )
}

export default Grids