<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="DBconn.*" %>
<%
   //Java代码
   System.out.println("成功启动申请jsp");
   String job_name = request.getParameter("job_name");
   String company_email = request.getParameter("company_email");
   String interview_time = request.getParameter("interview_time");
   String interview_platform = request.getParameter("interview_platform");
   String msg=DBConn.application(job_name, company_email, interview_time, interview_platform);
   System.out.println("申请jsp返回的消息是"+msg);
   out.write(msg);
%>