import React, { Component } from 'react'
import axios from 'axios'
import { Select,Input } from 'antd'
import { Link } from 'react-router-dom'
const Option = Select.Option
const { TextArea } = Input

class NewTopic extends Component{
	constructor(){
		super()
		this.state = {
			title:'',
			content:'',
			tab:'dev'
		}
	}
	handleSubmit(){
		let accesstoken = sessionStorage.accesstoken
		if(!accesstoken){
			alert('请登录')
			return
		}
		let {title,content,tab} = this.state
		let data = {accesstoken,title,content,tab}
		axios.post('https://cnodejs.org/api/v1/topics',data)
		.then(res => {
			let id = res.data.topic_id
			this.props.history.push(`/topic/${id}`)
		})
		.catch(err => alert(err))
	}
	render(){
		let {title,content} = this.state
		return(
			<div className="newtopic">
			<p className='newtopic_head'><Link to='/'>主页</Link> / 话题发布</p>
				选择版块：
				<Select style={{width:'120px'}} value={this.state.tab} onChange={value => this.setState({tab:value})}>
            <Option value="ask">问答</Option>
            <Option value="job">招聘</Option>
            <Option value="share">分享</Option>
            <Option value="dev">客户端测试</Option>
          </Select><br/>
				<label htmlFor="title">标题（大于10个字符）:</label>
				<Input type="text" placeholder='请输入标题' name='title' value={title} onChange={e => this.setState({title:e.target.value})} /><br/>
				<label htmlFor="body">内容（支持MarkDown语法）:</label><br />
				<TextArea name="body" id="body" cols="30" rows="16" onChange={e => this.setState({content:e.target.value})} value={content} /><br />
				<Input type="button" value='发帖' onClick={this.handleSubmit.bind(this)} />
			</div>
		)
	}
}

export default NewTopic
