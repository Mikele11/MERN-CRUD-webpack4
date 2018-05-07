import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
	this.onDelete = this.onDelete.bind(this);
	this.onUpdate = this.onUpdate.bind(this);
  }
  
  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/post')
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }
    onDelete(e){
		axios.delete('/api/post/'+ this.state.posts[0]._id)
			.then((result) => { 
				console.log('post deleted');

				axios.get('/api/post')
					.then(res => {
						this.setState({ posts: res.data });
					})
					.catch((error) => {
						console.log('error');
					});
			});
	}
	onUpdate(e){
		window.updateid= this.state.posts[0]._id;
		window.updateauthor= this.state.posts[0].author;
		window.updatedescription= this.state.posts[0].description;
	}
	
//<Update expense={post}/>	
  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              BLOG &nbsp;
              {localStorage.getItem('jwtToken') &&
                <button class="btn btn-primary" onClick={this.logout}>Logout</button>
              }
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Post</Link></h4>
            <div>
                {this.state.posts.map(post =>
                  <div class="article">
				    <div class ="article_date">
						<div>Recording time: </div>
						<div>{post.date}</div>
					</div>
                    <div>{post.description}</div>
				    <div class ="article_author">
						<div>Author: </div>
						<div>{post.author}</div>
					</div>
					<div class ="article_buttons">
						<div>
							<button class="btn btn-warning" onClick={this.onUpdate}><Link to="/update">Update<i class="glyphicon glyphicon-edit"></i></Link></button>
						</div>
						<div><button class="btn btn-danger" onClick={this.onDelete}>Delete<i class="fa fa-trash-o" aria-hidden="true"></i></button></div>
					</div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
