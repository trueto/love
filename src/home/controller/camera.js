'use strict';

import Base from './base.js';
var fs=require('fs');
var path = require('path');

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    this.assign('title','camera page');
    return this.display();
  }
  async showAction(){
    this.assign('title','show page');
    let find = await this.model('movie').where({id:this.get('id')}).find();
    this.assign('moviedata',find);
    return this.display();
  }
  async getmovieAction(){
    var num=this.post('page');
    let limit=this.post('limit');
    let searchValue="%"+this.post("searchValue")+"%";
    let data= await this.model('movie').where({"title|poem": ["like", searchValue],'ison':1}).page(num,limit).order({id:"DESC"}).countSelect();
    if (data) {
      this.json(data);
    }
  }
  async trashAction(){
    let id = this.post('id');
    let token = this.post('token');
    let ison = 0;
    let intime =new Date(),y,m,d,h,i;
    		y=intime.getFullYear();
    		m=intime.getMonth()+1;
    		m=m >=10 ? m :('0'+m);
    		d=intime.getDate();
    		d=d >=10 ? d : ('0'+d);
    		h=intime.getHours();
    		h=h >=10 ? h : ('0'+h);
    		i=intime.getMinutes();
    		i=i >=10 ? i : ('0'+i);
    		intime = y+'-'+m+'-'+d+' '+h+':'+i;
    let $token = this.config('token');
    if (token==$token[0]||token==$token[1]) {
      let trash = await this.model('movie').where({id}).update({ison,intime});
      if (trash) {
        this.json(1);
      }else{
        this.josn(0);
      }
    }else {
      this.json(0);
    }
  }
  async addAction(){
    let params = this.post();
    let title = params.title;
    let poem =params.poem;
    let music = params.music;
    let token = params.token;
    let _data ={title,poem,music}

    let intime =new Date(),y,m,d,h,i;
    		y=intime.getFullYear();
    		m=intime.getMonth()+1;
    		m=m >=10 ? m :('0'+m);
    		d=intime.getDate();
    		d=d >=10 ? d : ('0'+d);
    		h=intime.getHours();
    		h=h >=10 ? h : ('0'+h);
    		i=intime.getMinutes();
    		i=i >=10 ? i : ('0'+i);
    		intime = y+'-'+m+'-'+d+' '+h+':'+i;
    let $token = this.config('token');
    if (token==$token[0]||token==token[1]) {
      // 储存图片
      let file = this.file('file');
      let filepath = file.path;
      let filename = file.originalFilename;
      //去除扩展名的文件名
      let param=filename.lastIndexOf('.') >= 0
                  ? filename.slice(0,filename.lastIndexOf('.')):'';
      //文件上传后，需要将文件移动到项目其他地方，否则会在请求结束时删除掉该文件
      var uploadPath = think.RESOURCE_PATH + '/static/upload';
      think.mkdir(uploadPath);
      var basename = path.basename(filepath);
      fs.renameSync(filepath, uploadPath + '/' + basename);
      let imgurl="/static/upload/"+basename;

      if (title.length>0&&poem.length>0&&music.length>0) {
        let find = await this.model('movie').where(_data).find();
        if (think.isEmpty(find)) {
          let data = { title,poem,music,imgurl,intime };
          let add = await this.model('movie').add(data);
        }else {
          imgurl=find.imgurl+'#'+imgurl;
          let udata = {imgurl,intime };
          let update = await this.model('movie').where(_data).update(udata);
        }
        this.json(1);
      }else {
        this.json(0);
      }
    }else {
      this.json(0);
    }
  }
  async getoptionAction(){
    let data = await this.model('music').limit(5).select();
    this.json(data);
  }
}
