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
  addmAction(){
    this.allowMethods="post";
  }
  getmusicAction(){
    this.allowMethods="post";
  }
}
