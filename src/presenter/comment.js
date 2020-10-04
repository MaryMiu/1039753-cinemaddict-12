import CommentView from "../view/film-details-comment.js";
import {render, renderPosition, replace, remove} from "../utils/render.js";

export default class Comments {
  constructor(commentContainer) {
    this._commentContainer = commentContainer;
    this._id = null;

    this._commentComponent = null;

    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
  }

  init(id) {
    const comment = this._getComment(id);
    const prevCommentComponent = this._commentsComponent;

    this._commentComponent = new CommentView(comment);
    this._id = id;

    this._commentComponent.setDeleteCommentClickHandler(this._handleDeleteCommentClick);

    if (prevCommentComponent === null) {
      render(this._commentContainer, this._commentComponent, renderPosition.BEFOREEND);
      return;
    }

    replace(this._commentComponent, prevCommentComponent);
    remove(prevCommentComponent);
  }

  _handleDeleteCommentClick() {
    remove(this._commentComponent);
  }
  _getComment(id) {

  }
}
