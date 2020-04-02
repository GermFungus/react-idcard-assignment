import React from "react";
import IdComponent from "../id-component/id-component"
import './main-component.css';
export default class MainComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            UserDataComplete : [],
            UserDataIncomplete : [],
            currentPage : 1,
            firstPage : 1,
            pageSize : 2,
            lastpage : 0,
            currentPage2 : 1,
            lastpage2 : 0
        }
        this.renderOb = this.renderOb.bind(this);
        this.renderPag=this.renderPag.bind(this);
        this.paginationshift=this.paginationshift.bind(this);
        this.editData=this.editData.bind(this);
        this.delData=this.delData.bind(this);
    }
    delData = (index , cat)=>{
        if(cat === 1){
            let temp = this.state.UserDataComplete;
            temp.splice(parseInt(index) , 1);
            this.setState({UserDataComplete : temp});
        }else if(cat === 2){
            let temp = this.state.UserDataIncomplete;
            temp.splice(parseInt(index) , 1);
            this.setState({UserDataIncomplete : temp});
        } 

    }

    editData = (datName , index , data , cat)=>{
        if((datName === 'picture') && (parseInt(cat) === 2)){
            let temp = this.state.UserDataIncomplete;
            temp[parseInt(index)][`${datName}`] = data;
            let completeTemp = this.state.UserDataComplete;
            completeTemp.push(temp[parseInt(index)]);
            temp.splice(parseInt(index) , 1);
            this.setState({UserDataComplete : completeTemp , UserDataIncomplete : temp , currentPage : (completeTemp.length/this.state.pageSize)});


        }
        else
        {
            if(cat === 1){
                console.log(data , index);
                let temp = this.state.UserDataComplete;
                temp[parseInt(index)][`${datName}`] = data;
                this.setState({UserDataComplete : temp});
            }
            if(cat === 2){
                console.log(data , index);
                let temp = this.state.UserDataIncomplete;
                temp[parseInt(index)][`${datName}`] = data;
                this.setState({UserDataIncomplete : temp});
                
            }
        }
    }
    componentDidMount(){
        fetch('https://randomuser.me/api/?page=1&results=100').then(
            res => res.json())
            .then((data) => {
                let finalData = [];
                for(let i = 0 ; i < data.results.length/2 ; ++i){
                    let temp = {};
                    temp.name = data.results[i].name.title + " " + data.results[i].name.first + " " + data.results[i].name.last;
                    temp.address = data.results[i].location.street.number + " " + data.results[i].location.street.name + " " + data.results[i].location.city + " " + data.results[i].location.state;
                    temp.email = data.results[i].email;
                    temp.Dob = data.results[i].dob.date;
                    temp.cellNumber = data.results[i].cell;
                    temp.picture =  data.results[i].picture.medium;
                    finalData.push(temp);
                }
                this.setState({UserDataComplete : finalData});
                finalData = [];
                for(let i = data.results.length/2 ; i < data.results.length ; ++i){
                    let temp = {};
                    temp.name = data.results[i].name.title + " " + data.results[i].name.first + " " + data.results[i].name.last;
                    temp.address = data.results[i].location.street.number + " " + data.results[i].location.street.name + " " + data.results[i].location.city + " " + data.results[i].location.state;
                    temp.email = data.results[i].email;
                    temp.Dob = data.results[i].dob.date;
                    temp.cellNumber = data.results[i].cell;
                    temp.picture = '';
                    finalData.push(temp);
                }
                this.setState({UserDataIncomplete : finalData});
            });
    }
    renderOb =  (cat) => {
        if(cat === 1){
            if(this.state.UserDataComplete[0]){
                let tempDatatoShow = [];
                tempDatatoShow.push(<div key='countComplete'><h3>Count : {this.state.UserDataComplete.length}</h3></div>);
                let start = ((this.state.currentPage-1)*this.state.pageSize);
                let end = start+this.state.pageSize;
                let lastPage = this.state.UserDataComplete.length/this.state.pageSize
                for(let i = start ; i < end ; ++i){
                    tempDatatoShow.push(<IdComponent delData={this.delData} key={this.state.UserDataComplete[i].name + i}  catagory={cat} index={i} editData={this.editData} first={this.state.firstPage} last={lastPage} currentPage={this.state.currentPage} name={this.state.UserDataComplete[i].name} address={this.state.UserDataComplete[i].address} email={this.state.UserDataComplete[i].email} Dob={this.state.UserDataComplete[i].Dob} cellNumber={this.state.UserDataComplete[i].cellNumber} picture={this.state.UserDataComplete[i].picture} />)
                }
                return tempDatatoShow;
            }
            else {
                return (<div></div>)
            }
        }
        if(cat === 2){
            if(this.state.UserDataIncomplete[0]){
                let tempDatatoShow = [];
                tempDatatoShow.push(<div key="countIncomp"><h3>Count : {this.state.UserDataIncomplete.length}</h3></div>);
                let start = ((this.state.currentPage2-1)*this.state.pageSize);
                let end = start+this.state.pageSize;
                let lastPage = this.state.UserDataIncomplete.length/this.state.pageSize
                for(let i = start ; i < end ; ++i){
                    tempDatatoShow.push(<IdComponent key={this.state.UserDataIncomplete[i].name + i } delData={this.delData} catagory={cat} index={i} editData={this.editData} first={this.state.firstPage} last={lastPage} currentPage={this.state.currentPage2} name={this.state.UserDataIncomplete[i].name} address={this.state.UserDataIncomplete[i].address} email={this.state.UserDataIncomplete[i].email} Dob={this.state.UserDataIncomplete[i].Dob} cellNumber={this.state.UserDataIncomplete[i].cellNumber} picture={this.state.UserDataIncomplete[i].picture} />)
                }
                return tempDatatoShow;
            }
            else {
                return (<div></div>)
            }

        }
    }
    paginationshift = (dat , cat)=>{
        if(dat === '-1'){
            if(cat === 1){
                let prevCurentPage = this.state.currentPage;
                this.setState({currentPage : prevCurentPage-1});
            }
            if(cat === 2){
                let prevCurentPage = this.state.currentPage2;
                this.setState({currentPage2 : prevCurentPage-1});
            }
        }
        else if(dat === '+1'){
            if(cat === 1){
                let prevCurentPage = this.state.currentPage;
                this.setState({currentPage : prevCurentPage+1});
            }
            if(cat === 2){
                let prevCurentPage = this.state.currentPage2;
                this.setState({currentPage2 : prevCurentPage+1});
            }
        }
        else if(dat === '1'){
            if(cat === 1){
                this.setState({currentPage : 1});
            }
            if(cat === 2){
                this.setState({currentPage2 : 1});
            }
        }
        else if(dat === 'e'){
            if(cat === 1){
                let lastPage = this.state.UserDataComplete.length/this.state.pageSize;
                this.setState({currentPage : lastPage});
            }
            if(cat === 2){
                let lastPage = this.state.UserDataIncomplete.length/this.state.pageSize;
                this.setState({currentPage2 : lastPage});
            }
        }
    }
    renderPag = (cat)=>{
        if(cat === 1){
            //this.setState({lastpage : this.state.UserDataComplete.length/this.state.pageSize});
            return (
                <div className='pagination'>
                    <div onClick={() => {this.paginationshift('1' , 1)}} className="PagButton">First</div>
                    <div onClick={()=>{this.paginationshift('-1' , 1)}} className="PagButton" ref={prev => this.prev = prev} > Prev </div>
                    <div className="PagButton selected"> {this.state.currentPage} </div>
                    <div onClick={()=>{this.paginationshift('+1' , 1)}} className="PagButton" ref={next => this.next = next} > Next </div>
                    <div onClick={()=>{this.paginationshift('e' , 1)}} className="PagButton">Last</div>
                </div>
            )
        }
        if(cat === 2){
            //this.setState({lastpage2 : this.state.UserDataIncomplete.length/this.state.pageSize});
            return (
                <div className='pagination'>
                    <div onClick={() => {this.paginationshift('1' , 2)}} className="PagButton">First</div>
                    <div onClick={()=>{this.paginationshift('-1' , 2)}} className="PagButton" ref={prev1 => this.prev1 = prev1}> Prev </div>
                    <div className="PagButton selected"> {this.state.currentPage2} </div>
                    <div onClick={()=>{this.paginationshift('+1' , 2)}} className="PagButton" ref={next1 => this.next1 = next1} > Next </div>
                    <div onClick={()=>{this.paginationshift('e' , 2)}} className="PagButton">Last</div>
                </div>
            )
        }
    }
    render(){
        return(
            <div>
                <div className='bar'>Id Cards</div>
                <div className='headerDiv'>
                    
                </div>
                <div className='renderDiv' id='RenderDiv' ref={renderDiv => this.renderDiv = renderDiv}>
                    <div className='complete sub'>
                        <div><h3>Complete Cards</h3></div>
                        {this.renderOb(1)}
                        {this.renderPag(1)}
                    </div>
                    <div className='incomplete sub'>
                        <div><h3>Incomplete Cards</h3></div>
                        {this.renderOb(2)}
                        {this.renderPag(2)}
                    </div>

                </div>
            </div>
        );
    }
}