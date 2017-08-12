import React from 'react'
import { Spin, Avatar } from 'antd'
import {Link} from 'react-router-dom'
import moment from 'moment'

class ShowTopics extends React.Component{
	render(){
		let {data} = this.props
		let tabs = {
			ask: '问答',
			job: '招聘',
			share: '分享',
			dev:'客户端测试'
		}
		return(
			<div className='topics'>
				{
					data.length===0? <div style={{textAlign: 'center'}}><Spin size="large" /></div> :
					data.map(item=>(
						<div key={item.id} className='topic'>
						<Avatar shape="square" icon="user" src={item.author.avatar_url} />
							<div className='showtopics_card'>
								<h3 title={item.title}><Link to={`/topic/${item.id}`}>{item.title}</Link></h3>
								<span className='tab'>{item.top?'置顶':item.good?'精华':tabs[item.tab]}</span>
								<span className='reply_visit'><strong>{item.reply_count}</strong>/{item.visit_count}</span>
								<span>最后回复时间<strong> · </strong>{moment(item.last_reply_at).fromNow()}</span>
							</div>
						</div>
					))
				}
			</div>
		)
	}
}
export default ShowTopics