<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="DBconn.*" %>
<%
   //Java代码
   System.out.println("成功公司注册登录jsp");
   String email = request.getParameter("email");
   String pwd = request.getParameter("pwd");
   String name = request.getParameter("name");
   String description = request.getParameter("description");
   String msg=DBConn.company_signup(name, email, pwd, description);
   System.out.println("注册jsp返回的消息是"+msg);
   out.write(msg);
%>