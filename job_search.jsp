<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="DBconn.*" %>
<%
   //Java代码
   System.out.println("成功启动岗位搜索jsp");
   String name = request.getParameter("name");
   String location = request.getParameter("location");
   String type = request.getParameter("type");
   String job_list=DBConn.search_job(name,location,type);
   System.out.println("jsp返回的消息是："+job_list);
   out.write(job_list);
%>