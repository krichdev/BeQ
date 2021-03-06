import React from 'react'
import Post from '../components/Post'
import { graphql, compose} from 'react-apollo'
import {withRouter, routeParams} from 'react-router'
import gql from 'graphql-tag'
import LoginAuth0 from './LoginAuth0'

class PostView extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
    createUserChoice: React.PropTypes.func,
    router: React.PropTypes.object,
  }

  state = {
    post: location.pathname.substr(1),
    outcomeChoice: false,
    userId: null
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }
    return (
      <div className='w-100 flex justify-center'>
          {console.log(this.props.data)}
        <div className="well">
          <h1>Title: {this.props.data.Post.title}</h1>
          <p>description: {this.props.data.Post.description}</p>
          <p>point cost: {this.props.data.Post.pointCost}</p>
          <p>Finish Date: {this.props.data.Post.finish}</p>
          <img src={this.props.data.Post.imageUrl} />
          <p>Outcome: {this.props.data.Post.outcomes}</p>
          <button onClick={this.handleYes}>BID YES ${this.props.data.Post.pointCost}</button>
          <button onClick={this.handleNo}>BID NO ${this.props.data.Post.pointCost}</button>
        </div>
      </div>
    )
  }
  handleYes = () => {
    const variables = {
      outcomeChoice: !this.state.outcomeChoice,
      post: this.state.post
    }
    this.props.createUserChoice({ variables })
      .then((response) => {
          this.props.router.replace('/')
      }).catch((e) => {
        console.error(e)
        this.props.router.replace('/')
      })
  }
  handleNo = () => {
    const variables = {
      outcomeChoice: this.state.outcomeChoice,
      post: this.state.post
    }
    this.props.createUserChoice({ variables })
      .then((response) => {
          this.props.router.replace('/')
      }).catch((e) => {
        console.error(e)
        this.props.router.replace('/')
      })
  }
}
const Path = location.pathname.substr(1);
const createUserChoice = gql`
  mutation ($outcomeChoice: Boolean!, $post: String!) {
    createUserChoice(outcomeChoice: $outcomeChoice, post: $post ) {
      id
    }
  }
  `
const PostQuery = gql`

  query {
    Post(id:"${Path}") {
      id
      title
      description
      pointCost
      finish
      imageUrl
      outcomes
    }
    user{
      id
    }
  }
`
export default compose(graphql(createUserChoice), graphql(PostQuery))(PostView)

