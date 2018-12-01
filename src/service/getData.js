import { BASEURL, fetch, post } from './http.js'
export const BASICURL = BASEURL;
// //post "系统管理" => "系统日志"
// export const accessLog = (url, data) => fetch(`admin/system/access-log/page-query/${url}`, data);
// //post "系统管理" => "新增投票"
// export const addVote = (data, config) => postConfig('admin/system/vote/merge', data, config);
// //post "币币管理" => "转账地址"
// export const queryTansAdr = () => post('admin/system/transfer-address/page-query');
// //Post '渠道'=渠道详情
// export const channelDetail = data => post('/admin/channel/detail', data);



// 案例列表
export const team= data => post('/admin/team', data);
//案例详情
export const teamdetail= data => post('/admin/team/detail', data);
//案例修改
export const teamdeupdate= data => post('/admin/team/update', data);
//学生删除
export const teamdelete= data => post('/admin/team/delete', data);
//案例增加
export const teamdeadd= data => post('/admin/team/add', data);



//countryconfig列表
export const countryconfiglist= data => post('/admin/countryconfig', data);
//countryconfig增加
export const countryconfigadd= data => post('/admin/countryconfig/add', data);
//countryconfig删除
export const countryconfigdelete= data => post('/admin/countryconfig/delete', data);
//countryconfig修改
export const countryconfigUpdate= data => post('/admin/countryconfig/update', data);
//countryconfig详情
export const countryconfigdetail= data => post('/admin/countryconfig/detail', data);




//文章列表
export const newslist= data => post('/admin/news',data);
//文章详情
export const newsdetail= data => post('/admin/news/detail',data);
//文章增加
export const newsadd= data => post('/admin/news/add',data);
//文章删除
export const newsdelete= data => post('/admin/news/delete',data);
//文章修改
export const newsUpdate= data => post('/admin/news/update',data);


//公司简介
export const companylist= data => post('/admin/company',data);
//删除
export const companydelete= data => post('/admin/company/delete',data);
//公司详情
export const companydetail= data => post('/admin/company/detail',data);
//公司修改
export const companyupdate= data => post('/admin/company/update',data);
//公司增加
export const companyadd= data => post('/admin/company/add',data);


// 报名列表
export const reportlist= data => post('/admin/reportlist/reportlist',data);
//删除
export const reportdelete= data => post('/admin/reportlist/delete',data);



//留言列表
export const messagelist= data => post('/admin/submit/messagelist',data);
//查看某一条留言
export const messagedetail= data => post('/admin/submit/messagedetail',data);
//删除留言
export const messagedelete= data => post('/admin/submit/messagedelete',data);
//留言回复
export const messageupdate= data => post('/admin/submit/messageupdate',data);


