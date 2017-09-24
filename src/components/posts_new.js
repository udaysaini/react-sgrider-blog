import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';


class PostsNew extends React.Component {

    renderField(field) {
        const { meta : { touched , error }} = field; // de structuring the whole meta.touched and meta.error.
        const className = `form-group ${ touched && error ? 'has-danger' : '' }`;

        return(
            <div className= {className} >
                <label> { field.label } </label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    { touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        console.log('Values On Submit ', values);

        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render(){
        console.log('PROPS NEW', this.props);
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) } >
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

function validate(values){
    const errors = {}; //Error object to display the errors to user.

    //Validate the inputs from the values.

    // if(values.title.length < 3) {
    //     errors.title = 'Enter a title that is atleast 3 characters!';
    // }
    if(!values.title) {
        errors.title = 'Enter a title!';
    }
    if (!values.categories) {
        errors.categories = 'Enter a Category!'
    }
    if (!values.content) {
        errors.content = 'Enter some content!'
    }

    //If errors object is empty, form is ready to be submitted.
    //If errors has any kind of property, redux form shows the error.
    return errors;
}

export default reduxForm({
    validate : validate,
    form: 'PostsNewForm'
}) (
    connect(null, { createPost })(PostsNew)
);