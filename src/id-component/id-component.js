import React from "react";
import "./id-component.css"
export default class IdComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            picture : this.props.picture,
            name : this.props.name,
            address : this.props.address,
            Dob : this.props.Dob,
            email : this.props.email,
            cellNumber : this.props.cellNumber,
            showEditdob : false,
            showEditAddres : false,
            showEditemail : false,
            showEditCellNumber : false,

        }
        this.saveData=this.saveData.bind(this);
        this.changeaddress=this.changeaddress.bind(this);
        this.changedob=this.changedob.bind(this);
        this.changeemail=this.changeemail.bind(this);
        this.changenum=this.changenum.bind(this);
        this.delData=this.delData.bind(this);
    }

    changedob=(event)=>{
        this.setState({Dob : event.target.value});
    }
    changeaddress=(event)=>{
        this.setState({address : event.target.value});
    }
    changeemail=(event)=>{
        this.setState({email : event.target.value});
    }
    changenum=(event)=>{
        this.setState({cellNumber : event.target.value});
    }
    saveData=(dat)=>{
        this.props.editData(dat , this.props.index , this.state[`${dat}`] , this.props.catagory );
    }
    imageSaver=(e)=>{
        this.setState({picture : URL.createObjectURL(e.target.files[0])});
        this.props.editData('picture' , this.props.index , URL.createObjectURL(e.target.files[0]) , this.props.catagory);
    }
    delData=()=>{
        console.log("inside Card");
        this.props.delData(this.props.index , this.props.catagory);
    }
    render(){
        return(
            <div className='id_div '>
                <div className=''>
                <div className='border'>
                    <div className='borderseg yellow'></div>
                    <div className='borderseg orange'></div>
                    <div className='borderseg brown'></div>
                    <div className='borderseg red'></div>
                </div>
                
                <div className="false">
                    <h3> Dummy Company Name</h3>
                    <h4 className='rel'>Dummy Slogan</h4>    
                </div>
                <div className='border'>
                        <div className='borderseg red'></div>
                        <div className='borderseg brown'></div>
                        <div className='borderseg orange'></div>
                        <div className='borderseg yellow'></div>
                </div>
                <div onClick={() => {this.fileIn.click()}} className='photo' style={{backgroundImage : `url("${this.state.picture}")`}}>
                        <input hidden onChange={(e) => {this.imageSaver(e)}} type='file' ref={fileIn => this.fileIn = fileIn}></input>
                    </div>
                
                </div>

                <div className='name'>
                    <h4>{this.state.name}</h4>
                </div>

                <div className='border'>
                        <div className='borderseg red'></div>
                        <div className='borderseg brown'></div>
                        <div className='borderseg orange'></div>
                        <div className='borderseg yellow'></div>
                </div>
                <div className='space'>

                </div>
                <div className='details'>
                    <div className='red borderseg2 '></div>
                    <div className='detailsBox'>
                        <h4 onClick={() => { let prev = this.state.showEditdob; prev = !prev; this.setState({showEditdob : prev})}} >Date Of Birth : {this.state.Dob}</h4>
                        <div>{(this.state.showEditdob) && (<div className='editSection'>
                            <input type='text' onChange={this.changedob}></input>
                            <button type='submit' onClick={() =>{this.saveData('Dob')}}>Edit</button>    
                        </div>)}</div>
                        <h4 onClick={() => {let prev = this.state.showEditAddres; prev = !prev; this.setState({showEditAddres : prev})}} >Address : {this.state.address}</h4>
                        <div>{(this.state.showEditAddres) && (<div className='editSection'>
                            <input type='text'onChange={this.changeaddress}></input>
                            <button type = 'submit' onClick={()=>this.saveData('Address')} >Edit</button>    
                        </div>)}</div>
                        <h4 onClick={() => {let prev = this.state.showEditemail; prev = !prev; this.setState({showEditemail : prev})}} >Email : {this.state.email}</h4>
                        <div>{ (this.state.showEditemail) && (<div className='editSection'>
                            <input type='text' onChange={this.changeemail}></input>
                            <button  type = 'submit' onClick={()=>this.saveData('email')} >Edit</button>    
                        </div>)}</div>
                        <h4  onClick={() => { let prev = this.state.showEditCellNumber; prev = !prev; this.setState({showEditCellNumber : prev})}} >Phone Number : {this.state.cellNumber}</h4>
                        <div>{ (this.state.showEditCellNumber) && (<div className='editSection'>
                            <input type='text'onChange={this.changenum}></input>
                            <button  type = 'submit' onClick={()=>this.saveData('CellNumber')} >Edit</button>    
                        </div>)}</div>
                    </div>
                    <div className='red borderseg2 '></div>
                </div>
                <div className='border'>
                        <div className='borderseg red'></div>
                        <div className='borderseg brown'></div>
                        <div className='borderseg orange'></div>
                        <div className='borderseg yellow'></div>
                </div>
                <div className='but' type = 'submit' onClick={()=> this.delData()} > 
                    Delete
                </div>
            </div>
        );
    }
}