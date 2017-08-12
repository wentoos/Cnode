import React from 'react'
import { HashRouter, Route} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Topic from './components/Topic'
import Message from './components/Message'
import NewTopic from './components/NewTopic'
import Collect from './components/Collect'
import User from './components/User'
import UpdataTopic from './components/UpdataTopic'

class App extends React.Component{
	componentWillMount(){
		sessionStorage.removeItem('accesstoken')
	}
	render(){
		return(
			<HashRouter>
				<div>
					<Header />
					
					<div style={{minHeight: '300px'}}>
						<Route path='/' exact component={Home} />
						<Route path='/topic/:id' component={Topic} />
						<Route path='/message' component={Message} />
						<Route path='/newtopic' component={NewTopic} />
						<Route path='/collect' component={Collect} />
						<Route path='/user' component={User} />
						<Route path='/updata/:topic_id' component={UpdataTopic} />
					</div>
					<Footer />
				</div>
			</HashRouter>
		)
	}
}
export default App