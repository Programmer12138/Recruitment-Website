var request = new XMLHttpRequest();
var current_user_name=null;
var current_type=null;
var current_user_email=null;

function signin(){
    //alert("正在执行signin函数");
    //获取用户填写的email和密码
    var email=document.getElementById("email").value;
    var pwd=document.getElementById("pwd").value;
    //alert(email+" "+pwd);
    //去数据库查找看邮箱和密码是否匹配
    judge(email,pwd);
}

function judge(email,pwd){
	//alert("进入judge函数");
	var url="signin.jsp"+"?email="+email+"&pwd="+pwd;
	request.open("get", url, true);
	request.onreadystatechange = handle_signin_Result;
	request.send();
}

function handle_signin_Result(){
	//alert("进入handle_signin_Result函数");
	if (request.readyState == 4 && request.status == 200){
		alert("jsp returns"+request.responseText);
		var responseText_arr=request.responseText.split("\n");
		//前两行是空白
		current_user_name=responseText_arr[2];
		current_type=responseText_arr[3];
		if(current_user_name=="登陆失败")alert("fail to log in");
		else alert("welcome back "+current_user_name);
		}		
}

function test_jsp(){
	//alert("成功执行test函数");测试成功
	var url="test.jsp";
	request.open("get", url, true);
	request.onreadystatechange = handle_test_Result;
	request.send();
}

function handle_test_Result(){
	//alert("成功执行handle函数");测试成功
	if (request.readyState == 4 && request.status == 200){
		var responseText_arr=request.responseText.split("\n");
		alert(responseText_arr.length);
		alert(responseText_arr[2]);
	}
}

function company_signup(){
	//alert("进入company_signup函数");
	//获取用户填写的信息
	var email=document.getElementById("email").value;
    var pwd=document.getElementById("pwd").value;
	var name=document.getElementById("name").value;
	var description=document.getElementById("description").value;
	//发送给jsp
	var url="company_signup.jsp"+"?email="+email+"&pwd="+pwd+"&name="+name+"&description="+description;
	request.open("get", url, true);
	request.onreadystatechange = handle_signup_Result;
	request.send();
}

function handle_signup_Result(){
	if (request.readyState == 4 && request.status == 200) alert(request.responseText);
}

function candidate_signup(){
	//alert("进入candidate_signup函数");
	//获取用户填写的信息
	var email=document.getElementById("email").value;
    var pwd=document.getElementById("pwd").value;
	var name=document.getElementById("name").value;
	var degree=document.getElementById("degree").value;
	var major=document.getElementById("major").value;
	var school=document.getElementById("school").value;
	var skill_certificate=document.getElementById("skill_certificate").value;
	var skills=document.getElementById("skills").value;
	var awards=document.getElementById("awards").value;
	var project_experience=document.getElementById("project_experience").value;
	var self_evaluation=document.getElementById("self_evaluation").value;
	//发送给jsp
	var url="candidate_signup.jsp"+"?email="+email+"&pwd="+pwd+"&name="+name+"&degree="+degree+"&major="+major+"&school="+school+"&skill_certificate="+skill_certificate+"&skills="+skills+"&awards="+awards+"&project_experience="+project_experience+"&self_evaluation="+self_evaluation;
	//alert(url);
	request.open("get", url, true);
	request.onreadystatechange = handle_signup_Result;
	request.send();
}

function post_job(){
	current_type="company";
	if(current_type=="company"){
		//alert("开始读取用户的输入");
		var name=document.getElementById("name").value;
		var type=document.getElementById("type").value;
		var dept_name=document.getElementById("dept_name").value;
		var degree=document.getElementById("degree").value;
		var salary=document.getElementById("salary").value;
		var experience_requirement=document.getElementById("experience_requirement").value;
		var skill_requirement=document.getElementById("skill_requirement").value;
		var description=document.getElementById("description").value;
		var url="post_job.jsp"+"?name="+name+"&type="+type+"&dept_name="+dept_name+"&degree="+degree+"&salary="+salary+"&experience_requirement="+experience_requirement+"&skill_requirement="+skill_requirement+"&description="+description;
		//alert(url);
		request.open("get", url, true);
		request.onreadystatechange = handle_post_Result;
		request.send();
	}
	else alert("you are not logged in or you you are not employer");
}

function handle_post_Result(){
	if (request.readyState == 4 && request.status == 200) alert(request.responseText);
}

function load_detail(){
	//alert(window.location.hash);//这个是url的#后面的参数
	//获取#后面从参数
	var para=window.location.hash;
	//参数是公司邮箱，岗位名称的形式，要根据“,”进行分割
	var company_email=para.split(",")[0];
	//由于最开始的company_email带有#，删除最开始的#
	var reg=new RegExp("#");
	company_email=company_email.replace(reg,"");
	var name=para.split(",")[1];
	//根据获得的参数从数据库里面查询岗位的信息
	//alert(company_email);
	//alert(name);
	var url="job_detail.jsp"+"?company_email="+company_email+"&name="+name;
	//alert(url);
	request.open("get", url, true);
	request.onreadystatechange = handle_job_detail;
	request.send();
}

function handle_job_detail(){
	//把返回的职位信息显示出来	
	//alert(company_email);//成功输出了公司邮箱，说明成功进入这个函数并且成功传递了参数
	if (request.readyState == 4 && request.status == 200){
		//alert("jsp返回的是"+request.responseText);
		var responseText_arr=request.responseText.split("\n");
		//前两行是空白
		var name=responseText_arr[2];
		var type=responseText_arr[3];
		var location=responseText_arr[4];
		var degree=responseText_arr[5];
		var salary=responseText_arr[6];
		var experience_requirement=responseText_arr[7];
		var skill_requirement=responseText_arr[8];
		var job_description =responseText_arr[9];
		var company_description =responseText_arr[10];
		var dept_name =responseText_arr[11];
		var company_email =responseText_arr[12];
		//把获取的信息显示出来
	    document.getElementById("name").innerHTML =name;
		document.getElementById("job_description").innerHTML =job_description;
		document.getElementById("degree").innerHTML ="<i class='fa fa-angle-right text-primary me-2'></i>"+degree;
		document.getElementById("experience_requirement").innerHTML ="<i class='fa fa-angle-right text-primary me-2'></i>"+experience_requirement;
		document.getElementById("skill_requirement").innerHTML ="<i class='fa fa-angle-right text-primary me-2'></i>"+skill_requirement;
		document.getElementById("button_link_application").innerHTML ="<button class='btn btn-primary w-100'><a href='application.html#"+company_email+","+name+"'>Apply now</a></button>";
		document.getElementById("company_description").innerHTML =company_description;
		document.getElementById("salary").innerHTML ="<i class='fa fa-angle-right text-primary me-2'></i>salary:"+salary;
		document.getElementById("type").innerHTML ="<i class='fa fa-angle-right text-primary me-2'></i>type:"+type;
		document.getElementById("location").innerHTML ="<i class='fa fa-angle-right text-primary me-2'></i>location:"+location;
		document.getElementById("dept_name").innerHTML ="<i class='fa fa-angle-right text-primary me-2'></i>department:"+dept_name;
	}
}

function test_display(){
	//此函数为了鉴定在网页指定位置动态显示内容是否可靠，经过验证，是可靠的
	var content="<div class='row gy-5 gx-4'>"+
"<div class='col-lg-8'>"+
"<div class='d-flex align-items-center mb-5'>"+
"<div class='text-start ps-4'>"+
"<h3 class='mb-3'>网络工程师</h3>"+
"</div>"+
"</div>"+
"<div class='mb-5'>"+
"<h4 class='mb-3'>岗位描述</h4>"+
"<p>Dolor justo tempor duo ipsum accusam rebum gubergren erat. Elitr stet dolor vero clita labore gubergren. Kasd sed ipsum elitr clita rebum ut sea diam tempor. Sadipscing nonumy vero labore invidunt dolor sed, eirmod dolore amet aliquyam consetetur lorem, amet elitr clita et sed consetetur dolore accusam. Vero kasd nonumy justo rebum stet. Ipsum amet sed lorem sea magna. Rebum vero dolores dolores elitr vero dolores magna, stet sea sadipscing stet et. Est voluptua et sanctus at sanctus erat vero sed sed, amet duo no diam clita rebum duo, accusam tempor takimata clita stet nonumy rebum est invidunt stet, dolor.</p>"+
"<h4 class='mb-3'>申请条件</h4>"+
"<ul class='list-unstyled'>"+
"<li><i class='fa fa-angle-right text-primary me-2'></i>Dolor justo tempor duo ipsum accusam</li>"+
"<li><i class='fa fa-angle-right text-primary me-2'></i>Elitr stet dolor vero clita labore gubergren</li>"+
"<li><i class='fa fa-angle-right text-primary me-2'></i>Rebum vero dolores dolores elitr</li>"+
"</ul>"+
"</div>"+
"<div class=''>"+
"<h4 class='mb-4'>申请这个职位</h4>"+
"<form>"+
"<div class='row g-3'>"+
"<div class='col-12'>"+
"<button class='btn btn-primary w-100' type='submit'>现在就申请</button>"+
"</div>"+
"</div>"+
"</form>"+
"</div>"+
"</div>"+
"<div class='col-lg-4'>"+
"<div class='bg-light rounded p-5 mb-4 wow slideInUp' data-wow-delay='0.1s'>"+
"<h4 class='mb-4'>岗位摘要</h4>"+
"<p><i class='fa fa-angle-right text-primary me-2'></i>薪资：10k-12k，14薪</p>"+
"<p><i class='fa fa-angle-right text-primary me-2'></i>地点：上海静安区</p>"+
"<p><i class='fa fa-angle-right text-primary me-2'></i>类型：IT类</p>"+
"</div>"+
"<div class='bg-light rounded p-5 wow slideInUp' data-wow-delay='0.1s'>"+
"<h4 class='mb-4'>公司介绍</h4>"+
"<p class='m-0'>Ipsum dolor ipsum accusam stet et et diam dolores, sed rebum sadipscing elitr vero dolores. Lorem dolore elitr justo et no gubergren sadipscing, ipsum et takimata aliquyam et rebum est ipsum lorem diam. Et lorem magna eirmod est et et sanctus et, kasd clita labore.</p>"+
"</div>"+
"</div>"+
"</div>";
	document.getElementById("display_job_detail").innerHTML = content;
}

function search_job(){
	var name=document.getElementById("name").value;
	var location=document.getElementById("location").value;
	var type=document.getElementById("type").value;
	var url="job_search.jsp"+"?name="+name+"&location="+location+"&type="+type;
	request.open("get", url, true);
	request.onreadystatechange = handle_search_Result;
	request.send();
}

function handle_search_Result(){
	if (request.readyState == 4 && request.status == 200){
		//把jsp返回的职位信息显示出来，jsp返回的信息就是一个字符串，包含了职位名称、类型、部门、薪资、所属公司名称、所属公司Email，一共6个信息，所以每6个为一组
		var job_list=request.responseText.split("\n");
		//jsp返回的信息有可能前两行是空的，也有可能前一行是空的,经过确认，是前两行是空的，最后一行也是空的，但是最后一行是空是因为认为添加了一行空的，所以下面数组的前两个和最后一个都是空的
		//alert(job_list.length);
		//alert(job_list[0]);
		//alert(job_list[1]);
		//alert(job_list[2]);
		//alert(job_list[7]);
		//alert(job_list[8]);
		//alert(job_list[9]);
		//判断一共找到了多少个符合要求的岗位
		var job_number=(job_list.length-3)/6;
		//alert("一共找到了"+job_number+"个岗位");
		var content="";
		//显示出搜索到的岗位
		for(var i=0;i<job_number;i++){
			//alert(job_list[i+3]);//成功输出岗位的名称，说明js里成功接受了来自就jsp的数据，但是为什么没有显示出来呢？
			content=content+"<div class='single-job-post fix'>"+
                                        "<div class='job-title col-4 pl-30'>"+
                                            "<span class='pull-left block mtb-17'>"+
                                                "<a href='#'><img src='images/company-logo/1.png' alt=''></a>"+
                                            "</span>"+
                                            "<div class='fix pl-30 mt-29'>"+
                                                "<h4 class='mb-5'>"+job_list[6*i+3]+"</h4>"+
                                                "<h5><a href='#'>"+job_list[6*i+4]+"</a></h5>"+
                                            "</div>"+
                                        "</div>"+
                                        "<div class='address col-4 pl-50'>"+
                                            "<span class='mtb-30 block'>"+job_list[6*i+5]+"<br>"+
                                            job_list[6*i+2]+"</span>"+
                                        "</div>"+
                                        "<div class='time-payment col-2 pl-60 text-center pt-22'>"+
                                            "<span class='block mb-6'>"+job_list[6*i+6]+"</span>"+
                                            "<a href='job_detail.html#"+job_list[6*i+7]+","+job_list[6*i+3]+"' class='button button-red'>see more details</a>"+
                                        "</div>"+
                                    "</div>";
		}
		document.getElementById("job_list_to_display").innerHTML = content;
	}
}

function application(){
	//获取用户填写的信息
	var interview_time=document.getElementById("interview_time").value;
	var interview_platform=document.getElementById("interview_platform").value;
	//获取url里的公司邮箱、岗位名称
	//获取#后面从参数
	var para=window.location.hash;
	//参数是公司邮箱，岗位名称的形式，要根据“,”进行分割
	var company_email=para.split(",")[0];
	//由于最开始的company_email带有#，删除最开始的#
	var reg=new RegExp("#");
	company_email=company_email.replace(reg,"");
	var job_name=para.split(",")[1];
	//往数据库里新增申请信息
	var url="application.jsp"+"?job_name="+job_name+"&company_email="+company_email+"&interview_time="+interview_time+"&interview_platform="+interview_platform;
	request.open("get", url, true);
	request.onreadystatechange = handle_application_Result;
	request.send();
}

function handle_application_Result(){
	if (request.readyState == 4 && request.status == 200) alert(request.responseText);
}

function load_statistic(){
	//连接到后端的数据库
	//alert("start to load information");
	var url="statistic.jsp";
	request.open("get", url, true);
	request.onreadystatechange =handle_statistic;
	request.send();
}

function handle_statistic(){
	//接受后端返回的数据
	if (request.readyState == 4 && request.status == 200){
		//jsp返回来的一共有6个数据
		var data=request.responseText.split("\n");
		document.getElementById("job_count1").innerHTML = "<sup class='pr-currency'>in total:</sup>"+data[2];
		document.getElementById("job_count2").innerHTML = "Now there are "+data[2]+" positions in this website";
		document.getElementById("candidate_count1").innerHTML = "<sup class='pr-currency'>in total:</sup>"+data[3];
		document.getElementById("candidate_count2").innerHTML = "Now there are "+data[3]+" users looking for jobs in this website";
		document.getElementById("company_count1").innerHTML = "<sup class='pr-currency'>in total:</sup>"+data[4];
		document.getElementById("company_count2").innerHTML = "there are "+data[4]+" companies posting jobs in this website";
		document.getElementById("new_job_count1").innerHTML = "<sup class='pr-currency'>New posted:</sup>"+data[5];
		document.getElementById("new_job_count2").innerHTML = "Today "+data[5]+"positions are posted";
		document.getElementById("new_application_count1").innerHTML = "<sup class='pr-currency'>Newly increased:</sup>"+data[6];
		document.getElementById("new_application_count2").innerHTML = "Today "+data[6]+" times of application are generated";
		document.getElementById("today_interview_count1").innerHTML = "<sup class='pr-currency'>Newly increased:</sup>"+data[7];
		document.getElementById("today_interview_count2").innerHTML = "Today "+data[7]+" times of interview happen";
	}	
}