import React from 'react'
import axios from 'axios'
import {url} from '../config'
import { message, Card, BackTop, Avatar, Input, Button, Icon, Modal } from 'antd';
import moment from 'moment';

class Topic extends React.Component{
	constructor(){
		super()
		this.state={
			data: null,
			comment: '',
			reply:'',
			visible: false,
			replyInfo: null,
			collect:false
		}
	}
	getData(){
		let id = this.props.match.params.id;
		axios.get(`${url}/topic/${id}`)
			.then(res=> this.setState({data: res.data.data}))
			.catch(err=> message.error('数据请求失败'))
	}
	componentWillMount(){
		
	}
	componentDidMount(){
		this.getData()
	}
	handleComment(type){
		if (sessionStorage.accesstoken) {
			var accesstoken = sessionStorage.accesstoken
		}else{
			alert('请先登录')
			return
		}
		if (type==='comment') {
			var content = this.state.comment;
		}else{
			var content = this.state.reply;
		}
		let data = {accesstoken, content }
		let id = this.state.data.id;
		axios.post(`${url}/topic/${id}/replies`, data)
			.then(res=> {
				this.setState({comment: ''})
				this.getData()
				if (type==='reply') this.setState({visible: false});
			})
			.catch( err => message.error('评论失败'))
	}
	showReply(reply){
		this.setState({visible: true, replyInfo: reply, reply: `@${reply.author.loginname} `})
	}
	handleLike(reply_id){
		if (sessionStorage.accesstoken){
			var accesstoken = sessionStorage.accesstoken
		}else{
			alert('请先登录')
			return
		}
		axios.post(`${url}/reply/${reply_id}/ups`, {accesstoken})
			.then( res => this.getData() )
			.catch( err => message.error('评论失败'))
	}
	handleCollect(){
		let id = this.props.match.params.id
		if (sessionStorage.accesstoken){
			var accesstoken = sessionStorage.accesstoken
		}else{
			alert('请先登录')
			return
		}
		axios.post(`${url}/topic_collect/collect`, {accesstoken, topic_id: id})
		.then(res => this.setState({collect:true}))
		.catch(err => message.error('收藏失败'))
	}
	render(){
		let tabs = {
			good: '精华',
			ask: '问答',
			job: '招聘',
			share: '分享',
			dev:'客户端测试'
		}
		let {data, comment, visible, reply, replyInfo, collect} = this.state
		console.log(sessionStorage.accesstoken,data)
		return(
			<div className='topic_wrap'>
				<Card loading={!data}>
					{
						data ? (
							<div>
								<div className="topic_head">
									<div className="topic_title">
											<h1>
												<span className='tab'>	
													{data.top?'置顶':data.good?'精华':tabs[data.tab]}
												</span>{data.title}
											</h1>
									</div>
									<div className='topic_desc'>
										<div>
											<span>&nbsp;* 发布于{moment(data.create_at).fromNow()}</span>
											<span>&nbsp;* 作者：{data.author.loginname}</span>
											<span>&nbsp;*&nbsp;{data.visit_count}次浏览</span>
											<span>&nbsp;*&nbsp;创建于{moment(data.create_at).fromNow()}</span>
											<span>&nbsp;*&nbsp;来自 {tabs[data.tab]}</span>
										</div>
										<button onClick={this.handleCollect.bind(this)}>{collect? '已收藏' : '收藏'}</button>
									</div>
								</div>
								<div dangerouslySetInnerHTML={{__html: data.content}} className='topic-wrap'/>
								<h2 style={{padding:'5px'}}>发表评论：</h2>
								<Input type="textarea" rows={4} value={comment} onChange={e=>this.setState({comment: e.target.value})} placeholder='留下您的评论' />
								<Button type='primary' onClick={this.handleComment.bind(this, 'comment')} style={{margin:'5px'}}>提交</Button>

								<h2 style={{padding:'5px'}}>全部回复：</h2>
								{
									data.replies.map(item=>(
										<div className='comments' key={item.id}>	
											<div className='comments-header'>
												
												<div className='comments-header-left'>
													<Avatar shape="square" src={item.author.avatar_url} />
													<span>
														{item.author.loginname}·{moment(item.create_at).fromNow()}
													</span>
												</div>
												<span>
													<Icon type="like" onClick={this.handleLike.bind(this, item.id)}/>{item.ups.length}&nbsp;&nbsp;
													<Icon type="message" onClick={this.showReply.bind(this, item)}/>
												</span>
											</div>
											<div className='comments-right'>
												<div dangerouslySetInnerHTML={{__html: item.content}} />
											</div>
										</div>
									))
								}
							</div>
						) : null
					}
				</Card>
				<Modal
          title={replyInfo? `回复：${replyInfo.author.loginname}` : '回复：'}
          visible={visible}
          onOk={this.handleComment.bind(this,'reply')}
          onCancel={()=>this.setState({visible: false})}
        >
          <Input type="textarea" rows={4} value={reply} onChange={e=>this.setState({reply: e.target.value})} placeholder='留下您的评论' ref={input=> this.input = input}/>
        </Modal>
				<BackTop />
			</div>
		)
	}
}

export default Topic