import React from 'react'
import {url} from '../config'
import axios from 'axios'
import { message, Spin } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'

class Message extends React.Component{
	constructor(){
		super()
		this.state={
			data: null,
			show:false
		}
	}
	componentDidMount(){
		let accesstoken = sessionStorage.accesstoken;
		if (accesstoken) {
			axios.get(`${url}/messages?accesstoken=${accesstoken}`)
				.then(res => this.setState({
					data: res.data.data,
					show:true
				}))
				.catch(err => message.error('数据请求失败'))
		}else{
			this.props.history.push('/')
		}
	}
	render(){
		let {data,show} = this.state
		
		if(show){
			let length = data.hasnot_read_messages.length
		}
		console.log(data)
		return(
			<div className='message'>
				<p className='message_head'><Link to='/'>主页</Link> / 话题发布</p>
				{
					data ? (
						<div className='hasnot_read'>
							<h2>未读消息：</h2>
							{
								length === 0 ? <p>无消息</p> :
								data.hasnot_read_messages.map(item=>(
									<p key={item.id}>
										{item.author.loginname}&nbsp;&nbsp;
										在文章&nbsp;&nbsp;
										<Link to={`/topic/${item.topic.id}`}>{item.topic.title}</Link>
										&nbsp;&nbsp;{item.type==='reply'? '回复' : '@'}了你
										<span style={{float: 'right'}}>{moment(item.create_at).fromNow()}</span>
									</p>
								))
							}
							<h2 className='has_read'>过往信息：</h2>
							{
								data.has_read_messages.map(item=>(
									<p key={item.id}>
										{item.author.loginname}&nbsp;&nbsp;
										在文章&nbsp;&nbsp;
										<Link to={`/topic/${item.topic.id}`}>{item.topic.title}</Link>
										&nbsp;&nbsp;{item.type==='reply'? '回复' : '@'}了你
										<span style={{float: 'right'}}>{moment(item.create_at).fromNow()}</span>
									</p>
								))
							}
						</div>
					)
					:
					<div style={{textAlign: 'center'}}><Spin size='large'/></div>
				}
			</div>
		)
	}
}

export default Message