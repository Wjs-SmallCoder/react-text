import React, { Component } from 'react';
import { EditorState, convertToRaw,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import './css/editor.less'


export default class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  // 提交时将输入的文本变为带有html的数据
  getRickText = () => {
      const {editorState} = this.state
      return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }

  // 将服务器的html代码变为文字
  setRickText = (html) => {
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState,
      });
    }
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
        //   wrapperClassName="demo-wrapper" editor 
        //   editorClassName="demo-editor" 编辑区
            editorStyle={{
                border: '1px solid black',
                lineHeight: '10px',
                minHeight: '200px',
                paddingLeft: '14px'
            }}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}