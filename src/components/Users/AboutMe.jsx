import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Editor from 'react-md-editor'
import marked from 'marked'
import hljs from 'highlight.js'
import {
  Button,
  Row,
  Col,
} from 'antd'
import pick from 'lodash/pick'
import Loading from '../Loading'
import RequestStatus from '../../constants/RequestStatus';
import { getUser } from '../../utils/auth';

marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value,
})

const propTypes = {
  about: PropTypes.object,
  status: PropTypes.string,
  onFetchAbout: PropTypes.func,
  onAddAbout: PropTypes.func,
  onUpdateAbout: PropTypes.func,
}

class AboutMe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      about: {},
    }
  }

  componentWillMount() {
    const { onFetchAbout } = this.props
    onFetchAbout && onFetchAbout()
      .then((res) => {
        this.setState({
          about: res.about
        })
      })
  }

  handleContentChange = (content) => {
    this.setState((prevState) => {
      return {
        about: Object.assign({}, prevState.user, {
          content,
        })
      }
    })
  }

  handleSubmit = () => {
    const {
      about,
      onAddAbout,
      onUpdateAbout,
    } = this.props
    const nextAbout = pick(this.state.about, 'content')
    if (about._id) {
      onUpdateAbout && onUpdateAbout(about._id, nextAbout)
    } else {
      onAddAbout(nextAbout)
    }
  }

  render() {
    const { about } = this.state
    const { status } = this.props
    if (status === RequestStatus.REQUEST) {
      return <Loading />
    }
    return (
      <div>
        <Row
          type="flex"
          className="about-content"
        >
          <Col className="editor" xs={24}>
            <Editor
              value={about.content}
              onChange={this.handleContentChange}
            />
          </Col>
          <Col xs={24} style={{ marginTop: '15px', textAlign: 'center' }}>
            <Button
              type="primary"
              onClick={this.handleSubmit}
            >确定</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

AboutMe.propTypes = propTypes
export default AboutMe;
