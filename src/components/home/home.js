import React from "react";
import './home.css';
import data from '../../data/data.json';
import parse from 'html-react-parser';

class Home extends React.Component{
    constructor(){
        super();
        this.state={
            codeSnippets:[]
        }
    }
    componentDidMount(){
        const codeSnippets = [...data];
        this.setState({codeSnippets:codeSnippets});
    }
    searchCode = (event) =>{
        let searchterm = event.target.value.toLowerCase();
        if(searchterm===''){
            const codeSnippets = [...data];
            this.setState({codeSnippets:codeSnippets});
            return;
        }
        console.log(searchterm)
        let codeSnippets = [...this.state.codeSnippets];

        let filterdCodeSnippets=[];

        codeSnippets.forEach(el=>{
            if(el.code.toLowerCase().includes(searchterm)){
                filterdCodeSnippets.push(el);
            }
        })
        this.setState({codeSnippets:filterdCodeSnippets})
    }

    render(){
        const codeSnippets = [...this.state.codeSnippets];
        const content = codeSnippets.map(el=>{
            return (
                <div key={el.id} className='codeSnippet'>
                    <div className="insideContainer">
                        {parse(el.code)}
                    </div>  
                </div>
            )
        })

        return (
            <React.Fragment>
                <header>
                    <input type="search" onChange={this.searchCode} placeholder="router,async,middleware..."/>
                </header>
                <section className="codeSnippetContainer">
                    {content}
                </section>
            </React.Fragment>
        )
    }
}

export default Home;