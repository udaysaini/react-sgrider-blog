import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostIndex extends React.Component {
    componentDidMount(){
        this.props.fetchPosts();
    }

    renderPosts(){
        //We are not going to use the map function because we are not mapping an array but rather an object, to deal with
        //that we will use Lodash's map function, that has functionality to map an object.
        return _.map(this.props.posts, post => {
            return (
                <li key={post.id} className="list-group-item">
                    <Link to={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                </li>
            )
        })
    }

    render(){
        console.log('PROPS ', this.props.posts );
        return(
            <div>
                <div className="text-xs-right">
                    <Link
                        className="btn btn-primary"
                        to="/posts/new"
                    >
                        Add a Post
                    </Link>
                </div>

                <h3>Posts</h3>
                <ul className="list-group">
                    { this.renderPosts() }
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        posts: state.posts
    }
}


//1st way
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({
//         fetchPosts: fetchPosts
//     } , dispatch);
// }

//2nd way
export default connect(mapStateToProps, { fetchPosts })(PostIndex);