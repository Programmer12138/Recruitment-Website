<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="DBconn.*" %>
<%
   //Java代码
   System.out.println("成功启动获取岗位细节jsp");
   String company_email = request.getParameter("company_email");
   String name = request.getParameter("name");
   String job_detail=DBConn.get_job_detail(company_email,name);
   System.out.println("jsp返回的消息是："+job_detail);
   out.write(job_detail);
%>