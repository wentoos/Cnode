import React from 'react'
import axios from 'axios'
import { url } from '../config'
import { Button, message, Avatar } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'

class Collect extends React.Component{
	constructor(){
		super()
		this.state = {
			loginName:'',
			data:[]
		}
	}
	componentDidMount(){
		axios.get(`${url}/topic_collect/l552177239`)
		.then(res => this.setState({data:res.data.data}))
		.catch(err => message.error('请求失败'))
	}
	handleCollect(topic_id){
		if (sessionStorage.accesstoken){
			var accesstoken = sessionStorage.accesstoken
		}else{
			alert('请先登录')
			return
		}
		axios.post(`${url}/topic_collect/de_collect`, {accesstoken, topic_id})
		.then(res => {
			message.info('取消收藏')
			this.setState({data:this.state.data.filter(item => item.id!==topic_id)})
		})	
		.catch(err => message.error('操作失败'))
	}
	render(){
		let tabs = {
			ask: '问答',
			job: '招聘',
			share: '分享',
			dev:'客户端测试'
		}
		let {data}=this.state
		return(
			<div className='collect'>
				{data.length ===0 ? '无收藏' :
					data.map(item =>
						<div key={item.id} className='topic'>
							<Avatar shape="square" icon="user" src={item.author.avatar_url} />
							<div className='showtopics_card'>
								<h3 title={item.title}><Link to={`/topic/${item.id}`}>{item.title}</Link></h3>
								<span className='tab'>{item.top?'置顶':item.good?'精华':tabs[item.tab]}</span>
								<span className='reply_visit'><strong>{item.reply_count}</strong>/{item.visit_count}</span>
								<span>最后回复时间<strong> · </strong>{moment(item.last_reply_at).fromNow()}</span>
							</div>
							<Button type="danger" onClick={this.handleCollect.bind(this,item.id)}>取消收藏</Button>
						</div>
				)}
			</div>
		)
	}
}
export default Collect