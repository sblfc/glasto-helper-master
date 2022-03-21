import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import './App.css';

const COUNT_LIMIT = 100;

// can we use React hooks instead??
// probably but for now we do it the old 
// fashioned way
class App extends React.Component {

    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };

   constructor( props ) {
     super( props );

     const { cookies } = props;
     this.state = {
         count: parseInt(cookies.get('count')) || 0,
     };
   }

   componentDidMount(){
      const { cookies } = this.props;
      this.setState((prevState) => ({
          count: prevState.count + 1
      }), function () {cookies.set('count', this.state.count, { path: '/' })});
   }

   render(){
       var hidden = this.state.count > COUNT_LIMIT ? 
            <div>
              <div>You are in!</div> 
              <button onClick={() => {window.location.href="https://www.glastonburyfestivals.co.uk/";}}>Click me</button>
              </div>: 
            <p>
              Number of hits: {this.state.count}
            </p>;

       return (
        <div className="App">
          <header className="App-header">
	    {hidden}
          </header>
        </div>
       );
   }
}

export default withCookies(App);
