import React, { useState, useEffect } from "react";
import './App.css';
import 'antd/dist/antd.css';
import { Skeleton, Switch, Card, Avatar } from 'antd';
import { AudioOutlined, AudioFilled  } from '@ant-design/icons';

import annyang from  'annyang';
const { Meta } = Card;

 class App extends React.Component {  
  constructor(props){
super(props);
this.state={
  itemIndex:0,
  score:0,
  matchedWord:false,
   words: ['hello','hey'],
   missingTime:0,
   scoringIndex:0,
   loading: false,

 
}
this.initialState = this.state;
  }
  componentDidMount=()=>{
    if(annyang){
     this.setState({
       matchedWord:this.state.matchedWord = false
     })
    annyang.addCallback('result', this.matchedWord);    

 
    annyang.start();

    } 
  }
 
  matchedWord=(userVoice)=>{
    console.log(userVoice)
    let matchedWord = "";
    for(var i=0;i<userVoice.length;i++){
      if(this.state.words[this.state.itemIndex] === userVoice[i].trim()){
        matchedWord= userVoice[i].trim()
      }
    }    
    if( matchedWord ){
    this.setState({
      score : this.state.score + 1,
      itemIndex: this.state.itemIndex + 1,
      scoringIndex:this.state.scoringIndex + 1
    })
    document.getElementById('wordsNot').innerHTML=''
    this.setState({
      matchedWord:this.state.matchedWord = false
    })    
    annyang.abort()
    annyang.start();

   }else{

    this.setState({
      matchedWord:this.state.matchedWord = true,
      missingTime:this.state.missingTime + 1,
      scoringIndex:this.state.scoringIndex + 1

      
    })    

   }
    console.log(this.state)
  }
  onChange = checked => {
    this.setState(this.initialState)

  };
  render() { 
    const { loading } = this.state;
        if(this.state.missingTime == 3){
          this.setState({
            itemIndex:this.state.itemIndex + 1,
            missingTime:this.state.missingTime = 0,
            matchedWord:this.state.matchedWord = false
          })

        }
        if(this.state.itemIndex >= this.state.words.length){
          alert('Game over!!! Your score is  '+ this.state.score )

    annyang.abort()

          this.setState(this.initialState)

        }
   
    return(
    <div>
       <h1 style={{float:'left'}}>
      For Restart Game
      </h1>
      <Switch style={{float:'left',margin:'1rem'}}  onChange={this.onChange} />
      <div style={{backgroundColor:'lightblue'}}> <h1 style={{textAlign:'center', marginRight:'250px'}}>
      Ready for the some fun!!!!! <AudioOutlined />
      </h1> 

              <h2>Here are the words you have to speek <AudioFilled /></h2>
  

              <div>
  <h1  style={{color:'red'}}>{this.state.words[this.state.itemIndex]}</h1>

  {
   this.state.matchedWord  ?  <h3 id="wordsNot">Please Try Again</h3> :  <h3 id="wordsNot"></h3>   
              
  }
              </div>


      </div>;

<Card style={{ textAlign:'center',backgroundColor:'lightblue' }} loading={loading}>
  <Meta
    avatar={
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    }
    title="Your Score is "
    
  />
  {this.state.score}
</Card>


    </div> 
    )
  }
}

export default App;
