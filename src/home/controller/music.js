'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    this.assign('title','music page');
    return this.display();
  }
  async addmAction(){
    let params = this.post();
    let title = params.title;
    let author = params.author;
    let src = params.src;
    let token = params.token;
    let data = {
      title:title,
      author:author,
      src:src
    };
    let $token = this.config('token');
    if (token==$token[0]||token==$token[1]) {
      if (title.length!=0 && author.length!=0 && src.length!=0) {
        let insert = await this.model('music').thenAdd(data,{ title:title });
        if (insert) {
          this.json(1);
        }
      }else {
        this.json(0)
      }
    }else {
      this.json(0)
    }
  }
  async getmusicAction(){
    var num=this.post('page');
    let limit=this.post('limit');
    let searchValue="%"+this.post("searchValue")+"%";
    let data= await this.model('music').where({"title|author": ["like", searchValue]}).page(num,limit).order({id:"DESC"}).countSelect();
    if (data) {
      this.json(data);
    }
  }
}
