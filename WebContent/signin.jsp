<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="DBconn.*" %>
<%
   //Java代码
   System.out.println("成功启动登录jsp");
   String email = request.getParameter("email");
   String pwd = request.getParameter("pwd");
   User usr=DBConn.signin(email,pwd);
   if(usr==null) {
	   out.write("fail to login");
	   System.out.println("jsp返回的是登录失败");
	   }
   else {
	   System.out.println("jsp成功返回"+usr.get_name()+","+usr.get_type());
	   out.write(usr.get_name()+"\n"+usr.get_type());
   	   }
%>