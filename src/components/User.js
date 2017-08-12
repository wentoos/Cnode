import React from 'react'
import axios from 'axios'
import { Avatar, Spin, Button } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'
 
class User extends React.Component{
	constructor(){
		super()
		this.state = {
			data:null
		}
	}
	componentWillMount(){
		axios.get('https://cnodejs.org/api/v1/user/l552177239')
		.then(res => this.setState({data:res.data.data}))
		.catch(err => alert(err))
	}
	render(){
		let {data} = this.state
		return(
			<div className='user_wrap'>
				{
					data? (
						<div className="user">
							<img src={data.avatar_url} alt='avatar' />
              <h3>{data.loginname}</h3>
              <p>创建日期：{moment(data.create_at).format('YYYY-MM-DD')}</p>
              <p>积分：{data.score}</p>
              <h2>发布话题:</h2>
              {
              	data.recent_topics.map(item =>
									<div key={item.id} className='user_topics'>
										<h3>{item.title}</h3>
										<Button type='primary'><Link to={`/updata/${item.id}`}>话题更新</Link></Button>
									</div>
              	)
              }
						</div>
					):<div style={{textAlign: 'center'}}><Spin size='large'/></div>
				}
			</div>
		)
	}
}

export default User
