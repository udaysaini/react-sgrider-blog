import React from 'react';
import { connect } from 'react-redux';
import { fetchSinglePost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends React.Component {
    componentDidMount() {
        if(!this.props.post) {
            const { id } = this.props.match.params;
            this.props.fetchSinglePost(id);
        }
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
        // we wont fetch the id of post from POST but rather from the params object. BCZ the post wont be available the
        // first time the object renders so application will error out, meanwhile Params will always have postId in it.
    }

    render() {
        const { singlePost } = this.props;

        console.log('PROPS ', this.props);
        console.log('SINGLE POST IN PROPS ', this.props.singlePost);

        if(!singlePost) {
            return <div>LOADING....</div>
        }

        return(
            <div>
                <Link to="/" className="btn btn-primary"> Back To Index </Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{singlePost.title}</h3>
                <h6>Categories : {singlePost.categories}</h6>
                <p>{ singlePost.content }</p>
            </div>
        )
    }
}

function mapStateToProps({ posts }, ownProps ) {
    return {
        singlePost : posts[ownProps.match.params.id]
    }
}
//we use posts[ownProps.match.params.id] ownProps so that we can make it easier for us and
//not do something like const post = this.props.posts[this.props.match.params.id]

// function mapStateToProps( state ) {
//     return {
//         posts : state.posts
//     }
// }

export default connect(mapStateToProps, { fetchSinglePost, deletePost })(PostsShow);