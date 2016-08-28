'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  /**
   * index action logic
   * @return {} []
   */
  indexAction(){

  }
  getoptionAction(){
    this.allowMethods="post";
  }
  getmovieAction(){
    this.allowMethods="post";
  }
  addAction(){
    this.allowMethods="post";
  }
  trashAction(){
    this.allowMethods="post";
  }
}
